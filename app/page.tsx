"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type ContactFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  debt: string;
  solution: string;
  additional: string;
};

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");
    setStatusType("");

    const formData = new FormData(event.currentTarget);
    const payload: ContactFormData = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      debt: String(formData.get("debt") ?? "").trim(),
      solution: String(formData.get("solution") ?? "").trim(),
      additional: String(formData.get("additional") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to send consultation request.");
      }

      event.currentTarget.reset();
      setStatusType("success");
      setStatusMessage(
        result.message ??
          "Thanks! Your consultation request has been sent successfully.",
      );
    } catch (error) {
      setStatusType("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav>
        <Link href="/" className="logo">
          Credit <span>Solutions</span>
        </Link>
        <ul className="nav-links">
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#how">How It Works</a>
          </li>
          <li>
            <a href="#why">About Us</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <a href="#contact" className="nav-cta">
          Free Consultation
        </a>
      </nav>

      <div className="hero">
        <div className="hero-text">
          <span className="hero-badge">UK Debt Relief Specialists</span>
          <h1>
            Struggling with Debt?
            <br />
            <span>We&apos;re Here to Help.</span>
          </h1>
          <p>
            Credit Solutions is a trusted UK-based agency helping individuals find
            the right path out of debt with compassion, clarity, and expert
            guidance.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">
              Get Free Consultation
            </a>
            <a href="#services" className="btn-secondary">
              Our Services
            </a>
          </div>
        </div>
        <div className="hero-card">
          <p>People helped this year</p>
          <div className="hero-stat">
            <span className="num">1,800+</span>
          </div>
          <hr className="hero-divider" />
          <p>Average debt resolved</p>
          <div className="hero-stat">
            <span className="num">£50k</span>
          </div>
          <hr className="hero-divider" />
          <p>Years of experience</p>
          <div className="hero-stat">
            <span className="num">12</span>
            <span className="unit">yrs</span>
          </div>
        </div>
      </div>

      <div className="trust-bar">
        <div className="trust-item">
          <div className="trust-icon">✓</div> FCA Regulated
        </div>
        <div className="trust-item">
          <div className="trust-icon">✓</div> Free Initial Consultation
        </div>
        <div className="trust-item">
          <div className="trust-icon">✓</div> Confidential &amp; Non-Judgemental
        </div>
        <div className="trust-item">
          <div className="trust-icon">✓</div> UK Based Advisors
        </div>
        <div className="trust-item">
          <div className="trust-icon">✓</div> No Upfront Fees
        </div>
      </div>

      <section className="services-bg" id="services">
        <div className="center">
          <div className="section-label">Our Services</div>
          <h2 className="section-title">Debt Relief Solutions Tailored for You</h2>
          <p className="section-sub">
            We offer three proven pathways to help you regain control of your
            finances and move forward with confidence.
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3>Individual Voluntary Arrangement</h3>
            <span className="tag">IVA</span>
            <p>
              A formal, legally binding agreement between you and your creditors
              to repay what you can afford over a set period, typically 5 to 6
              years.
            </p>
            <ul>
              <li>Legally freeze interest &amp; charges</li>
              <li>Creditors cannot pursue you</li>
              <li>Remaining debt written off at end</li>
              <li>Suitable for debts over £6,000</li>
            </ul>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
            </div>
            <h3>Debt Management Plan</h3>
            <span className="tag">DMP</span>
            <p>
              An informal arrangement where you make one affordable monthly
              payment, which we distribute to your creditors on your behalf.
            </p>
            <ul>
              <li>One simple monthly payment</li>
              <li>No legal proceedings</li>
              <li>Flexible, adjust if circumstances change</li>
              <li>Suitable for any level of debt</li>
            </ul>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Protected Benefits Scheme</h3>
            <span className="tag">PBS</span>
            <p>
              Designed to protect your essential benefits and income while
              arranging a structured solution with your creditors based on your
              real affordability.
            </p>
            <ul>
              <li>Benefits income fully protected</li>
              <li>Creditor harassment stops immediately</li>
              <li>Bespoke repayment structure</li>
              <li>Ideal for those on benefits income</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="center">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Three Simple Steps to Debt Freedom</h2>
          <p className="section-sub">
            We&apos;ve made our process as straightforward and stress-free as
            possible.
          </p>
        </div>
        <div className="steps-wrap">
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Free Assessment</h3>
              <p>
                Speak to one of our friendly advisors. We review your income,
                expenses, and debts with zero judgment and complete
                confidentiality.
              </p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Tailored Plan</h3>
              <p>
                We recommend the best debt relief option for your situation and
                explain every step clearly, so you&apos;re always in control.
              </p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Resolve &amp; Recover</h3>
              <p>
                We handle the hard conversations with your creditors while you
                focus on rebuilding your finances and moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-bg" id="why">
        <div className="center">
          <div className="section-label">Why Credit Solutions</div>
          <h2 className="section-title">Trusted by Thousands Across the UK</h2>
          <p className="section-sub">
            We combine professional expertise with genuine human care because
            behind every debt is a real person who deserves a second chance.
          </p>
        </div>
        <div className="why-grid">
          <div className="why-card">
            <h4>
              <span className="why-dot" />
              FCA Regulated
            </h4>
            <p>
              We are fully authorised and regulated by the Financial Conduct
              Authority, so you can trust us to act in your best interest at all
              times.
            </p>
          </div>
          <div className="why-card">
            <h4>
              <span className="why-dot" />
              No Upfront Fees
            </h4>
            <p>
              Your initial consultation is completely free. Our fees are only
              charged once a solution is in place and you&apos;re happy to
              proceed.
            </p>
          </div>
          <div className="why-card">
            <h4>
              <span className="why-dot" />
              Experienced Advisors
            </h4>
            <p>
              Our team has over 12 years of experience helping individuals across
              the UK navigate debt and find real, lasting solutions.
            </p>
          </div>
          <div className="why-card">
            <h4>
              <span className="why-dot" />
              Confidential Service
            </h4>
            <p>
              Everything you share with us stays between us. We maintain full
              confidentiality and treat every client with dignity and respect.
            </p>
          </div>
          <div className="why-card">
            <h4>
              <span className="why-dot" />
              UK Based Team
            </h4>
            <p>
              All our advisors are based in the UK and understand the local
              financial landscape, regulations, and creditor processes inside out.
            </p>
          </div>
          <div className="why-card">
            <h4>
              <span className="why-dot" />
              Ongoing Support
            </h4>
            <p>
              We don&apos;t disappear once a plan is set up. Our team is always
              available to review your circumstances and adjust your solution if
              needed.
            </p>
          </div>
        </div>
      </section>

      <section className="testi-bg">
        <div className="center">
          <div className="section-label">Client Stories</div>
          <h2 className="section-title">Real People, Real Results</h2>
          <p className="section-sub">
            Don&apos;t just take our word for it, hear from people whose lives
            have changed after working with us.
          </p>
        </div>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <blockquote>
              &quot;I was drowning in over £22,000 of debt and too embarrassed to
              ask for help. Credit Solutions treated me with kindness from the
              very first call. My IVA is now set up and I feel like I can breathe
              again.&quot;
            </blockquote>
            <div className="testi-author">
              <div className="avatar">SK</div>
              <div>
                <p>Sarah K.</p>
                <p>Manchester - IVA Client</p>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <blockquote>
              &quot;The team explained everything in plain English - no jargon, no
              pressure. Within weeks, my DMP was in place and the creditor calls
              stopped. Brilliant service from start to finish.&quot;
            </blockquote>
            <div className="testi-author">
              <div className="avatar">JT</div>
              <div>
                <p>James T.</p>
                <p>Birmingham - DMP Client</p>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <blockquote>
              &quot;I didn&apos;t know PBS even existed until Credit Solutions
              explained it to me. As someone on benefits, it was exactly what I
              needed. They protected my income and sorted everything
              professionally.&quot;
            </blockquote>
            <div className="testi-author">
              <div className="avatar">RL</div>
              <div>
                <p>Rachel L.</p>
                <p>Leeds - PBS Client</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-section">
        <h2>Take the First Step Today</h2>
        <p>
          A free, no-obligation consultation is all it takes to start your
          journey to debt freedom.
        </p>
        <a href="#contact" className="btn-white">
          Speak to an Advisor - It&apos;s Free
        </a>
      </div>

      <section id="contact">
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title">Book Your Free Consultation</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>We&apos;d love to hear from you</h3>
            <p>
              Fill in the form and one of our friendly advisors will be in touch
              within 24 hours to discuss your situation in complete confidence.
            </p>
            <div className="contact-detail">
              <div className="contact-icon">✉</div>
              <span>info@debtservice.co.uk</span>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">📞</div>
              <span>0800 123 4567 (Free from all UK phones)</span>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">🕐</div>
              <span>Mon-Fri: 9am-6pm</span>
            </div>
            <div className="confidentiality-box">
              <p className="confidentiality-title">Confidentiality Guaranteed</p>
              <p className="confidentiality-text">
                Everything you share with us is completely private. We will never
                contact your employer or share your details without consent.
              </p>
            </div>
          </div>
          <div>
            <form
              className="contact-form-wrap"
              onSubmit={handleSubmit}
              suppressHydrationWarning
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                    suppressHydrationWarning
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    placeholder="Smith"
                    required
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="07700 000000"
                  required
                  suppressHydrationWarning
                />
              </div>
              <div className="form-group">
                <label htmlFor="debt">Approximate Total Debt</label>
                <select
                  id="debt"
                  name="debt"
                  defaultValue=""
                  required
                  suppressHydrationWarning
                >
                  <option value="">Select a range...</option>
                  <option>Under £5,000</option>
                  <option>£5,000 - £10,000</option>
                  <option>£10,000 - £20,000</option>
                  <option>£20,000 - £50,000</option>
                  <option>Over £50,000</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="solution">Solution of Interest</label>
                <select
                  id="solution"
                  name="solution"
                  defaultValue=""
                  required
                  suppressHydrationWarning
                >
                  <option value="">Select...</option>
                  <option>Not Sure - Please advise</option>
                  <option>IVA (Individual Voluntary Arrangement)</option>
                  <option>DMP (Debt Management Plan)</option>
                  <option>PBS (Protected Benefits Scheme)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="additional">
                  Additional Information (optional)
                </label>
                <textarea
                  id="additional"
                  name="additional"
                  placeholder="Tell us a little about your situation..."
                  suppressHydrationWarning
                />
              </div>
              <button
                className="submit-btn"
                type="submit"
                disabled={isSubmitting}
                suppressHydrationWarning
              >
                {isSubmitting
                  ? "Sending your request..."
                  : "Request Free Consultation"}
              </button>
              {statusMessage ? (
                <p className={`form-status ${statusType}`}>{statusMessage}</p>
              ) : null}
              <p className="form-consent">
                By submitting, you agree to our Privacy Policy. Your information
                is safe with us.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              Credit <span>Solutions</span>
            </div>
            <p>
              A trusted UK debt relief agency providing compassionate, expert
              guidance on IVA, DMP, and PBS solutions.
            </p>
            <div className="footer-email">✉ info@debtssupportservice.co.uk</div>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#services">IVA - Individual Voluntary Arrangement</a>
              </li>
              <li>
                <a href="#services">DMP - Debt Management Plan</a>
              </li>
              <li>
                <a href="#services">PBS - Protected Benefits Scheme</a>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#why">About Us</a>
              </li>
              <li>
                <a href="#how">How It Works</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Complaints Procedure</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <p>
              © 2025 Credit Solutions Ltd. All rights reserved. Registered in
              England &amp; Wales.
            </p>
            <p className="footer-disclaimer">
              Credit Solutions Ltd is authorised and regulated by the Financial
              Conduct Authority (FCA). Our services are designed to help
              individuals manage debt, but the suitability of any debt solution
              will depend on your individual circumstances. An IVA is a formal
              insolvency solution and may affect your credit rating. A fee is
              charged for our IVA service - your advisor will explain all fees
              before any agreement is made. Think carefully before taking out a
              debt solution. Seek independent advice if you are unsure.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
