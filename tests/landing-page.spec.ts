import { test, expect } from "@playwright/test";

/* ============================
   Tests de UI para Avinya Landing Page
   Verifica estructura, secciones, interactividad y formulario
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

    await expect(page.locator("nav >> text=Start Your Pilot")).toBeVisible();
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
    await expect(ctaButton).toContainText("Start Your Pilot");
  });

  test("should render tagline text", async ({ page }) => {
    /* El tagline puede estar en la nav o hero — buscamos texto parcial */
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

    /* Verificar precios mensuales por defecto */
    await expect(page.locator("text=₹18K–25K").first()).toBeVisible();

    /* Hacer clic en el toggle con force para evitar problemas de animación */
    await page.locator("#pricing-toggle").click({ force: true });
    await page.waitForTimeout(800);

    /* Verificar que aparece el badge de descuento (indica que cambió a quarterly) */
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
     Tests del formulario de contacto
     ============================ */
  test("should render contact form with all fields", async ({ page }) => {
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    await expect(page.locator("#contact-name")).toBeVisible();
    await expect(page.locator("#contact-business")).toBeVisible();
    await expect(page.locator("#contact-sell")).toBeVisible();
    await expect(page.locator("#contact-revenue")).toBeVisible();
    await expect(page.locator("#contact-pain")).toBeVisible();
    await expect(page.locator("#contact-phone")).toBeVisible();
    await expect(page.locator("#contact-time")).toBeVisible();
    await expect(page.locator("#contact-budget")).toBeVisible();
    await expect(page.locator("#contact-decision")).toBeVisible();
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

    /* Llenar formulario */
    await page.fill("#contact-name", "Test User");
    await page.fill("#contact-business", "Test Business");
    await page.fill("#contact-phone", "9876543210");
    await page.locator("#contact-decision").check({ force: true });

    /* Interceptar Formspree */
    await page.route("**/formspree.io/**", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true }),
      });
    });

    /* Clic con force para saltear la animación de breathe */
    await page.locator("#contact-submit").click({ force: true });
    await page.waitForTimeout(2000);

    /* Verificar estado de éxito */
    await expect(
      page.locator("text=WhatsApp you within 2 hours")
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
    await expect(page.getByRole("heading", { name: "AVINYA" })).toBeVisible();
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

  /* ============================
     Tests de navegación por scroll
     ============================ */
  test("should navigate to contact section when CTA clicked", async ({
    page,
  }) => {
    /* Clic con force para evitar el "not stable" del breathe */
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

    /* Verificar que el menú está abierto comprobando que hay un enlace visible de "Start Your Pilot" en el overlay */
    await expect(
      page.locator(".fixed >> text=Start Your Pilot")
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
});
