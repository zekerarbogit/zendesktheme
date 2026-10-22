import "./serviceExperience";

function ready(markup: string) {
  document.body.innerHTML = markup;
  window.dispatchEvent(new Event("DOMContentLoaded"));
}

describe("article navigation", () => {
  it("keeps existing anchors, avoids ID collisions and includes migrated h4 headings", () => {
    ready(`<div id="za-heading-1"></div><nav data-za-toc hidden><ol></ol></nav>
      <div class="article-body"><h2>Start</h2><h4 id="existing">Steps</h4><details><summary>More</summary><h3>Hidden detail</h3></details></div>`);
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-za-toc] a")
    );
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "#za-heading-1-section",
      "#existing",
    ]);
    expect(document.querySelector("[data-za-toc]")).not.toHaveAttribute(
      "hidden"
    );
    expect(links.map((link) => link.textContent)).toEqual(["Start", "Steps"]);
  });

  it("leaves the contents panel hidden for short articles", () => {
    ready(
      '<nav data-za-toc hidden><ol></ol></nav><div class="article-body"><h2>Only heading</h2></div>'
    );
    expect(document.querySelector("[data-za-toc]")).toHaveAttribute("hidden");
  });

  it("does not interpret heading text as markup", () => {
    ready(
      '<nav data-za-toc hidden><ol></ol></nav><div class="article-body"><h2>&lt;img src=x onerror=alert(1)&gt;</h2><h3>Next</h3></div>'
    );
    expect(document.querySelector("[data-za-toc] img")).toBeNull();
    expect(document.querySelector("[data-za-toc] a")?.textContent).toBe(
      "<img src=x onerror=alert(1)>"
    );
  });
});
