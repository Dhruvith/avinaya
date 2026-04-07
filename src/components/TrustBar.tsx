const TRUST_ITEMS = [
  "Built for Indian SMBs",
  "WhatsApp-first conversion flows",
  "No cookie-cutter retainers",
  "Premium systems, not more admin",
  "Hyderabad-based, pan-India delivery",
  "Revenue-focused automation design",
];

export default function TrustBar() {
  return (
    <section className="value-band" aria-label="Trust indicators">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="value-scroll">
          {TRUST_ITEMS.map((item) => (
            <span key={item} className="value-pill">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
