import React from 'react';

export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: 11 February 2026</p>
      
      <p className="text-gray-700 mb-6">
        This Privacy Policy describes how we collect, use, and protect your information when you use our website.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">When you use the contact form on our website, we may collect:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your message</li>
        </ul>
        <p className="text-gray-700 mt-4">We collect this information only to respond to your inquiry.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">We use your information only to:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Reply to your messages</li>
          <li>Provide support or information you requested</li>
        </ul>
        <p className="text-gray-700 mt-4">We do not sell, trade, or share your personal data with third parties.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">3. Data Storage & Security</h2>
        <p className="text-gray-700">
          We take reasonable measures to protect your personal information.
          However, no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
        <p className="text-gray-700">
          Our website may use third-party services (such as Formspree, Resend, or analytics tools) to process form submissions or emails.
          These services may collect and process data according to their own privacy policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
        <p className="text-gray-700">
          We do not use cookies to track personal information.
          (If you later add analytics or cookies, update this section.)
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
        <p className="text-gray-700 mb-4">You have the right to:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
          <li>Request access to your data</li>
          <li>Ask for your data to be deleted</li>
        </ul>
        <p className="text-gray-700 mt-4">To do this, contact us at: <span className="font-semibold">erhan.demirov@yahoo.com</span></p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time.
          Any changes will be posted on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, contact us at:
        </p>
        <p className="text-gray-700 mt-2">
          📧 <span className="font-semibold">erhan.demirov@yahoo.com</span>
        </p>
      </section>
    </div>
  );
}
