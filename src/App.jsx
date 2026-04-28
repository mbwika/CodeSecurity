import { useMemo, useState } from "react";

const sections = [
  { id: "services", label: "Our Services" },
  { id: "issues", label: "Common Issues" },
  { id: "deliverables", label: "What You Get" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
];

const issues = [
  { icon: "📧", text: "Missing email protections (DMARC, SPF, DKIM): attackers can impersonate your business." },
  { icon: "🔓", text: "Employee emails found in data breaches: higher risk of account takeover." },
  { icon: "🌐", text: "Website security gaps (SSL issues, misconfigurations): customer trust takes a hit." },
  { icon: "🚪", text: "Exposed login portals or test environments: easy entry points for attackers." },
];

const outcomes = [
  { icon: "📄", text: "A simple security report (1-2 pages)." },
  { icon: "📊", text: "A risk score with clear explanations." },
  { icon: "📋", text: "Step-by-step recommendations." },
  { icon: "🔧", text: "Optional help fixing the issues." },
];

function App() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [sending, setSending] = useState(false);

  const formEndpoint = useMemo(
    () =>
      import.meta.env.VITE_FORMSPREE_ENDPOINT ||
      "https://formspree.io/f/your-form-id",
    []
  );
  const turnstileSiteKey = useMemo(
    () => import.meta.env.VITE_TURNSTILE_SITE_KEY || "YOUR_TURNSTILE_SITE_KEY",
    []
  );

  const social = useMemo(
    () => ({
      linkedin:
        import.meta.env.VITE_LINKEDIN_URL ||
        "https://www.linkedin.com/in/your-profile",
      x: import.meta.env.VITE_X_URL || "https://x.com/your-handle",
      github:
        import.meta.env.VITE_GITHUB_URL || "https://github.com/your-handle",
    }),
    []
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });
    setSending(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const businessEmail = data.get("businessEmail");
    const token = data.get("cf-turnstile-response");

    if (!token) {
      setSending(false);
      setStatus({
        type: "error",
        message: "Please complete the verification check before submitting.",
      });
      return;
    }

    data.set("email", String(businessEmail || ""));
    data.set("_replyto", String(businessEmail || ""));
    data.set("_subject", "New Security Check Request - Code & Security");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }

      form.reset();
      if (window.turnstile) {
        window.turnstile.reset();
      }
      setStatus({
        type: "success",
        message:
          "Thanks, your request has been sent. You should also receive an auto-confirmation email shortly.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Submission failed. Please try again or email consulting@codensecurity.com directly.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-mesh min-h-screen">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8">
        <header className="reveal rounded-lg border border-white/15 bg-ink-900/50 px-4 py-4 shadow-panel backdrop-blur sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo-placeholder.svg"
                alt="Code & Security logo placeholder"
                className="h-11 w-auto rounded"
              />
              <div>
                <p className="font-display text-xl font-semibold text-white">Code & Security</p>
                <p className="text-sm text-slate-300">Protecting Your Digital Assets</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm">
              {sections.map((item) => (
                <a
                  key={item.id}
                  className="rounded-md border border-white/20 px-3 py-2 text-slate-100 transition hover:border-brand-cyan/80 hover:text-brand-cyan"
                  href={`#${item.id}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="mt-8 space-y-8">
          <section className="reveal rounded-lg border border-white/15 bg-ink-800/55 px-6 py-10 shadow-panel backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🛡️</span>
              <p className="font-display text-sm font-semibold uppercase tracking-wide text-brand-lime">
                Cybersecurity Consulting Firm
              </p>
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Simple Cybersecurity Checks for Small Businesses
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-200">
              Know what hackers can see about your business before they do. We help small
              businesses identify and fix common security risks in websites, domains, and
              email systems with no jargon and practical fixes.
            </p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md bg-brand-cyan px-5 py-3 font-semibold text-ink-900 transition hover:bg-cyan-300"
              >
                <span>🔍</span>
                Get a Free Security Check
              </a>
              <span className="text-sm text-slate-300">No cost • No obligation</span>
            </div>
          </section>

          <section id="services" className="reveal rounded-lg border border-white/15 bg-ink-800/55 px-6 py-8 shadow-panel">
            <h2 className="font-display text-3xl font-bold text-white">Our Services</h2>
            <p className="mt-4 max-w-3xl text-slate-200">
              We run a focused security check on your online presence and show where your
              business is exposed, what each risk means, and how to fix it quickly.
              You do not need an IT department or expensive tools, just clarity and the right steps.
            </p>
          </section>

          <section id="issues" className="reveal rounded-lg border border-white/15 bg-ink-800/55 px-6 py-8 shadow-panel">
            <h2 className="font-display text-3xl font-bold text-white">Common Issues We Find</h2>
            <ul className="mt-5 grid gap-3 text-slate-100">
              {issues.map((item) => (
                <li key={item.text} className="rounded-md border border-white/15 bg-ink-900/50 px-4 py-3 flex items-start gap-3">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="deliverables" className="reveal rounded-lg border border-white/15 bg-ink-800/55 px-6 py-8 shadow-panel">
            <h2 className="font-display text-3xl font-bold text-white">What You Get</h2>
            <ul className="mt-5 grid gap-3 text-slate-100 sm:grid-cols-2">
              {outcomes.map((item) => (
                <li key={item.text} className="rounded-md border border-white/15 bg-ink-900/50 px-4 py-3 flex items-start gap-3">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="reveal rounded-lg border border-white/15 bg-ink-800/55 px-6 py-8 shadow-panel">
            <h2 className="font-display text-3xl font-bold text-white">Why Choose Us</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-md border border-white/15 bg-ink-900/50 p-4 text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold text-white mb-2">Fast Results</h3>
                <p className="text-sm text-slate-300">Quick security assessments with actionable insights within 48 hours.</p>
              </div>
              <div className="rounded-md border border-white/15 bg-ink-900/50 p-4 text-center">
                <div className="text-3xl mb-3">💼</div>
                <h3 className="font-semibold text-white mb-2">Business Focused</h3>
                <p className="text-sm text-slate-300">Practical solutions designed specifically for small business needs.</p>
              </div>
              <div className="rounded-md border border-white/15 bg-ink-900/50 p-4 text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-semibold text-white mb-2">Expert Security</h3>
                <p className="text-sm text-slate-300">Certified cybersecurity professionals with real-world experience.</p>
              </div>
            </div>
          </section>

          <section id="about" className="reveal rounded-lg border border-white/15 bg-ink-800/55 px-6 py-8 shadow-panel">
            <h2 className="font-display text-3xl font-bold text-white">About Us</h2>
            <p className="mt-4 max-w-3xl text-slate-200">
              We are a team of cybersecurity professionals specializing in practical security solutions for small businesses.
              With years of experience in software engineering and cybersecurity, we focus on identifying real-world risks
              that affect businesses and providing clear, actionable fixes without unnecessary complexity.
            </p>
          </section>

          <section id="contact" className="reveal rounded-lg border border-white/15 bg-ink-800/55 px-6 py-8 shadow-panel">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📞</span>
              <h2 className="font-display text-3xl font-bold text-white">Get Your Free Security Assessment</h2>
            </div>
            <p className="mt-4 max-w-3xl text-slate-200">
              No cost. No obligation. Fill out the form and we will review your domain or website
              and provide you with a comprehensive security report.
            </p>

            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Name</span>
                <input
                  required
                  name="name"
                  type="text"
                  className="rounded-md border border-white/20 bg-ink-900/70 px-3 py-2 text-white outline-none ring-brand-cyan transition focus:ring-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Business Email</span>
                <input
                  required
                  name="businessEmail"
                  type="email"
                  className="rounded-md border border-white/20 bg-ink-900/70 px-3 py-2 text-white outline-none ring-brand-cyan transition focus:ring-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Company</span>
                <input
                  required
                  name="company"
                  type="text"
                  className="rounded-md border border-white/20 bg-ink-900/70 px-3 py-2 text-white outline-none ring-brand-cyan transition focus:ring-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Website or Domain</span>
                <input
                  required
                  name="domain"
                  type="text"
                  placeholder="example.com"
                  className="rounded-md border border-white/20 bg-ink-900/70 px-3 py-2 text-white outline-none ring-brand-cyan transition focus:ring-2"
                />
              </label>
              <label className="sm:col-span-2 flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Message</span>
                <textarea
                  required
                  name="message"
                  rows="5"
                  className="rounded-md border border-white/20 bg-ink-900/70 px-3 py-2 text-white outline-none ring-brand-cyan transition focus:ring-2"
                  placeholder="Tell me what you would like reviewed."
                />
              </label>

              <label className="sm:col-span-2 flex items-start gap-3 rounded-md border border-white/20 bg-ink-900/50 px-3 py-3 text-sm text-slate-100">
                <input required type="checkbox" name="consent" className="mt-1 h-4 w-4 rounded border-white/30" />
                <span>
                  I agree to be contacted by Code & Security about this request.
                </span>
              </label>

              <div
                className="sm:col-span-2 cf-turnstile"
                data-sitekey={turnstileSiteKey}
              ></div>

              <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  disabled={sending}
                  type="submit"
                  className="rounded-md bg-brand-lime px-5 py-3 font-semibold text-ink-900 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {sending ? "Sending..." : "Request Security Check"}
                </button>
                <p className="text-sm text-slate-300">
                  You can also email{" "}
                  <a className="font-semibold text-brand-cyan hover:text-cyan-300" href="mailto:consulting@codensecurity.com">
                    consulting@codensecurity.com
                  </a>
                </p>
              </div>

              {status.type !== "idle" && (
                <p
                  className={`sm:col-span-2 rounded-md border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-brand-lime/50 bg-lime-200/10 text-lime-100"
                      : "border-red-300/50 bg-red-200/10 text-red-100"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </section>
        </main>

        <footer className="mt-8 reveal rounded-lg border border-white/15 bg-ink-900/55 px-6 py-6 text-sm text-slate-300">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-white">Code & Security</p>
              <p className="text-xs">Professional Cybersecurity Consulting</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a className="hover:text-brand-cyan transition-colors" href={social.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="hover:text-brand-cyan transition-colors" href={social.x} target="_blank" rel="noreferrer">
                X
              </a>
              <a className="hover:text-brand-cyan transition-colors" href={social.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="hover:text-brand-cyan transition-colors" href="/privacy-policy.html">
                Privacy Policy
              </a>
              <a className="hover:text-brand-cyan transition-colors" href="/terms.html">
                Terms
              </a>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} Code & Security. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
