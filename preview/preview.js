const locales = {
  nl: {
    skipNavigation: "Ga naar hoofdcontent",
    search: "Zoeken",
    userNavigation: "Gebruikersnavigatie",
    submitRequest: "Een aanvraag indienen",
    signIn: "Aanmelden",
    navigationMenu: "Navigatiemenu",
    heroTitle: "Welkom bij ZekerArbo Service",
    heroSubtitle:
      "Hier vind je uitleg over het gebruik van het ZekerArbo portaal. Of je nu werkgever bent en verzuim begeleidt, of werknemer bent en werkt aan je herstel. We leggen je stap voor stap uit hoe het werkt.",
    categories: "Categorieën",
    employeeTitle: "Hulp voor medewerkers",
    employeeDescription:
      "Ben je ziekgemeld en heb je toegang gekregen tot het portaal? Hier leggen we uit wat je kunt verwachten.",
    employeeLogin: "Inloggen",
    employeePortal: "Gebruik portaal",
    absence: "Verzuim",
    videoCalls: "Videobellen",
    aboutZekerArbo: "Over ZekerArbo",
    employerTitle: "Hulp voor werkgevers",
    employerDescription:
      "Neem je arbodienst bij ons af? Lees hier hoe je het portaal optimaal gebruikt.",
    employerLogin: "Inloggen",
    employerPortal: "Gebruik portaal",
    general: "Algemeen",
    insurerTitle: "Hulp voor verzekeraars en volmachten",
    insurerDescription:
      "Heb je als adviseur klanten die je ondersteunt in het verzuim? Lees hier hoe het portaal werkt.",
    insurerPortal: "Gebruik portaal",
    contentTitle: "Hulp nodig?",
    contentBody:
      "Kom je er niet uit? Onze kennisbank helpt je stap voor stap verder. Neem contact op met onze klantenservice als je meer hulp nodig hebt.",
    contentLink: "Een aanvraag indienen",
    storyKicker: "Gezond en inzetbaar aan het werk",
    storyTitle: "Samen maken we werk sterker",
    storyBody:
      "Van preventie tot verzuimbegeleiding: ZekerArbo helpt mensen en organisaties vooruit met praktische expertise en persoonlijke aandacht.",
    storyLink: "Ontdek ZekerArbo",
    footerText:
      "Praktische hulp voor medewerkers, werkgevers, verzekeraars en volmachten.",
    footerNavigation: "Voettekst",
    footerContact: "Contact",
    requestPath: "/hc/nl/requests/new",
    legalDisclaimer: "Disclaimer",
    legalPrivacy: "Privacystatement",
    legalCertificates: "Certificaten",
    legalCookies: "Cookiestatement",
    legalCookieSettings: "Cookie instellingen",
    legalTerms: "Algemene voorwaarden",
    legalComplaints: "Klachtenregeling",
    popularArticles: "Veel gezocht",
    popularAppointments: "Afspraken inzien",
    popularPrognosis: "26-wekenprognose",
    popularCommunication: "Communicatie met zorgprofessional",
    recentUpdates: "Nieuw en gewijzigd",
    recentCommunication: "Communicatie met zorgprofessional",
    recentPrognosis: "26-wekenprognose",
    home: "Home",
    articleLabel: "Artikel",
    sampleArticles: "Voorbeeldartikelen",
    sourceArticle: "Bekijk bronartikel",
    interactiveDemo: "Interactieve demo uit het bronartikel",
    openDemo: "Open demo",
    wasHelpful: "Was dit artikel nuttig?",
    voteYes: "Ja",
    voteNo: "Nee",
    recentlyViewed: "Onlangs bekeken artikelen",
    relatedArticles: "Verwante artikelen",
  },
  "en-nl": {
    skipNavigation: "Skip to main content",
    search: "Search",
    userNavigation: "User navigation",
    submitRequest: "Submit a request",
    signIn: "Sign in",
    navigationMenu: "Navigation menu",
    heroTitle: "Welcome to ZekerArbo Service",
    heroSubtitle:
      "Here you can find guidance on using the ZekerArbo portal. Whether you are an employer managing absence or an employee working on recovery, we explain how it works step by step.",
    categories: "Categories",
    employeeTitle: "Support for employees",
    employeeDescription:
      "Are you on sick leave and do you have access to the portal? Here we explain what to expect.",
    employeeLogin: "Login to portal",
    employeePortal: "How to use employee portal",
    absence: "Absence",
    videoCalls: "Video calls",
    aboutZekerArbo: "About ZekerArbo",
    employerTitle: "Support for employers",
    employerDescription:
      "Do you use ZekerArbo as your occupational health service? Learn how to get the most out of the portal.",
    employerLogin: "Login",
    employerPortal: "How to use employer portal",
    general: "General",
    insurerTitle: "Insurers and Managing General Agents",
    insurerDescription:
      "Do you support clients with absence management? Learn how the portal works.",
    insurerPortal: "How to use portal",
    contentTitle: "Need help?",
    contentBody:
      "Still stuck? Our knowledge base guides you step by step. Contact our customer service team if you need more help.",
    contentLink: "Submit a request",
    storyKicker: "Healthy and fit at work",
    storyTitle: "Together, we make work stronger",
    storyBody:
      "From prevention to absence support, ZekerArbo helps people and organisations keep moving forward with practical expertise and personal attention.",
    storyLink: "Discover ZekerArbo",
    footerText:
      "Practical support for employees, employers, insurers and managing general agents.",
    footerNavigation: "Footer",
    footerContact: "Contact",
    requestPath: "/hc/en-nl/requests/new",
    legalDisclaimer: "Disclaimer",
    legalPrivacy: "Privacy statement",
    legalCertificates: "Certificates",
    legalCookies: "Cookie statement",
    legalCookieSettings: "Cookie settings",
    legalTerms: "Terms and conditions",
    legalComplaints: "Complaints procedure",
    popularArticles: "Popular articles",
    popularAppointments: "View appointments",
    popularPrognosis: "26-week prognosis",
    popularCommunication: "Communication with healthcare professional",
    recentUpdates: "New and updated",
    recentCommunication: "Communication with healthcare professional",
    recentPrognosis: "26-week prognosis",
    home: "Home",
    articleLabel: "Article",
    sampleArticles: "Sample articles",
    sourceArticle: "View source article",
    interactiveDemo: "Interactive demo from the source article",
    openDemo: "Open demo",
    wasHelpful: "Was this article helpful?",
    voteYes: "Yes",
    voteNo: "No",
    recentlyViewed: "Recently viewed articles",
    relatedArticles: "Related articles",
  },
};

