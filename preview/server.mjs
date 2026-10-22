import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import Handlebars from "handlebars";
import sass from "sass";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);
const manifest = JSON.parse(
  await readFile(path.join(root, "manifest.json"), "utf8")
);
const defaults = Object.fromEntries(
  manifest.settings.flatMap((g) =>
    g.variables.map((v) => [v.identifier, v.value])
  )
);
const sample = { window: {} };
vm.runInNewContext(
  await readFile(path.join(root, "preview/articles.js"), "utf8"),
  sample
);
const sourceArticles = sample.window.previewArticles;
const esc = Handlebars.escapeExpression;
const safe = (value) => new Handlebars.SafeString(value);
let context;
const copy = (nl, en) => (context.help_center.locale === "en-nl" ? en : nl);
const route = (kind, id = "") =>
  `/hc/${context.help_center.locale}/${kind}${id ? "/" + id : ""}`;
const labels = {
  search: ["Zoeken", "Search"],
  skip_navigation: [
    "Overslaan en naar hoofdcontent gaan",
    "Skip to main content",
  ],
  user_navigation: ["Gebruikersnavigatie", "User navigation"],
  toggle_navigation: ["Navigatiemenu", "Navigation menu"],
  home_page: ["Startpagina ZekerArbo", "ZekerArbo home"],
  updated: ["Bijgewerkt", "Updated"],
  was_this_article_helpful: [
    "Was dit artikel nuttig?",
    "Was this article helpful?",
  ],
  see_more: ["Bekijk alle artikelen", "View all articles"],
  show_all_articles: ["Bekijk alle artikelen", "View all articles"],
  promoted: ["Uitgelicht", "Featured"],
  internal: ["Intern", "Internal"],
  empty: ["Nog geen artikelen", "No articles yet"],
  go_to_comments: ["Naar opmerkingen", "Go to comments"],
};
Handlebars.registerHelper("t", (key) =>
  labels[key] ? copy(...labels[key]) : key
);
Handlebars.registerHelper("is", function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});
Handlebars.registerHelper("compare", (a, op, b) =>
  op === ">" ? a > b : a === b
);
Handlebars.registerHelper("excerpt", (value) => value || "");
Handlebars.registerHelper("page_path", (name) =>
  name === "help_center" ? route("") : route(name)
);
Handlebars.registerHelper("link", function (name, options) {
  const href =
    name === "help_center"
      ? route("")
      : name === "new_request"
      ? "https://www.zekerarbo.nl/contact/"
      : null;
  if (!href) return ""; // Optional account/community features are unavailable in the offline preview.
  const label = options.fn
    ? options.fn(this)
    : copy("Contact opnemen", "Contact us");
  return safe(
    `<a href="${esc(href)}" class="${esc(
      options.hash.class || ""
    )}">${label}</a>`
  );
});
Handlebars.registerHelper("search", () =>
  safe(
    `<form class="search" role="search" action="${route(
      "search"
    )}" method="get"><input id="query" type="search" name="query" aria-label="${copy(
      "Zoeken",
      "Search"
    )}" placeholder="${copy("Zoeken", "Search")}" value="${esc(
      context.query || ""
    )}"></form>`
  )
);
Handlebars.registerHelper("breadcrumbs", () =>
  safe(
    `<nav aria-label="${copy(
      "Broodkruimel",
      "Breadcrumbs"
    )}"><ol class="breadcrumbs"><li><a href="${route("")}">Service</a></li>${
      context.category
        ? `<li><a href="${context.category.url}">${esc(
            context.category.name
          )}</a></li>`
        : ""
    }${
      context.section
        ? `<li><a href="${context.section.url}">${esc(
            context.section.name
          )}</a></li>`
        : ""
    }</ol></nav>`
  )
);
Handlebars.registerHelper("date", () =>
  copy("Voorbeeldartikel", "Sample article")
);
Handlebars.registerHelper("vote", (kind) =>
  kind === "label"
    ? ""
    : safe(
        `<button type="button" class="button article-vote" disabled title="${copy(
          "Beoordelen werkt in de Zendesk-preview",
          "Voting is available in the Zendesk preview"
        )}">${kind === "up" ? copy("Ja", "Yes") : copy("Nee", "No")}</button>`
      )
);
for (const name of [
  "pagination",
  "subscribe",
  "recent_activity",
  "share",
  "related_articles",
  "recent_articles",
  "comment_form",
  "request_callout",
])
  Handlebars.registerHelper(name, () => "");

async function template(name) {
  return Handlebars.compile(
    await readFile(path.join(root, "templates", name + ".hbs"), "utf8")
  )(context);
}

