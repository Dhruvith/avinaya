import { test, expect } from "@playwright/test";

/* ============================
   Tests de UI para Avinya Landing Page — Actualizado
   Verifica estructura, secciones, interactividad, formulario y FAQ
   ============================ */

test.describe("Avinya Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    /* Esperar a que la animación de carga termine */
    await page.waitForTimeout(4000);
  });

  /* ============================
     Tests de estructura y navegación
     ============================ */
  test("should render navigation bar with logo and links", async ({ page }) => {
    const logo = page.locator("text=AVINYA");
    await expect(logo.first()).toBeVisible();

    const navLinks = ["Services", "Process", "Results", "Pricing", "Contact"];
    for (const link of navLinks) {
      await expect(page.locator(`nav >> text=${link}`)).toBeVisible();
    }

    await expect(page.locator("nav >> text=Book Free Call")).toBeVisible();
  });

  test("should render hero section with main heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("AI THAT");
    await expect(heading).toContainText("FEELS");
    await expect(heading).toContainText("HUMAN");
  });

  test("should render hero CTA button", async ({ page }) => {
    const ctaButton = page.locator("#hero-cta");
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText("Book Free Strategy Call");
  });

  test("should render trust badges in hero", async ({ page }) => {
    await expect(
      page.locator("text=4.9/5 from 50+ clients").first()
    ).toBeVisible();
    await expect(
      page.locator("text=No credit card required").first()
    ).toBeVisible();
  });

  test("should render tagline text", async ({ page }) => {
    await expect(
      page.locator("text=AI Marketing").first()
    ).toBeVisible();
  });

  /* ============================
     Tests de las secciones principales
     ============================ */
  test("should render trust bar marquee", async ({ page }) => {
    await expect(page.locator("text=63M+ Indian SMBs").first()).toBeVisible();
  });

  test("should render services section with cards", async ({ page }) => {
    const servicesSection = page.locator("#services");
    await servicesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    await expect(page.locator("text=AI Content Engine").first()).toBeVisible();
    await expect(page.locator("text=Lead Gen Automation").first()).toBeVisible();
    await expect(page.locator("text=WhatsApp Chatbots").first()).toBeVisible();
  });

  test("should display pricing in Indian Rupees", async ({ page }) => {
    const servicesSection = page.locator("#services");
    await servicesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(page.locator("text=₹10K–18K/mo")).toBeVisible();
  });

  test("should render process section with timeline steps", async ({ page }) => {
    const processSection = page.locator("#process");
    await processSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    await expect(page.locator("text=Audit").first()).toBeVisible();
    await expect(page.locator("text=Build").first()).toBeVisible();
    await expect(page.locator("text=Automate").first()).toBeVisible();
    await expect(page.locator("text=Scale").first()).toBeVisible();
  });

  test("should render proof section with result cards", async ({ page }) => {
    const proofSection = page.locator("#proof");
    await proofSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    await expect(page.locator("text=150 leads/month")).toBeVisible();
    await expect(page.locator("text=₹4.2L revenue/mo")).toBeVisible();
  });

  test("should render pricing section with tiers", async ({ page }) => {
    const pricingSection = page.locator("#pricing");
    await pricingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    await expect(page.locator("text=Starter").first()).toBeVisible();
    await expect(page.locator("text=Growth").first()).toBeVisible();
    await expect(page.locator("text=Enterprise").first()).toBeVisible();
  });

  /* ============================
     Tests de interactividad
     ============================ */
  test("should toggle pricing between monthly and quarterly", async ({
    page,
  }) => {
    const pricingSection = page.locator("#pricing");
    await pricingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    await expect(page.locator("text=₹18K–25K").first()).toBeVisible();

    await page.locator("#pricing-toggle").click({ force: true });
    await page.waitForTimeout(800);

    await expect(page.locator("text=Save 10%")).toBeVisible();
  });

  test("should expand process step on hover", async ({ page }) => {
    const processSection = page.locator("#process");
    await processSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    const auditNode = page.locator(".timeline-node").first();
    await auditNode.hover();
    await page.waitForTimeout(500);

    await expect(
      page.locator("text=We analyze your existing marketing stack")
    ).toBeVisible();
  });

  /* ============================
     Tests del formulario de contacto — Simplificado a 5 campos
     ============================ */
  test("should render contact form with essential fields", async ({ page }) => {
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    /* Los 5 campos esenciales */
    await expect(page.locator("#contact-name")).toBeVisible();
    await expect(page.locator("#contact-business")).toBeVisible();
    await expect(page.locator("#contact-phone")).toBeVisible();
    await expect(page.locator("#contact-pain")).toBeVisible();
    await expect(page.locator("#contact-decision")).toBeAttached();
  });

  test("should render contact form poetic copy", async ({ page }) => {
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(
      page.locator("text=Tell us what keeps you up at night.")
    ).toBeVisible();
  });

  test("should accept valid form submission", async ({ page }) => {
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    await page.fill("#contact-name", "Test User");
    await page.fill("#contact-business", "Test Business");
    await page.fill("#contact-phone", "9876543210");
    await page.locator("#contact-decision").check({ force: true });

    await page.route("**/formspree.io/**", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.locator("#contact-submit").click({ force: true });
    await page.waitForTimeout(2000);

    await expect(
      page.locator("text=WhatsApp you within 2 hours")
    ).toBeVisible();
  });

  /* ============================
     Tests de FAQ
     ============================ */
  test("should render FAQ section", async ({ page }) => {
    const faqSection = page.locator("#faq");
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    await expect(
      page.locator("text=How is Avinya different from a traditional marketing agency?")
    ).toBeVisible();
  });

  test("should expand FAQ item on click", async ({ page }) => {
    const faqSection = page.locator("#faq");
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    /* Clic en la primera pregunta */
    await page.locator(".faq-question").first().click();
    await page.waitForTimeout(500);

    /* Verificar que la respuesta es visible */
    await expect(
      page.locator("text=Traditional agencies sell you hours").first()
    ).toBeVisible();
  });

  /* ============================
     Tests del footer
     ============================ */
  test("should render footer with Hyderabad coordinates", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await expect(page.locator("text=17.4065° N, 78.4772° E")).toBeVisible();
    await expect(page.locator("text=Hyderabad").first()).toBeVisible();
  });

  test("should show engineers stamp in footer", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await expect(
      page.locator("text=Built by engineers, not suits")
    ).toBeVisible();
  });

  test("should show guarantees in footer", async ({ page }) => {
    /* Scroll hasta el final absoluto de la página */
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    /* Verificar que existen dentro del footer */
    await expect(
      footer.locator("text=14-day money-back guarantee")
    ).toBeVisible();
    await expect(
      footer.locator("text=No long-term contracts")
    ).toBeVisible();
  });

  /* ============================
     Tests de navegación por scroll
     ============================ */
  test("should navigate to contact section when CTA clicked", async ({
    page,
  }) => {
    await page.locator("#hero-cta").click({ force: true });
    await page.waitForTimeout(2000);

    await expect(page.locator("#contact-name")).toBeVisible();
  });

  /* ============================
     Tests de responsive / mobile
     ============================ */
  test("should show mobile menu toggle on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);

    const menuToggle = page.locator("#mobile-menu-toggle");
    await expect(menuToggle).toBeVisible();
  });

  test("should open mobile menu when hamburger clicked", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);

    await page.locator("#mobile-menu-toggle").click({ force: true });
    await page.waitForTimeout(500);

    await expect(
      page.locator(".fixed >> text=Book Free Call")
    ).toBeVisible();
  });

  /* ============================
     Tests de SEO y accesibilidad
     ============================ */
  test("should have correct page title", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Avinya");
  });

  test("should have semantic HTML structure", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.locator("nav")).toBeVisible();
  });

  test("should have skip link for accessibility", async ({ page }) => {
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  test("should have main content landmark", async ({ page }) => {
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeVisible();
  });
});