const requestedLocale = new URLSearchParams(window.location.search).get("locale");
const locale = requestedLocale === "en-nl" ? "en-nl" : "nl";
const translations = locales[locale];
const showHeaderActions =
  new URLSearchParams(window.location.search).get("headerActions") === "true";

document.documentElement.lang = locale === "en-nl" ? "en" : "nl";
document.body.dataset.locale = locale;
document.title = `ZekerArbo theme preview - ${locale}`;

const previewHeaderActions = document.querySelector(".preview-header-actions");
if (previewHeaderActions) previewHeaderActions.hidden = !showHeaderActions;

document.querySelectorAll("[data-i18n]").forEach((element) => {
  element.textContent = translations[element.dataset.i18n];
});

document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
  element.setAttribute(
    "aria-label",
    translations[element.dataset.i18nAriaLabel]
  );
});

document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
  element.setAttribute(
    "placeholder",
    translations[element.dataset.i18nPlaceholder]
  );
});

document.querySelectorAll("[data-i18n-href]").forEach((element) => {
  element.setAttribute("href", translations[element.dataset.i18nHref]);
});

const requestedArticle = new URLSearchParams(window.location.search).get("article");

document.querySelectorAll("[data-article-link]").forEach((element) => {
  const articleKey = element.dataset.articleLink;
  element.href = `?article=${articleKey}&locale=${locale}#main-content`;
});

const languageSelector = document.querySelector(".gb-header-language");
const languageToggle = languageSelector.querySelector(".gb-language-toggle");
const languageMenu = languageToggle.nextElementSibling;
const currentName = languageToggle.querySelector(".gb-language-name");
const currentNlFlag = languageToggle.querySelector(".gb-language-flag--nl");
const currentEnFlag = languageToggle.querySelector(".gb-language-flag--en");
const languageOption = languageMenu.querySelector(".preview-language-option");
const optionName = languageOption.querySelector(".preview-language-option-name");
const optionNlFlag = languageOption.querySelector(".gb-language-flag--nl");
const optionEnFlag = languageOption.querySelector(".gb-language-flag--en");
const isEnglish = locale === "en-nl";

currentName.textContent = isEnglish ? "English (Netherlands)" : "Nederlands";
currentNlFlag.hidden = isEnglish;
currentEnFlag.hidden = !isEnglish;
optionName.textContent = isEnglish ? "Nederlands" : "English (Netherlands)";
optionNlFlag.hidden = !isEnglish;
optionEnFlag.hidden = isEnglish;
languageOption.href = requestedArticle
  ? `?article=${requestedArticle}&locale=${isEnglish ? "nl" : "en-nl"}#main-content`
  : isEnglish
    ? "?locale=nl#top"
    : "?locale=en-nl#top";

function closeLanguageMenu() {
  languageToggle.setAttribute("aria-expanded", "false");
}

