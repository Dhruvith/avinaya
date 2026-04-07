import { expect, test } from "@playwright/test";

test.describe("Avinya Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);
  });

  test("should render navigation bar with core links", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("text=AVINYA").first()).toBeVisible();

    for (const link of ["Services", "Process", "Results", "Pricing", "Contact"]) {
      await expect(page.locator(`nav >> text=${link}`)).toBeVisible();
    }

    await expect(page.locator("nav >> text=Book Free Call")).toBeVisible();
  });

  test("should render hero section with main heading and CTA", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("AI THAT");
    await expect(heading).toContainText("FEELS HUMAN");

    await expect(page.locator("#hero-cta")).toContainText("Book Free Strategy Call");
    await expect(page.locator("text=View Case Studies")).toBeVisible();
  });

  test("should render hero trust content", async ({ page }) => {
    await expect(page.locator("text=4.9/5 from 50+ brands")).toBeVisible();
    await expect(page.locator("text=Replies in under 2 hours")).toBeVisible();
    await expect(page.locator("text=Systems, not services")).toBeVisible();
  });

  test("should render trust bar and service cards", async ({ page }) => {
    await expect(page.locator("text=Built for Indian SMBs")).toBeVisible();

    const servicesSection = page.locator("#services");
    await servicesSection.scrollIntoViewIfNeeded();
    await expect(page.locator("text=AI Content Engine").first()).toBeVisible();
    await expect(page.locator("text=Lead Gen Automation").first()).toBeVisible();
    await expect(page.locator("text=WhatsApp Chatbots").first()).toBeVisible();
    await expect(page.locator("text=Full Stack Growth Systems").first()).toBeVisible();
  });

  test("should display Indian pricing in services and pricing section", async ({ page }) => {
    await expect(page.locator("text=Rs 10K-18K / mo").first()).toBeVisible();

    const pricingSection = page.locator("#pricing");
    await pricingSection.scrollIntoViewIfNeeded();
    await expect(page.locator("text=Rs 18K-25K").first()).toBeVisible();
  });

  test("should render process section and expand a step", async ({ page }) => {
    const processSection = page.locator("#process");
    await processSection.scrollIntoViewIfNeeded();

    await expect(page.locator("text=Audit").first()).toBeVisible();
    await expect(page.locator("text=Build").first()).toBeVisible();
    await expect(page.locator("text=Automate").first()).toBeVisible();
    await expect(page.locator("text=Scale").first()).toBeVisible();

    const firstToggle = page.locator("#process button[aria-controls='process-panel-0']").first();
    await firstToggle.click({ force: true });
    await expect(page.locator("text=customer journey gaps").first()).toBeVisible();
  });

  test("should render proof section cards", async ({ page }) => {
    const proofSection = page.locator("#proof");
    await proofSection.scrollIntoViewIfNeeded();

    await expect(page.locator("text=150 leads / month")).toBeVisible();
    await expect(page.locator("text=Rs 4.2L revenue / mo")).toBeVisible();
    await expect(page.locator("text=2,847 leads captured")).toBeVisible();
  });

  test("should render pricing section and toggle pricing", async ({ page }) => {
    const pricingSection = page.locator("#pricing");
    await pricingSection.scrollIntoViewIfNeeded();

    await expect(page.locator("text=Starter").first()).toBeVisible();
    await expect(page.locator("text=Growth").first()).toBeVisible();
    await expect(page.locator("text=Enterprise").first()).toBeVisible();

    await page.locator("#pricing-toggle >> text=Quarterly").click({ force: true });
    await expect(page.locator("text=Save 10%")).toBeVisible();
    await expect(page.locator("text=Rs 16.2K-22.5K").first()).toBeVisible();
  });

  test("should render contact form and accept valid submission", async ({ page }) => {
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    await expect(page.locator("#contact-name")).toBeVisible();
    await expect(page.locator("#contact-business")).toBeVisible();
    await expect(page.locator("#contact-phone")).toBeVisible();
    await expect(page.locator("#contact-pain")).toBeVisible();
    await expect(page.locator("#contact-decision")).toBeAttached();
    await expect(page.locator("text=Tell us what").first()).toBeVisible();

    await page.route("**/formspree.io/**", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.fill("#contact-name", "Test User");
    await page.fill("#contact-business", "Test Business");
    await page.fill("#contact-phone", "9876543210");
    await page.fill("#contact-pain", "Manual lead follow-up is slow.");
    await page.locator("#contact-decision").check({ force: true });
    await page.locator("#contact-submit").click({ force: true });

    await expect(page.locator("text=We'll WhatsApp you within 2 hours.")).toBeVisible();
  });

  test("should render FAQ section and expand an answer", async ({ page }) => {
    const faqSection = page.locator("#faq");
    await faqSection.scrollIntoViewIfNeeded();

    await expect(
      page.locator("text=How is Avinya different from a traditional marketing agency?")
    ).toBeVisible();

    await page.locator(".faq-question").first().click();
    await expect(
      page.locator("text=Traditional agencies usually sell time").first()
    ).toBeVisible();
  });

  test("should render footer details", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    await expect(footer.locator("text=Built by engineers, not suits")).toBeVisible();
    await expect(footer.locator("text=14-day money-back guarantee")).toBeVisible();
    await expect(footer.locator("text=No long-term contracts")).toBeVisible();
    await expect(footer.locator("text=17.4065 deg N, 78.4772 deg E")).toBeVisible();
  });

  test("should navigate to contact section when hero CTA is clicked", async ({ page }) => {
    await page.locator("#hero-cta").click({ force: true });
    await expect(page.locator("#contact-name")).toBeVisible();
  });

  test("should show mobile navigation toggle and open menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);

    const menuToggle = page.locator("#mobile-menu-toggle");
    await expect(menuToggle).toBeVisible();
    await menuToggle.click({ force: true });

    await expect(page.locator(".fixed >> text=Book Free Call")).toBeVisible();
  });

  test("should have page metadata and accessibility landmarks", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.locator(".skip-link")).toHaveAttribute("href", "#main-content");

    const title = await page.title();
    expect(title).toContain("Avinya");

    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });
});
