import React from "react";

export default function TermsAndConditions() {
  return (
    <div className=" relative w-screen h-screen  mx-auto p-6 bg-white shadow-lg rounded-lg text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-4">📜 Email Subscription Terms & Conditions</h1>
      
      <p className="mb-4">
        By subscribing to our email list, you agree to the following terms and conditions:
      </p>

      <ul className="list-disc pl-5 space-y-3">
        <li>
          <strong>Subscription & Consent:</strong> By providing your email, you agree to receive emails from us.
        </li>
        <li>
          <strong>Privacy & Data Usage:</strong> Your email will not be shared or sold to third parties.
        </li>
        <li>
          <strong>Email Frequency:</strong> We send emails no more than twice a month.
        </li>
        <li>
          <strong>Unsubscribing:</strong> You can unsubscribe anytime via the provided link or by contacting <a href="mailto:ogprojectacc@gmail.com" className="text-blue-500">ogprojectacc@gmail.com</a>.
        </li>
        <li>
          <strong>Modifications:</strong> We reserve the right to update these terms.
        </li>
        <li>
          <strong>Liability Disclaimer:</strong> We are not responsible for any damages from reliance on our emails.
        </li>
        <li>
          <strong>Governing Law:</strong> These terms are governed by Indian law.
        </li>
      </ul>

      <p className="mt-6 text-center">
        📩 For inquiries, contact us at <a href="mailto:ogprojectacc@gmail.com" className="text-blue-500">ogprojectacc@gmail.com</a>
      </p>
    </div>
  );
}
