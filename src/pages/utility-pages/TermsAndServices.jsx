import React from "react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white text-gray-800 antialiased max-w-4xl mx-auto">
      <p className="px-4 pt-12 text-base text-gray-500">Terms of Service — Effective: September 2025</p>

      <section className="px-4 py-8">
        <article className="prose prose-lg max-w-none space-y-2">
          <div>
            <h2>1. Introduction</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of services provided by
              <strong> Future MedsAcademy</strong>. By using our services, you agree to be bound by these Terms.
            </p>
          </div>

          <div>
            <h2>2. Services Provided</h2>
            <p>
              Future MedsAcademy offers guidance, mentorship, courses, and workshops for students seeking medical education in Italy, including IMAT preparation and application support.
            </p>
          </div>

          <div>

            <h2>3. Eligibility</h2>
            <p>
              You must be at least 16 years old to use our services. If under the legal age, a parent or guardian must participate.
            </p>
          </div>

          <div>

            <h2>4. Accounts & Access</h2>
            <p>
              You are responsible for your account credentials and all activity under your account.
            </p>
          </div>

          <div>

            <h2>5. User Responsibilities</h2>
            <ul>
              <li>Provide accurate information.</li>
              <li>Use services lawfully.</li>
              <li>Follow guidance responsibly.</li>
            </ul>
          </div>

          <div>

            <h2>6. Fees, Payments & Refunds</h2>
            <p>
              Fees are detailed on product pages. Refunds depend on the product and are handled on a case-by-case basis.
            </p>
          </div>

          <div>

            <h2>7. Intellectual Property</h2>
            <p>
              All content is protected by copyright. Personal, non-commercial use is permitted. Unauthorized use is prohibited.
            </p>
          </div>


          <div>

            <h2>8. Third-Party Resources</h2>
            <p>
              We are not responsible for third-party content. Use third-party services at your own risk.
            </p>
          </div>

          <div>

            <h2>9. Disclaimers & Limitation of Liability</h2>
            <p>
              We do not guarantee outcomes. Liability is limited to the amount paid in the previous 12 months.
            </p>
          </div>

          <div>

            <h2>10. Privacy</h2>
            <p>
              See our <span className="text-sky-600">
                <Link to="/privacy-policy" className="animated-link">Privacy Policy</Link>
              </span> for details on data use.
            </p>
          </div>

          <div>

            <h2>11. Testimonials</h2>
            <p>
              Individual experiences may vary. Stories are published with consent.
            </p>
          </div>

          <div>

            <h2>12. Termination</h2>
            <p>
              We may suspend access for violations. Certain provisions survive termination.
            </p>
          </div>

          <div>

            <h2>13. Changes to Terms</h2>
            <p>
              Updates are communicated via email or website notice. Continued use implies acceptance.
            </p>
          </div>

          <div>

            <h2>14. Governing Law</h2>
            <p>
              These Terms are governed by Italian law. Disputes fall under Italian courts.
            </p>
          </div>

          <div>

            <h2>15. Contact</h2>
            <ul>
              <li>Email: <span className="text-sky-600">
                <a href="mailto:contact@futuremedsacademy.com" className="animated-link">contact@futuremedsacademy.com</a>
              </span>
              </li>
              <li>Address: <em>University of Messina, Italy</em></li>
            </ul>
          </div>

          <div>

            <h2>16. Miscellaneous</h2>
            <p>
              Invalid provisions do not affect the remainder. These Terms, with any separate agreements, form the entire contract.
            </p>
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
