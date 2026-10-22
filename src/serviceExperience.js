// Progressive enhancements: links, search and article content work without JavaScript.
window.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".za-hero-layout"))
    document.body.classList.add("za-home-page");

  document.querySelectorAll("[data-za-font]").forEach((link) => {
    const family = link.dataset.zaFont === "matter" ? "Matter" : "Doyle";
    const font = new FontFace(
      family,
      'url("' + link.href.replace(/"/g, "%22") + '")',
      {
        style: family === "Doyle" ? "italic" : "normal",
        display: "swap",
      }
    );
    font
      .load()
      .then((loaded) => document.fonts.add(loaded))
      .catch(() => {});
  });

  const body = document.querySelector(".article-body");
  const toc = document.querySelector("[data-za-toc]");
  if (!body || !toc) return;
  // Include h4: migrated articles often use this as their first heading level.
  const headings = Array.from(body.querySelectorAll("h2, h3, h4")).filter(
    (heading) => heading.textContent.trim() && !heading.closest("details")
  );
  if (headings.length < 2) return;
  headings.forEach((heading, index) => {
    if (!heading.id) {
      let id = "za-heading-" + (index + 1);
      while (document.getElementById(id)) id += "-section";
      heading.id = id;
    }
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#" + encodeURIComponent(heading.id);
    link.textContent = heading.textContent;
    item.appendChild(link);
    toc.querySelector("ol").appendChild(item);
  });
  toc.hidden = false;
});
