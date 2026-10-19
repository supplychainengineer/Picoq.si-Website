import { expect, test } from "@playwright/test";

test("the planned discovery steps are selectable with a keyboard", async ({ page }) => {
  await page.goto("/");
  const choices = page.locator(".discovery-steps button");
  await expect(choices).toHaveCount(4);
  for (const choice of await choices.all()) {
    await choice.focus();
    await page.keyboard.press("Enter");
    await expect(choice).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".discovery-readout strong")).toHaveText(await choice.locator(".step-title").innerText());
    await expect(page.locator('.discovery-steps button[aria-pressed="true"]')).toHaveCount(1);
  }
  await expect(page.locator(".local-demo")).toContainText("sample data");
});

test("one control pauses automatic motion and reduced motion is respected", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name !== "reduced-motion") {
    const pause = page.getByRole("button", { name: "Pause motion", exact: true });
    await expect(pause).toBeVisible();
    await pause.click();
    await expect(page.getByRole("button", { name: "Play motion", exact: true })).toHaveAttribute("aria-pressed", "true");
    for (const selector of [".cinematic-artwork", ".ticker-track"]) {
      await expect.poll(() => page.locator(selector).evaluate(el => getComputedStyle(el).animationPlayState)).toBe("paused");
    }
    await expect.poll(() => page.locator(".manifesto-word").first().evaluate(el => getComputedStyle(el).color)).toBe("rgb(10, 10, 10)");
    await page.getByRole("button", { name: "Play motion", exact: true }).click();
    await expect.poll(() => page.locator(".ticker-track").evaluate(el => getComputedStyle(el).animationPlayState)).toBe("running");
    await page.emulateMedia({ reducedMotion: "reduce" });
  }
  await expect(page.locator(".motion-control")).not.toBeVisible();
  for (const selector of [".cinematic-artwork", ".ticker-track"]) {
    expect(await page.locator(selector).evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  }
});
