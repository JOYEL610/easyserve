import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How EasyServe Online Centre collects, uses, keeps and deletes your personal information and documents, including Aadhaar details, and how cookies are used on this site.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="12 November 2026"
      intro="To file a government application we have to handle your identity documents. This page says what we collect, why, who sees it, how long we keep it and what you can ask us to do."
    >
      <h2>1. Who is responsible</h2>
      <p>
        {site.legalName}, {site.address.line2}, {site.address.line3}, decides how your information
        is used for the services you ask for. For anything in this policy, call or WhatsApp{" "}
        <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>.
      </p>
      <p>
        We are a private service centre and not a government body. Once your application is
        submitted, the government department concerned holds its own copy under its own rules.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li><strong>Contact details:</strong> your name and mobile or WhatsApp number.</li>
        <li><strong>Identity and supporting documents</strong> you give us for an application, such as an Aadhaar card, PAN card, ration card, voter ID, passport, certificates, land records, bank passbook and photographs.</li>
        <li><strong>Application details:</strong> the information that goes into the form, which can include family members, address, income, caste or community, and date of birth.</li>
        <li><strong>One-time passwords (OTPs)</strong> you read out or send to us while an application is being filed. They are used once and not stored.</li>
        <li><strong>Account details,</strong> if you create an account: name, mobile number and a password. The password is stored only as a one-way hash, so we cannot read it.</li>
        <li><strong>Request records:</strong> the service you asked for, your notes, the status and our notes to you.</li>
        <li><strong>Cookies,</strong> as set out in section 10.</li>
      </ul>

      <h2>3. Why we use it</h2>
      <ul>
        <li>To prepare and submit the application you have asked for.</li>
        <li>To contact you about that application.</li>
        <li>To run your account and show you the status of your requests.</li>
        <li>To keep the records the law requires of us, and to deal with complaints or disputes.</li>
      </ul>
      <p>
        We use your information on the basis of your consent, which you give when you ask us to
        file an application and hand over the documents for it. We do not use your documents for
        any other purpose, and we do not use them for marketing.
      </p>

      <h2>4. Aadhaar</h2>
      <p>
        We use your Aadhaar number, Aadhaar card copy and Aadhaar OTP only for the specific
        application you have asked for, where that application requires it. We do not build a
        database of Aadhaar numbers and we do not share Aadhaar details with anyone except the
        official portal for that application.
      </p>

      <h2>5. Who sees your information</h2>
      <ul>
        <li><strong>The government department or official portal</strong> for your application. This is the purpose of the service.</li>
        <li><strong>EasyServe staff</strong> who are working on your application.</li>
        <li><strong>Service providers</strong> that host this website and its database, who process data only on our instructions.</li>
        <li><strong>Authorities,</strong> where the law requires us to disclose information.</li>
      </ul>
      <p>We do not sell your information and we do not give it to advertisers.</p>
      <p>
        Documents you send on WhatsApp also pass through WhatsApp, which handles them under its own
        terms and privacy policy.
      </p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li><strong>Documents and application details:</strong> until your application is complete, and for up to 90 days afterwards in case the department raises a query or you need a correction. After that we delete our copies.</li>
        <li><strong>Request records and receipts:</strong> for as long as tax and accounting law requires.</li>
        <li><strong>Your account:</strong> until you ask us to delete it.</li>
      </ul>
      <p>You can ask us to delete your documents sooner. See section 8.</p>

      <h2>7. How we protect it</h2>
      <p>
        Access to documents is limited to the staff handling your application. The website uses an
        encrypted connection, passwords are hashed, and login sessions expire after seven days. No
        system is perfectly secure. If a breach affects your information we will tell you and the
        Data Protection Board of India as the law requires.
      </p>

      <h2>8. Your rights</h2>
      <p>Under the Digital Personal Data Protection Act, 2023, you can ask us to:</p>
      <ul>
        <li>tell you what information we hold about you and what we have done with it;</li>
        <li>correct or update it;</li>
        <li>delete it, where we are not required by law to keep it;</li>
        <li>stop using it, by withdrawing your consent. We will then stop work on any application that is not yet filed;</li>
        <li>record a person who can exercise these rights for you if you die or become unable to act.</li>
      </ul>
      <p>
        To do any of this, or to make a complaint, call or WhatsApp{" "}
        <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a> from your registered number. We
        aim to reply within seven days. If you are not satisfied with our reply, you can complain to
        the Data Protection Board of India.
      </p>
      <p>
        Information we have already submitted to a government department is held by that
        department. Requests about that copy have to go to the department.
      </p>

      <h2>9. Children</h2>
      <p>
        Applications for a person under 18, such as a birth certificate or a scholarship, must be
        made by a parent or guardian, who gives consent on the child’s behalf.
      </p>

      <h2 id="cookies">10. Cookies</h2>
      <p>
        A cookie is a small file a website stores in your browser. When you first visit, we ask
        whether you accept all cookies or essential ones only. You can change your choice at any
        time with the “Cookie settings” link at the bottom of every page.
      </p>
      <h3>Essential cookies (always on)</h3>
      <ul>
        <li><strong>es_session</strong> keeps you logged in. Set when you log in, removed when you log out, expires after 7 days.</li>
        <li><strong>es_role</strong> lets the menu show “My account” while you are logged in. Set and removed together with es_session.</li>
        <li><strong>es_consent</strong> remembers your cookie choice. Expires after 6 months.</li>
      </ul>
      <h3>Analytics cookies (only if you accept)</h3>
      <p>
        If analytics is switched on for this site, Google Analytics sets cookies (names beginning{" "}
        <strong>_ga</strong>) to count visits and show us which pages people use. They are set only
        after you choose “Accept all cookies”, and are removed from this site if you later switch
        to essential only. We do not use advertising cookies.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy. The date at the top shows the latest version. If a change
        affects how we use documents you have already given us, we will tell you before it applies.
      </p>
    </LegalPage>
  );
}
