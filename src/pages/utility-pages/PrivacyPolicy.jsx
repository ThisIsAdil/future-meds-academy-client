import React from "react";
import { Link } from "react-router-dom";

// Future MedsAcademy - Privacy Policy Page
// TailwindCSS utility classes assumed. Minimal, accessible, production-ready layout.

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-gray-800 antialiased max-w-4xl mx-auto">
      <p className="px-4 pt-12 text-base text-gray-500">Privacy Policy — Effective: September 2025</p>

      <section className="px-4 py-8">
        <article className="prose prose-lg max-w-none space-y-2">
          <div>
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy explains how <strong>Future MedsAcademy</strong> ("we", "us",
              "our") collects, uses, and shares your personal information when you use our website,
              platforms, or services ("Services"). By accessing or using the Services, you agree to
              this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 id="collection">2. Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul>
              <li><strong>Information you provide:</strong> Name, contact details, application data,
                and payment details when you register, purchase, or communicate with us.</li>
              <li><strong>Automatically collected information:</strong> Log data, IP addresses,
                browser type, device identifiers, and cookies when you interact with our website.</li>
              <li><strong>Third-party sources:</strong> Information from partners or institutions
                where you apply through our guidance.</li>
            </ul>
          </div>

          <div>
            <h2 id="use">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and improve our Services.</li>
              <li>Personalize mentorship and learning experiences.</li>
              <li>Process payments and manage accounts.</li>
              <li>Communicate updates, offers, and service information.</li>
              <li>Ensure security, prevent fraud, and comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 id="sharing">4. Sharing of Information</h2>
            <p>
              We do not sell or rent personal data. We may share information with:
            </p>
            <ul>
              <li><strong>Service providers:</strong> Payment processors, hosting providers, and IT
                support under confidentiality agreements.</li>
              <li><strong>Educational institutions:</strong> When required to support applications or
                admissions.</li>
              <li><strong>Legal authorities:</strong> If required by law or to protect rights and
                safety.</li>
            </ul>
          </div>

          <div>
            <h2>5. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to fulfill the purposes
              described in this Policy, comply with legal obligations, resolve disputes, and enforce
              agreements.
            </p>
          </div>

          <div>
            <h2>6. Cookies &amp; Tracking</h2>
            <p>
              We use cookies and similar technologies to improve functionality, analyze traffic, and
              personalize experiences. You can manage cookie preferences through your browser settings.
            </p>
          </div>

          <div>
            <h2>7. Data Security</h2>
            <p>
              We implement technical and organizational measures to protect personal data. However, no
              system is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2>8. International Data Transfers</h2>
            <p>
              As an international platform, your information may be transferred and processed in
              countries outside your residence. We ensure safeguards to protect your data in such
              cases.
            </p>
          </div>

          <div>
            <h2>9. Children's Privacy</h2>
            <p>
              Our Services are not directed at children under 16. We do not knowingly collect
              information from children under 16. If we become aware, we will delete such information
              promptly.
            </p>
          </div>

          <div>
            <h2>10. Your Rights</h2>
            <p>You may have the following rights under applicable law:</p>
            <ul>
              <li>Access, correct, or delete your personal data.</li>
              <li>Object to or restrict processing.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Request data portability.</li>
            </ul>
            <p>
              To exercise these rights, please contact us as described below.
            </p>
          </div>

          <div>
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be notified
              through email or a prominent notice on our website. Continued use of Services after such
              updates indicates acceptance of the changes.
            </p>
          </div>

          <div>
            <h2 id="contact">12. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy, please
              contact us:
            </p>
            <ul>
              <li>Email: <span className="text-sky-600">
                <a href="mailto:privacy@futuremedsacademy.com" className="animated-link">privacy@futuremedsacademy.com</a>
              </span></li>
              <li>Address: <em>University of Messina, Italy</em></li>
            </ul>
          </div>

          <hr className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-500">
            <div>
              <p>Last updated: September 25, 2025</p>
              <p>Future MedsAcademy — All rights reserved.</p>
            </div>
            <Link to="/" className="animated-button">
              <div className="label">Back to Home</div>
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}