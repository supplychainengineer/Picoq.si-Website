import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test("the complete site renders without runtime errors or external requests", async ({ page }, testInfo) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("request", request => { if (!new URL(request.url()).hostname.match(/^(127\.0\.0\.1|localhost)$/)) external.push(request.url()); });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Every small business deserves an agent.");
  await expect(page.locator(".metric-number")).toHaveText(["53.", "325.", "101.", "99."]);
  await expect(page.locator(".api-metric")).toContainText("500SerpAPI calls");
  await expect(page.locator(".pilot-panel .status-pill")).toHaveText(["In development", "In development"]);
  await expect(page.locator(".vision-diagram")).toContainText("Future concept");
  await expect(page.locator(".local-demo")).toContainText("All shop names, distances, prices, times, and stock details are sample data.");
  await expect(page.locator(".seller-demo")).toContainText("Not yet operational");
  await expect(page.locator("footer")).toBeAttached();
  await page.evaluate(() => document.fonts.ready);
  // Screenshots are review artifacts, not assertions against an invented baseline.
  await mkdir("artifacts", { recursive: true });
  await page.screenshot({ path: `artifacts/${testInfo.project.name}.png`, fullPage: true, animations: "disabled" });
  if (testInfo.project.name === "desktop") await page.screenshot({ path: "artifacts/desktop-hero.png", animations: "disabled" });
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test("every CTA destination and section navigation target is valid", async ({ page }) => {
  await page.goto("/");
  const expected = {
    agent: "https://wa.me/12293508928",
    merchant: "https://wa.me/12293508928?text=Hi%20Picoq%2C%20I%20want%20to%20join%20the%20local%20business%20pilot.",
    existing: "https://picoq.shop/",
  };
  const outbound = await page.locator('a[href^="https:"]').evaluateAll(links => links.map(link => ({ href: link.getAttribute("href"), text: link.textContent, rel: link.getAttribute("rel") })));
  expect(new Set(outbound.map(link => link.href))).toEqual(new Set(Object.values(expected)));
  for (const link of outbound) {
    expect(Object.values(expected)).toContain(link.href);
    expect(link.rel).toContain("noopener");
    if (/business|pilot/i.test(link.text ?? "")) expect(link.href).toBe(expected.merchant);
    if (/Try|WhatsApp/i.test(link.text ?? "")) expect(link.href).toBe(expected.agent);
  }
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!).filter(hash => hash !== "#" && !document.getElementById(hash.slice(1))));
  expect(brokenAnchors).toEqual([]);
  if (await page.locator(".desktop-nav").isVisible()) {
    for (const link of await page.locator(".desktop-nav a").all()) {
      const section = page.locator((await link.getAttribute("href"))!);
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(section).toBeFocused();
      await expect(page).toHaveURL("/");
    }
  }
  await page.locator(".hero-scroll").click();
  await expect(page.locator("#what-is-live")).toBeFocused();
  await expect(page).toHaveURL("/");
  await page.locator(".brand-link").click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page).toHaveURL("/");
});

test("FAQ and privacy disclosures work using only the keyboard", async ({ page }) => {
  await page.goto("/");
  const items = page.locator(".faq-item");
  await expect(items).toHaveCount(7);
  for (const item of await items.all()) {
    await item.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(item).toHaveAttribute("open", "");
    await expect(item.locator("p")).toBeVisible();
    await page.keyboard.press("Space");
    await expect(item).not.toHaveAttribute("open", "");
  }
  await page.locator("#privacy summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#privacy p")).toBeVisible();
});

test("mobile navigation traps focus, closes, and sends focus to the chosen section", async ({ page }) => {
  await page.goto("/");
  const open = page.getByRole("button", { name: "Open menu" });
  test.skip(!(await open.isVisible()), "Desktop uses the visible inline navigation.");
  await open.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(dialog).toBeVisible();
  await expect(open).toHaveAttribute("aria-expanded", "true");
  const close = page.getByRole("button", { name: "Close menu" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  await page.keyboard.press("Enter");
  await close.click();
  await expect(open).toBeFocused();
  await page.keyboard.press("Enter");
  await dialog.getByRole("link", { name: /For businesses/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL("/");
  await expect(page.locator("#for-businesses")).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await open.click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(dialog).not.toBeVisible();
});

test("WCAG A and AA automated checks pass, including expanded content", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const first = page.locator(".faq-item summary").first();
  await first.click();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  const menu = page.getByRole("button", { name: "Open menu" });
  if (await menu.isVisible()) {
    await menu.click();
    const dialogResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(dialogResults.violations).toEqual([]);
  }
});

test("layouts fit their viewport and reduced motion disables animations", async ({ page }, testInfo) => {
  await page.goto("/");
  const widths = testInfo.project.name === "desktop" ? [640, 768, 900, 1024, 1440, 1920] : [360, 390, 430];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(overflow.content, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(overflow.viewport);
  }
  if (testInfo.project.name === "reduced-motion") {
    expect(await page.locator("html").evaluate(el => getComputedStyle(el).scrollBehavior)).toBe("auto");
    expect(await page.locator(".hero-line").first().evaluate(el => getComputedStyle(el).animationName)).toBe("none");
    expect(await page.locator(".cinematic-artwork").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  }
});

test("essential content, links, and disclosures survive without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".hero-actions").getByRole("link", { name: "Try the live agent" })).toHaveAttribute("href", "https://wa.me/12293508928");
  await page.locator(".faq-item summary").first().click();
  await expect(page.locator(".faq-item").first().locator("p")).toBeVisible();
  await context.close();
});

test("review metadata, favicon, robots, sitemap, and social image are served", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Picoq — Every small business deserves an agent");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /planned local pilots/);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  for (const path of ["/icon.svg", "/sitemap.xml", "/opengraph-image"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    if (path === "/opengraph-image") expect(response.headers()["content-type"]).toContain("image/png");
  }
});
