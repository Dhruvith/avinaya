import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile-small", width: 360, height: 780 },
  { name: "mobile-large", width: 430, height: 932 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1200 },
];

for (const viewport of VIEWPORTS) {
  test(`layout audit ${viewport.name}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    await page.waitForTimeout(2200);

    const horizontalOverflow = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;
      const offenders = Array.from(document.querySelectorAll<HTMLElement>("body *"))
        .filter((element) => {
          if (element.closest(".value-scroll")) {
            return false;
          }

          const style = window.getComputedStyle(element);
          if (style.position === "fixed") {
            return false;
          }

          const rect = element.getBoundingClientRect();
          return rect.right > viewportWidth + 1 || rect.left < -1;
        })
        .map((element) => ({
          tag: element.tagName.toLowerCase(),
          className: element.className,
          left: Math.round(element.getBoundingClientRect().left),
          right: Math.round(element.getBoundingClientRect().right),
          width: Math.round(element.getBoundingClientRect().width),
          text: element.textContent?.trim().slice(0, 80) ?? "",
        }));

      return offenders;
    });

    await page.screenshot({
      path: testInfo.outputPath(`${viewport.name}.png`),
      fullPage: true,
    });

    expect(
      horizontalOverflow,
      `Visible overflow detected for ${viewport.name}: ${JSON.stringify(horizontalOverflow, null, 2)}`
    ).toEqual([]);
  });
}