languageToggle.addEventListener("click", () => {
  const isExpanded = languageToggle.getAttribute("aria-expanded") === "true";
  languageToggle.setAttribute("aria-expanded", String(!isExpanded));
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".gb-header-language")) closeLanguageMenu();
});

languageToggle.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLanguageMenu();
    languageToggle.focus();
  }
});

function renderArticle(articleKey) {
  const article = window.previewArticles?.[articleKey];
  if (!article) return;

  const copy = article.locales[locale] || article.locales.nl;
  const container = document.querySelector("main.container");
  const articleSourceUrl = article.sourceUrls[locale] || article.sourceUrls.nl;
  const homePath = `?locale=${locale}#top`;
  const articlePath = (key) => `?article=${key}&locale=${locale}#main-content`;
  const otherArticleKeys = Object.keys(window.previewArticles).filter((key) => key !== articleKey);
  const relatedArticleKeys = otherArticleKeys;
  const recentlyViewedArticleKeys = [...otherArticleKeys].reverse();
  const articleLinks = Object.entries(window.previewArticles).map(([key, value]) => {
    const item = value.locales[locale] || value.locales.nl;
    const activeClass = key === articleKey ? " is-active" : "";
    return `<li class="gb-nav-item"><a href="${articlePath(key)}" class="gb-nav-link${activeClass}"${key === articleKey ? ' aria-current="page"' : ""}>${item.title}</a></li>`;
  }).join("");
  const demo = article.demoUrl
    ? `<div class="preview-article-demo">
        <div class="preview-article-demo-icon" aria-hidden="true">▶</div>
        <div>
          <strong>${translations.interactiveDemo}</strong>
          <a href="${article.demoUrl}" target="_blank" rel="noopener noreferrer">${translations.openDemo}</a>
        </div>
      </div>`
    : "";
  const articleLinkList = (keys) => keys.map((key) => {
    const item = window.previewArticles[key].locales[locale] || window.previewArticles[key].locales.nl;
    return `<li><a href="${articlePath(key)}">${item.title}</a></li>`;
  }).join("");

  document.querySelector(".gb-hero")?.remove();
  container.classList.add("preview-article-container");
  container.innerHTML = `
    <div class="preview-breadcrumbs" aria-label="${translations.articleLabel}">
      <a href="${homePath}">${translations.home}</a>
      <span aria-hidden="true">/</span>
      <span>${copy.section}</span>
      <span aria-hidden="true">/</span>
      <span>${copy.title}</span>
    </div>
    <div class="gb-doc-layout preview-article-layout">
      <aside class="gb-sidebar preview-article-sidebar" aria-label="${translations.navigationMenu}">
        <div class="gb-sidebar-panel">
          <nav class="gb-nav">
            <a href="${homePath}" class="gb-nav-title gb-nav-link">${translations.sampleArticles}</a>
            <ul class="gb-nav-list gb-nav-list--nested">${articleLinks}</ul>
          </nav>
        </div>
      </aside>
      <div class="gb-main preview-article-main">
        <article id="main-content" class="article">
          <header class="page-header preview-article-header">
            <h1>${copy.title}</h1>
            <p class="page-header-description">${copy.description}</p>
          </header>
          <section class="article-info">
            <div class="article-content">
              ${demo}
              <div class="article-body">${copy.body}</div>
              <p class="preview-article-source"><a href="${articleSourceUrl}" target="_blank" rel="noopener noreferrer">${translations.sourceArticle}</a></p>
            </div>
          </section>
          <footer>
            <div class="article-votes preview-article-votes">
              <h2 class="article-votes-question" id="preview-votes-label">${translations.wasHelpful}</h2>
              <div class="article-votes-controls" role="group" aria-labelledby="preview-votes-label">
                <button type="button" class="button article-vote preview-article-vote" data-vote="yes">${translations.voteYes}</button>
                <button type="button" class="button article-vote preview-article-vote" data-vote="no">${translations.voteNo}</button>
              </div>
            </div>
            <div class="article-relatives preview-article-relatives">
              <section class="recent-articles">
                <h2 class="recent-articles-title">${translations.recentlyViewed}</h2>
                <ul>${articleLinkList(recentlyViewedArticleKeys)}</ul>
              </section>
              <section class="related-articles">
                <h2 class="related-articles-title">${translations.relatedArticles}</h2>
                <ul>${articleLinkList(relatedArticleKeys)}</ul>
              </section>
            </div>
          </footer>
        </article>
      </div>
    </div>`;

  container.querySelectorAll(".preview-article-vote").forEach((button) => {
    button.addEventListener("click", () => {
      container.querySelectorAll(".preview-article-vote").forEach((voteButton) => {
        voteButton.classList.toggle("button-primary", voteButton === button);
      });
    });
  });
}

if (requestedArticle) renderArticle(requestedArticle);
