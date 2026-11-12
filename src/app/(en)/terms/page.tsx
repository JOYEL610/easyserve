import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "The terms on which EasyServe Online Centre prepares and files government applications for you, including fees, OTPs, rejections and refunds.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      updated="12 November 2026"
      intro="These terms apply when you use this website or ask EasyServe to prepare or file an application for you, at the centre or on WhatsApp."
    >
      <h2>1. Who we are</h2>
      <p>
        {site.legalName} (“EasyServe”, “we”) is a privately run service centre at{" "}
        {site.address.line2}, {site.address.line3}. <strong>We are not a government office.</strong>{" "}
        We are not affiliated with, authorised by or acting for the Government of India, the
        Government of Kerala, UIDAI, the Income Tax Department, the Election Commission or any other
        department or authority.
      </p>

      <h2>2. What we do</h2>
      <p>
        We help you prepare applications and submit them on the official government portals, on
        your behalf and on your instructions. This includes filling in forms, scanning and uploading
        documents, booking appointments, paying the government fee you give us, and passing the
        result back to you.
      </p>

      <h2>3. What we do not do</h2>
      <ul>
        <li>We do not issue certificates, cards, licences or registrations. The department concerned does.</li>
        <li>We do not decide whether an application is approved, and we cannot influence that decision.</li>
        <li>We do not promise approval, or a date by which a department will act.</li>
        <li>We do not give legal, tax or immigration advice.</li>
      </ul>

      <h2>4. Your responsibilities</h2>
      <ul>
        <li>Give us information that is true, complete and current.</li>
        <li>Give us only genuine documents that you are entitled to use.</li>
        <li>Check the details we show you before the application is filed. Corrections after filing may need a new application and a new fee.</li>
        <li>Apply only for yourself, for your minor child or ward, or for a person who has asked you to act for them.</li>
      </ul>
      <p>
        We will refuse or stop work if we believe a document is forged or altered, or that an
        application is being made without the consent of the person it concerns.
      </p>

      <h2>5. OTPs and your authorisation</h2>
      <p>
        Many portals send a one-time password (OTP) to the mobile number linked to your Aadhaar or
        your account. When you give us an OTP, you are authorising us to complete that one step of
        that one application. We use it immediately and do not keep it.
      </p>
      <ul>
        <li>Share an OTP with us only while we are filing an application you have asked for.</li>
        <li>We will never ask for your bank PIN, UPI PIN, card number, CVV or net-banking password.</li>
        <li>If someone claiming to be from EasyServe asks for any of those, do not share them and call us on {site.phoneDisplay}.</li>
      </ul>

      <h2>6. Fees</h2>
      <p>What you pay has two parts:</p>
      <ul>
        <li><strong>Government fee.</strong> Set by the department and paid to it. We do not control it and it can change.</li>
        <li><strong>Service charge.</strong> Our charge for preparing and filing the application.</li>
      </ul>
      <p>We tell you both amounts before we start. Work begins once you confirm.</p>

      <h2>7. Refunds</h2>
      <ul>
        <li>If you cancel before we have started work, we refund the service charge in full.</li>
        <li>Once an application has been filed, the service charge is not refundable, including when the department rejects or delays the application.</li>
        <li>A government fee that has been paid to the department can be refunded only by the department, under its own rules.</li>
        <li>If an application fails because of our mistake, we will file it again without a second service charge.</li>
      </ul>

      <h2>8. Rejections and delays</h2>
      <p>
        Departments can reject an application, ask for more documents or take longer than expected.
        We will tell you what the department has said and what can be done next. A fresh
        application may need a fresh fee.
      </p>

      <h2>9. Document lists on this website</h2>
      <p>
        The document lists on this site describe what is usually needed. Departments change their
        requirements and may ask for more depending on your case. Treat the lists as guidance and
        confirm with us before you start.
      </p>

      <h2>10. Your account</h2>
      <p>
        A customer account lets you raise requests and follow their status. Keep your password to
        yourself and tell us if you think someone else has used your account. We may suspend an
        account that is used to make false applications or to misuse the service.
      </p>

      <h2>11. Your documents and data</h2>
      <p>
        How we collect, use, keep and delete your information is set out in our{" "}
        <Link href="/privacy">privacy policy</Link>, which forms part of these terms.
      </p>

      <h2>12. Liability</h2>
      <p>
        We take care in preparing and filing your application. To the extent the law allows, our
        liability for any one application is limited to the service charge you paid us for it. We
        are not liable for decisions, delays, errors or outages of a government department or
        portal, or for loss caused by incorrect information or documents given to us.
      </p>
      <p>Nothing in these terms takes away rights you have under the Consumer Protection Act, 2019.</p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Disputes are subject to the courts at
        Thrissur, Kerala.
      </p>

      <h2>14. Changes</h2>
      <p>
        We may update these terms. The date at the top shows the latest version. The version in
        force when you place a request applies to that request.
      </p>

      <h2>15. Contact</h2>
      <p>
        {site.legalName}, {site.address.line2}, {site.address.line3}. Phone and WhatsApp:{" "}
        <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>.
      </p>
    </LegalPage>
  );
}
