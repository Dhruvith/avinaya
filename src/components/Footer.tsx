export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-shell pt-0">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="footer-panel">
          <div className="footer-grid">
            <div className="footer-stack">
              <div
                className="text-3xl font-extrabold tracking-[-0.08em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                AVINYA
              </div>
              <p className="max-w-sm text-[15px] text-[var(--text-soft)]">
                AI growth systems for modern Indian brands that want sharper conversion
                without sacrificing tone, polish, or trust.
              </p>
              <div className="stamp">Built by engineers, not suits</div>
            </div>

            <div className="footer-stack">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Navigate
              </div>
              <a href="#services" className="focus-ring text-[15px] text-[var(--text-soft)]">Services</a>
              <a href="#process" className="focus-ring text-[15px] text-[var(--text-soft)]">Process</a>
              <a href="#proof" className="focus-ring text-[15px] text-[var(--text-soft)]">Results</a>
              <a href="#pricing" className="focus-ring text-[15px] text-[var(--text-soft)]">Pricing</a>
              <a href="#contact" className="focus-ring text-[15px] text-[var(--text-soft)]">Contact</a>
            </div>

            <div className="footer-stack">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Contact
              </div>
              <div className="text-[15px] text-[var(--text-soft)]">dhruvith2004@gmail.com</div>
              <div className="text-[15px] text-[var(--text-soft)]">Hyderabad, Telangana</div>
              <div className="text-[15px] text-[var(--text-soft)]">India</div>
              <div className="text-[15px] text-[var(--text-soft)]">17.4065 deg N, 78.4772 deg E</div>
            </div>

            <div className="footer-stack">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Guarantees
              </div>
              <div className="text-[15px] text-[var(--text-soft)]">14-day money-back guarantee</div>
              <div className="text-[15px] text-[var(--text-soft)]">No long-term contracts</div>
              <div className="text-[15px] text-[var(--text-soft)]">Private client data handling</div>
              <div className="text-[15px] text-[var(--text-soft)]">2-hour WhatsApp response window</div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
            <div>Made in Hyderabad for ambitious Indian brands.</div>
            <div>Copyright {currentYear} Avinya. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