function fixtures(locale) {
  const en = locale === "en-nl";
  const groupNames = en
    ? [
        "Support for employees",
        "Support for employers",
        "Insurers and managing general agents",
      ]
    : [
        "Hulp voor medewerkers",
        "Hulp voor werkgevers",
        "Hulp voor verzekeraars en volmachten",
      ];
  const descriptions = en
    ? [
        "Help with logging in, appointments and your recovery. We explain how it works.",
        "Practical answers about the portal and managing absence in your organisation.",
        "Guidance on the portal for supporting your clients.",
      ]
    : [
        "Hulp bij inloggen, afspraken en je herstel. We leggen uit hoe het werkt.",
        "Praktische antwoorden over het portaal en verzuim begeleiden in jouw organisatie.",
        "Zo gebruik je het portaal om jouw klanten te ondersteunen.",
      ];
  const articles = Object.entries(sourceArticles).map(([key, item], i) => {
    const content = item.locales[locale] || item.locales.nl;
    return {
      id: key,
      title: content.title,
      body: safe(content.body),
      description: content.description,
      url: route("articles", key),
      created_at: "2026-10-22",
      edited_at: "2026-10-22",
      content_tags: [],
      internal: false,
      sectionName: content.section,
      group: i === 0 ? 0 : i === 1 ? 1 : 2,
    };
  });
  const categories = groupNames.map((name, i) => ({
    id: ["employees", "employers", "advisers"][i],
    name,
    description: descriptions[i],
    url: route("categories", ["employees", "employers", "advisers"][i]),
  }));
  const sections = categories.flatMap((category, i) =>
    (i === 0
      ? en
        ? [
            "General",
            "Logging in",
            "Using the portal",
            "Absence",
            "Video calls",
          ]
        : ["Algemeen", "Inloggen", "Gebruik portaal", "Verzuim", "Videobellen"]
      : i === 1
      ? en
        ? ["Logging in", "Using the portal", "General"]
        : ["Inloggen", "Gebruik portaal", "Algemeen"]
      : [en ? "Using the portal" : "Gebruik portaal"]
    ).map((name, j) => ({
      id: category.id + "-" + j,
      name,
      category_id: category.id,
      url: route("sections", category.id + "-" + j),
      articles: /portal|portaal/.test(name)
        ? articles.filter((a) => a.group === i)
        : [],
      description: "",
      more_articles: false,
    }))
  );
  categories.forEach(
    (c) => (c.sections = sections.filter((s) => s.category_id === c.id))
  );
  return { categories, sections, articles };
}

async function render(requestUrl) {
  const parts = requestUrl.pathname.split("/").filter(Boolean);
  const locale =
    parts[0] === "hc"
      ? parts[1]
      : requestUrl.searchParams.get("locale") || "nl";
  const normalized = locale === "en-nl" ? "en-nl" : "nl";
  context = {
    help_center: { name: "ZekerArbo", locale: normalized },
    settings: {
      ...defaults,
      logo: "/preview/assets/zeker-arbo-logo.png",
      home_story_image: "/preview/assets/zeker-arbo-diensten.jpg",
      home_story_image_secondary: "/preview/assets/zeker-arbo-arbobas.jpg",
      show_recent_activity: false,
      show_article_comments: false,
      show_article_author: false,
    },
    signed_in: false,
  };
  const data = fixtures(normalized);
  const kind =
    parts[0] === "hc"
      ? parts[2]
      : requestUrl.searchParams.has("article")
      ? "articles"
      : "home";
  const id = parts[3] || requestUrl.searchParams.get("article");
  context.current_locale = {
    name: normalized === "nl" ? "Nederlands" : "English",
  };
  context.alternative_locales = [
    {
      name: normalized === "nl" ? "English" : "Nederlands",
      url: `/hc/${normalized === "nl" ? "en-nl" : "nl"}/${
        kind === "home" || !kind ? "" : kind + (id ? "/" + id : "")
      }`,
    },
  ];
  context.has_multiple_categories = true;
  context.categories = data.categories;
  // Curated sample answers; the real theme renders Zendesk's promoted_articles collection.
  context.promoted_articles = data.articles;
  let page = "home_page";
  if (kind === "categories") {
    context.category =
      data.categories.find((c) => c.id === id) || data.categories[0];
    context.sections = context.category.sections;
    page = "category_page";
  } else if (kind === "sections") {
    context.section =
      data.sections.find((s) => s.id === id) || data.sections[0];
    context.category = data.categories.find(
      (c) => c.id === context.section.category_id
    );
    page = "section_page";
  } else if (kind === "articles") {
    context.article =
      data.articles.find((a) => a.id === id) || data.articles[0];
    context.category = data.categories[context.article.group];
    context.section =
      context.category.sections.find((s) => /portal|portaal/.test(s.name)) ||
      context.category.sections[0];
    page = "article_page";
  }
  let body;
  if (kind === "search") {
    context.query = requestUrl.searchParams.get("query") || "";
    const terms = context.query
      .toLocaleLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    const matches = data.articles.filter((a) =>
      terms.every((t) =>
        (a.title + " " + a.body).toLocaleLowerCase().includes(t)
      )
    );
    body = `<main id="main-content" class="container" style="padding:40px 0"><p class="za-eyebrow">${copy(
      "Zoekresultaten · voorbeeldartikelen",
      "Search results · sample articles"
    )}</p><h1>${copy("Je zocht naar", "You searched for")} “${esc(
      context.query
    )}”</h1><ul class="article-list">${matches
      .map(
        (a) =>
          `<li class="article-list-item"><a class="article-list-link" href="${
            a.url
          }">${esc(a.title)}</a></li>`
      )
      .join("")}</ul>${
      matches.length
        ? ""
        : `<p>${copy(
            "Geen resultaat in de drie voorbeeldartikelen. In Zendesk doorzoek je de volledige kennisbank.",
            "No matches in the three sample articles. Zendesk searches the full help centre."
          )}</p>`
    }<p><a href="${route("")}">← ${copy(
      "Alle onderwerpen",
      "All topics"
    )}</a></p></main>`;
  } else body = await template(page);
  return `<!doctype html><html lang="${
    normalized === "nl" ? "nl" : "en"
  }"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ZekerArbo · ${copy(
    "Ontwerpvoorbeeld",
    "Design preview"
  )}</title><link rel="stylesheet" href="/preview/theme.css"></head><body>${await template(
    "header"
  )}${body}${await template(
    "footer"
  )}<script>window.searchClearButtonLabelLocalized=${JSON.stringify(
    copy("Zoekopdracht wissen", "Clear search")
  )}</script><script src="/script.js"></script></body></html>`;
}

// Resolve theme variables locally, using the same SCSS sources as Zendesk.
const colorPreamble = Object.entries(defaults)
  .map(([key, value]) => {
    if (typeof value === "boolean") return `$${key}: ${value};`;
    if (typeof value === "string")
      return `$${key}: ${
        value.startsWith("#") ? value : JSON.stringify(value)
      };`;
    return `$${key}: "";`;
  })
  .join("\n");
const assetNames = (await import("node:fs/promises")).readdir;
const assetPreamble = (await assetNames(path.join(root, "assets")))
  .filter((f) => f !== ".gitkeep")
  .map(
    (f) =>
      `$assets-${path.basename(f, path.extname(f)).replace(/[+.]/g, "-")}-${path
        .extname(f)
        .slice(1)}: "/assets/${f}";`
  )
  .join("\n");
const css = sass.compileString(
  `${colorPreamble}\n${assetPreamble}\n@function zass-darken($color, $amount) { @return darken($color, $amount); }\n@function zass-lighten($color, $amount) { @return lighten($color, $amount); }\n@import "index";`,
  { loadPaths: [path.join(root, "styles")], logger: { warn() {}, debug() {} } }
).css;
const types = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};
let renderQueue = Promise.resolve();
http
  .createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405);
      response.end();
      return;
    }
    try {
      const url = new URL(request.url, "http://localhost");
      let content, type;
      if (url.pathname === "/preview/theme.css") {
        content = css;
        type = "text/css";
      } else if (
        ["/", "/preview", "/preview/"].includes(url.pathname) ||
        /^\/hc\/(nl|en-nl)(\/|$)/.test(url.pathname)
      ) {
        const pending = renderQueue.then(() => render(url));
        renderQueue = pending.catch(() => {});
        content = await pending;
        type = "text/html";
      } else {
        // The preview serves only public theme assets, never the repository or local exports.
        if (
          !/^\/(preview\/assets\/[^/]+|assets\/[^/]+|script\.js)$/.test(
            url.pathname
          )
        ) {
          response.writeHead(404);
          response.end("Not found");
          return;
        }
        const filename = path.resolve(
          root,
          "." + decodeURIComponent(url.pathname)
        );
        if (!filename.startsWith(root + path.sep)) {
          response.writeHead(403);
          response.end();
          return;
        }
        content = await readFile(filename);
        type = types[path.extname(filename)] || "application/octet-stream";
      }
      response.writeHead(200, {
        "Content-Type":
          type + (type.startsWith("text/") ? "; charset=utf-8" : ""),
      });
      response.end(request.method === "HEAD" ? undefined : content);
    } catch (error) {
      console.error(error);
      response.writeHead(500);
      response.end("Preview rendering failed");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`ZekerArbo preview: http://localhost:${port}/preview/`)
  );
