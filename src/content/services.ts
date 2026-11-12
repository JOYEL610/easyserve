/**
 * Service catalogue.
 *
 * Document lists come from the centre's own working list ("easyserve works").
 * Services marked `listPending` were announced on the centre's Instagram but
 * have no confirmed document list yet, so the page asks people to message us
 * instead of showing a guessed list.
 */

export type CategoryId = "ids" | "certificates" | "applications" | "desk";

export type Doc = {
  en: string;
  ml?: string;
  /** Extra condition or clarification shown under the item. */
  note?: string;
  noteMl?: string;
};

export type Variant = {
  id: string;
  name: string;
  nameMl?: string;
  documents: Doc[];
};

export type Service = {
  slug: string;
  name: string;
  nameMl: string;
  category: CategoryId;
  /** One plain sentence: what this is and who issues it. */
  summary: string;
  /** Search aliases, including common misspellings and Malayalam terms. */
  keywords: string[];
  variants: Variant[];
  listPending?: boolean;
};

export const categories: { id: CategoryId; name: string; nameMl: string; blurb: string }[] = [
  {
    id: "ids",
    name: "IDs and cards",
    nameMl: "തിരിച്ചറിയൽ രേഖകൾ",
    blurb: "Aadhaar, ration card, PAN, voter ID and passport work.",
  },
  {
    id: "certificates",
    name: "Certificates",
    nameMl: "സർട്ടിഫിക്കറ്റുകൾ",
    blurb: "Revenue certificates and birth, death and marriage registration.",
  },
  {
    id: "applications",
    name: "Online applications",
    nameMl: "ഓൺലൈൻ അപേക്ഷകൾ",
    blurb: "Business registrations, scholarships and bookings.",
  },
  {
    id: "desk",
    name: "Print, scan and more",
    nameMl: "പ്രിന്റ്, സ്കാൻ",
    blurb: "CVs, printing and scanning.",
  },
];

/* Documents that repeat across services. */
const d = {
  aadhaar: { en: "Aadhaar card", ml: "ആധാർ കാർഡ്" },
  applicantAadhaar: { en: "Applicant's Aadhaar card", ml: "അപേക്ഷകന്റെ ആധാർ കാർഡ്" },
  aadhaarOtp: {
    en: "Aadhaar OTP",
    ml: "ആധാർ OTP",
    note: "Sent to the mobile number linked to your Aadhaar. We ask for it only while the application is being filed.",
  },
  ration: { en: "Ration card", ml: "റേഷൻ കാർഡ്" },
  pan: { en: "PAN card", ml: "പാൻ കാർഡ്" },
  landTax: { en: "Land tax receipt", ml: "ഭൂനികുതി രസീത്" },
  affidavit: { en: "Affidavit", ml: "സത്യവാങ്മൂലം" },
  titleDeed: { en: "Title deed (Aadharam)", ml: "ആധാരം" },
  parentsSchool: {
    en: "School certificate of parents",
    ml: "മാതാപിതാക്കളുടെ സ്കൂൾ സർട്ടിഫിക്കറ്റ്",
  },
  school: { en: "School certificate", ml: "സ്കൂൾ സർട്ടിഫിക്കറ്റ്" },
  birthCert: { en: "Birth certificate", ml: "ജനന സർട്ടിഫിക്കറ്റ്" },
  passbook: { en: "Bank passbook", ml: "ബാങ്ക് പാസ്ബുക്ക്" },
  photo: { en: "Photo", ml: "ഫോട്ടോ" },
  otp: { en: "OTP on your mobile", ml: "മൊബൈലിൽ ലഭിക്കുന്ന OTP" },
} satisfies Record<string, Doc>;

export const services: Service[] = [
  /* ---------- IDs and cards ---------- */
  {
    slug: "aadhaar-card",
    name: "Aadhaar card",
    nameMl: "ആധാർ കാർഡ്",
    category: "ids",
    summary: "Download your e-Aadhaar or update the address printed on it.",
    keywords: ["aadhar", "adhar", "uidai", "e-aadhaar", "aadhaar download", "address change", "ആധാർ"],
    variants: [
      {
        id: "download",
        name: "Aadhaar download",
        nameMl: "ആധാർ ഡൗൺലോഡ്",
        documents: [
          { en: "Aadhaar number", ml: "ആധാർ നമ്പർ" },
          d.aadhaarOtp,
        ],
      },
      {
        id: "address-change",
        name: "Address change",
        nameMl: "വിലാസം മാറ്റൽ",
        documents: [
          {
            en: "Address proof: ration card, voter ID or marriage certificate",
            ml: "വിലാസ രേഖ: റേഷൻ കാർഡ്, വോട്ടർ ഐഡി അല്ലെങ്കിൽ വിവാഹ സർട്ടിഫിക്കറ്റ്",
            note: "Any one of the three.",
          },
        ],
      },
    ],
  },
  {
    slug: "ration-card",
    name: "Ration card",
    nameMl: "റേഷൻ കാർഡ്",
    category: "ids",
    summary:
      "New ration card, adding a member or removing a member, filed with the Kerala Civil Supplies Department.",
    keywords: ["ration", "civil supplies", "new ration card", "member addition", "member reduction", "റേഷൻ"],
    variants: [
      {
        id: "new",
        name: "New ration card",
        nameMl: "പുതിയ റേഷൻ കാർഡ്",
        documents: [
          { en: "Photo of the card owner", ml: "കാർഡ് ഉടമയുടെ ഫോട്ടോ" },
          { en: "Aadhaar card of the card owner", ml: "ഉടമയുടെ ആധാർ കാർഡ്" },
          { en: "Aadhaar cards of all members", ml: "എല്ലാ അംഗങ്ങളുടെയും ആധാർ കാർഡ്" },
          { en: "Ownership or residence certificate", ml: "ഉടമസ്ഥാവകാശ / താമസ സർട്ടിഫിക്കറ്റ്" },
          { en: "Income certificate", ml: "വരുമാന സർട്ടിഫിക്കറ്റ്" },
          {
            en: "Consent letter from the current ration card owner, with a copy of that card",
            ml: "നിലവിലെ റേഷൻ കാർഡ് ഉടമയുടെ സമ്മതപത്രം, റേഷൻ കാർഡിന്റെ കോപ്പി",
            note: "When you are moving out of a card in the same taluk.",
            noteMl: "ഒരേ താലൂക്ക് ആണെങ്കിൽ.",
          },
          {
            en: "Transfer certificate",
            ml: "ട്രാൻസ്ഫർ സർട്ടിഫിക്കറ്റ്",
            note: "When you are moving from one taluk to another.",
            noteMl: "ഒരു താലൂക്കിൽ നിന്ന് മറ്റൊരു താലൂക്കിലേക്ക് മാറുകയാണെങ്കിൽ.",
          },
          d.passbook,
          { en: "KSEB electricity bill", ml: "കെ.എസ്.ഇ.ബി ബിൽ" },
          { en: "Gas connection details", ml: "ഗ്യാസ് കണക്ഷൻ രേഖ" },
        ],
      },
      {
        id: "member-addition",
        name: "Adding a member",
        nameMl: "അംഗത്തെ ചേർക്കൽ",
        documents: [
          {
            en: "Aadhaar card of the person being added",
            ml: "ചേർക്കേണ്ട വ്യക്തിയുടെ ആധാർ കാർഡ്",
            note: "Enough on its own when their name is not on any ration card.",
            noteMl: "ഒരു റേഷൻ കാർഡിലും പേരില്ലെങ്കിൽ.",
          },
          {
            en: "Transfer certificate",
            ml: "ട്രാൻസ്ഫർ സർട്ടിഫിക്കറ്റ്",
            note: "When they are a member of another ration card.",
            noteMl: "മറ്റൊരു റേഷൻ കാർഡിൽ അംഗം ആണെങ്കിൽ.",
          },
          {
            en: "Consent letter from that ration card's owner",
            ml: "റേഷൻ കാർഡ് ഉടമയുടെ സമ്മതപത്രം",
            note: "Instead of the transfer certificate, when both cards are in the same taluk.",
            noteMl: "ഒരേ താലൂക്ക് ആണെങ്കിൽ.",
          },
        ],
      },
      {
        id: "member-reduction",
        name: "Removing a member",
        nameMl: "അംഗത്തെ ഒഴിവാക്കൽ",
        documents: [
          { en: "Number or copy of the existing card", ml: "നിലവിലുള്ള കാർഡിന്റെ നമ്പർ / കോപ്പി" },
          {
            en: "Aadhaar card of the person being removed",
            ml: "പേര് ഒഴിവാക്കേണ്ട വ്യക്തിയുടെ ആധാർ കാർഡ്",
          },
          d.applicantAadhaar,
          {
            en: "Marriage certificate",
            ml: "വിവാഹ സർട്ടിഫിക്കറ്റ്",
            note: "When the member is moving to another card after marriage. Other records may be asked for.",
            noteMl: "വിവാഹം കഴിഞ്ഞ് മറ്റൊരു റേഷൻ കാർഡിലേക്ക് മാറുന്നതിന്.",
          },
          {
            en: "Details of the new ration card",
            ml: "പുതിയ കാർഡിന്റെ വിവരങ്ങൾ",
            note: "When the member is moving to another ration card.",
            noteMl: "മറ്റൊരു റേഷൻ കാർഡിലേക്ക് മാറുന്നതിന്.",
          },
          {
            en: "Death certificate",
            ml: "മരണ സർട്ടിഫിക്കറ്റ്",
            note: "When the member has died.",
            noteMl: "മരണം സംഭവിച്ചതാണെങ്കിൽ.",
          },
          {
            en: "Application form for removing a member",
            ml: "റേഷൻ കാർഡ് അംഗത്തെ ഒഴിവാക്കുന്നതിനുള്ള അപേക്ഷ",
            note: "We prepare this with you.",
          },
        ],
      },
    ],
  },
  {
    slug: "pan-card",
    name: "PAN card",
    nameMl: "പാൻ കാർഡ്",
    category: "ids",
    summary: "Application for a Permanent Account Number from the Income Tax Department.",
    keywords: ["pan", "pancard", "income tax", "പാൻ"],
    variants: [
      {
        id: "new",
        name: "PAN card",
        documents: [
          d.aadhaar,
          {
            en: "Driving licence, birth certificate or passport",
            ml: "ഡ്രൈവിംഗ് ലൈസൻസ്, ജനന സർട്ടിഫിക്കറ്റ് അല്ലെങ്കിൽ പാസ്‌പോർട്ട്",
            note: "Any one of the three.",
          },
          { en: "2 passport size photos", ml: "2 പാസ്‌പോർട്ട് സൈസ് ഫോട്ടോ" },
        ],
      },
    ],
  },
  {
    slug: "voter-id",
    name: "Voter ID card",
    nameMl: "വോട്ടർ ഐഡി കാർഡ്",
    category: "ids",
    summary: "New voter registration or correcting the details on your existing voter ID.",
    keywords: ["voter", "election id", "epic", "voters id", "sir form", "വോട്ടർ"],
    variants: [
      {
        id: "new",
        name: "New voter ID",
        nameMl: "പുതിയ വോട്ടർ ഐഡി",
        documents: [d.aadhaar, { en: "SIR form", ml: "SIR ഫോം" }, d.photo],
      },
      {
        id: "correction",
        name: "Voter ID correction",
        nameMl: "വോട്ടർ ഐഡി തിരുത്തൽ",
        documents: [d.aadhaar],
      },
    ],
  },
  {
    slug: "aadhaar-pan-link",
    name: "Aadhaar–PAN link",
    nameMl: "ആധാർ–പാൻ ലിങ്കിംഗ്",
    category: "ids",
    summary: "Linking your PAN with your Aadhaar on the Income Tax portal.",
    keywords: ["aadhar pan link", "pan aadhaar linking", "link pan", "ലിങ്ക്"],
    variants: [
      {
        id: "link",
        name: "Aadhaar–PAN link",
        documents: [d.aadhaar, d.pan, d.aadhaarOtp],
      },
    ],
  },
  {
    slug: "e-shram-card",
    name: "e-Shram card",
    nameMl: "ഇ-ശ്രം കാർഡ്",
    category: "ids",
    summary: "Registration on the national e-Shram database for unorganised workers.",
    keywords: ["eshram", "e shram", "shram card", "labour card", "ഇ-ശ്രം"],
    variants: [
      {
        id: "register",
        name: "e-Shram card",
        documents: [
          d.aadhaar,
          { en: "Mobile number linked to Aadhaar", ml: "ആധാറുമായി ലിങ്ക് ചെയ്ത മൊബൈൽ നമ്പർ" },
          d.passbook,
        ],
      },
    ],
  },
  {
    slug: "passport",
    name: "Passport application",
    nameMl: "പാസ്‌പോർട്ട് അപേക്ഷ",
    category: "ids",
    summary: "Online passport application and appointment booking on Passport Seva.",
    keywords: ["passport", "passport seva", "renewal", "പാസ്‌പോർട്ട്"],
    variants: [{ id: "apply", name: "Passport application", documents: [] }],
    listPending: true,
  },

  /* ---------- Certificates ---------- */
  {
    slug: "income-certificate",
    name: "Income certificate",
    nameMl: "വരുമാന സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Revenue Department certificate of annual family income, applied for through e-District Kerala.",
    keywords: ["income", "varumanam", "e-district", "village office", "വരുമാന"],
    variants: [
      {
        id: "apply",
        name: "Income certificate",
        documents: [d.applicantAadhaar, d.ration, d.landTax, d.affidavit],
      },
    ],
  },
  {
    slug: "possession-certificate",
    name: "Possession certificate",
    nameMl: "കൈവശാവകാശ സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Revenue Department certificate confirming who holds a piece of land.",
    keywords: ["possession", "kaivasam", "land", "കൈവശ"],
    variants: [
      {
        id: "apply",
        name: "Possession certificate",
        documents: [d.applicantAadhaar, d.landTax, d.titleDeed],
      },
    ],
  },
  {
    slug: "caste-certificate",
    name: "Caste certificate",
    nameMl: "ജാതി സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Revenue Department certificate of caste, used for education, jobs and reservations.",
    keywords: ["caste", "jathi", "ജാതി"],
    variants: [
      {
        id: "apply",
        name: "Caste certificate",
        documents: [d.applicantAadhaar, d.ration, d.parentsSchool],
      },
    ],
  },
  {
    slug: "nativity-certificate",
    name: "Nativity certificate",
    nameMl: "നേറ്റിവിറ്റി സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Revenue Department certificate confirming you are a native of Kerala.",
    keywords: ["nativity", "native", "നേറ്റിവിറ്റി"],
    variants: [
      {
        id: "apply",
        name: "Nativity certificate",
        documents: [d.applicantAadhaar, d.ration, d.birthCert, d.school, d.parentsSchool],
      },
    ],
  },
  {
    slug: "community-certificate",
    name: "Community certificate",
    nameMl: "കമ്മ്യൂണിറ്റി സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Revenue Department certificate of the community you belong to.",
    keywords: ["community", "samudayam", "കമ്മ്യൂണിറ്റി"],
    variants: [
      {
        id: "apply",
        name: "Community certificate",
        documents: [d.aadhaar, d.parentsSchool, d.ration],
      },
    ],
  },
  {
    slug: "residence-certificate",
    name: "Residence certificate",
    nameMl: "റെസിഡൻസ് സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Revenue Department certificate confirming where you live.",
    keywords: ["residence", "residential", "address proof", "റെസിഡൻസ്"],
    variants: [
      {
        id: "apply",
        name: "Residence certificate",
        documents: [
          d.aadhaar,
          { en: "Possession certificate", ml: "കൈവശാവകാശ സർട്ടിഫിക്കറ്റ്" },
          d.landTax,
          {
            en: "Title deed (Aadharam) or rent agreement",
            ml: "ആധാരം അല്ലെങ്കിൽ വാടക കരാർ",
          },
        ],
      },
    ],
  },
  {
    slug: "non-creamy-layer-certificate",
    name: "Non-creamy layer certificate",
    nameMl: "നോൺ ക്രീമി ലെയർ സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Revenue Department certificate for OBC reservation in education and jobs.",
    keywords: ["ncl", "non creamy layer", "obc", "creamy", "നോൺ ക്രീമി"],
    variants: [
      {
        id: "apply",
        name: "Non-creamy layer certificate",
        documents: [d.aadhaar, d.ration, d.parentsSchool, d.school, d.affidavit, d.birthCert],
      },
    ],
  },
  {
    slug: "birth-certificate",
    name: "Birth certificate",
    nameMl: "ജനന സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Birth certificate from your panchayat or municipality records.",
    keywords: ["birth", "janana", "ജനന"],
    variants: [
      {
        id: "apply",
        name: "Birth certificate",
        documents: [{ en: "Aadhaar cards of both parents", ml: "മാതാപിതാക്കളുടെ ആധാർ കാർഡ്" }],
      },
    ],
  },
  {
    slug: "death-certificate",
    name: "Death certificate",
    nameMl: "മരണ സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Death certificate from your panchayat or municipality records.",
    keywords: ["death", "marana", "മരണ"],
    variants: [
      {
        id: "apply",
        name: "Death certificate",
        documents: [
          {
            en: "Applicant's Aadhaar card or another ID",
            ml: "അപേക്ഷകന്റെ ആധാർ കാർഡ് അല്ലെങ്കിൽ തിരിച്ചറിയൽ രേഖ",
          },
          d.aadhaarOtp,
          {
            en: "Medical record or death report from the hospital",
            ml: "ആശുപത്രിയിൽ നിന്നുള്ള മെഡിക്കൽ രേഖ / ഡെത്ത് റിപ്പോർട്ട്",
            note: "When the death happened in a hospital.",
            noteMl: "ആശുപത്രിയിൽ മരണമാണെങ്കിൽ.",
          },
          {
            en: "Aadhaar card of the person who died",
            ml: "മരിച്ച വ്യക്തിയുടെ ആധാർ കാർഡ്",
            note: "If available.",
            noteMl: "ലഭ്യമാണെങ്കിൽ.",
          },
          {
            en: "Name, age and address of the person who died",
            ml: "മരിച്ച വ്യക്തിയുടെ പേര്, വയസ്സ്, വിലാസം",
          },
          { en: "Date and place of death", ml: "മരണ തീയതിയും സ്ഥലവും" },
        ],
      },
    ],
  },
  {
    slug: "marriage-certificate",
    name: "Marriage certificate",
    nameMl: "വിവാഹ സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Marriage registration and certificate from your panchayat or municipality.",
    keywords: ["marriage", "wedding", "vivaha", "registration", "വിവാഹ", "മാര്യേജ്"],
    variants: [
      {
        id: "apply",
        name: "Marriage certificate",
        documents: [
          {
            en: "Aadhaar cards of husband and wife",
            ml: "ഭർത്താവിന്റെയും ഭാര്യയുടെയും ആധാർ കാർഡുകൾ",
          },
          {
            en: "Age proof for both: birth certificate, SSLC certificate or passport",
            ml: "ഇരുവരുടെയും വയസ്സ് തെളിയിക്കുന്ന രേഖകൾ: ജനന സർട്ടിഫിക്കറ്റ്, SSLC സർട്ടിഫിക്കറ്റ് അല്ലെങ്കിൽ പാസ്‌പോർട്ട്",
          },
          { en: "Proof that the marriage took place", ml: "വിവാഹം നടന്നതിന്റെ തെളിവ്" },
          { en: "Passport size photos", ml: "പാസ്‌പോർട്ട് സൈസ് ഫോട്ടോകൾ" },
          { en: "ID proof of 2 witnesses", ml: "2 സാക്ഷികളുടെ തിരിച്ചറിയൽ രേഖകൾ" },
          d.aadhaarOtp,
        ],
      },
    ],
  },
  {
    slug: "police-clearance-certificate",
    name: "Police clearance certificate",
    nameMl: "പോലീസ് ക്ലിയറൻസ് സർട്ടിഫിക്കറ്റ്",
    category: "certificates",
    summary: "Police clearance certificate (PCC) for a visa, a job abroad or an employer.",
    keywords: ["pcc", "police clearance", "police certificate", "visa", "പോലീസ്"],
    variants: [{ id: "apply", name: "Police clearance certificate", documents: [] }],
    listPending: true,
  },

  /* ---------- Online applications ---------- */
  {
    slug: "udyam-registration",
    name: "Udyam registration",
    nameMl: "ഉദ്യം രജിസ്ട്രേഷൻ",
    category: "applications",
    summary:
      "Government registration for a small shop, business or service centre (MSME). It gives the business official status.",
    keywords: ["udyam", "udhyam", "msme", "udyog aadhaar", "business registration", "ഉദ്യം"],
    variants: [
      {
        id: "register",
        name: "Udyam registration",
        documents: [
          { ...d.aadhaar, note: "Linked to your mobile number." },
          d.pan,
          d.otp,
          { ...d.passbook, note: "For the business bank details." },
        ],
      },
    ],
  },
  {
    slug: "fssai-food-licence",
    name: "Food licence (FSSAI)",
    nameMl: "ഫുഡ് ലൈസൻസ് (FSSAI)",
    category: "applications",
    summary: "FSSAI registration or licence for a food business.",
    keywords: ["fssai", "food license", "food licence", "food safety", "ഫുഡ് ലൈസൻസ്"],
    variants: [
      {
        id: "apply",
        name: "Food licence (FSSAI)",
        documents: [d.photo, d.aadhaar, d.pan, d.otp],
      },
    ],
  },
  {
    slug: "scholarship-applications",
    name: "Scholarship applications",
    nameMl: "സ്കോളർഷിപ്പ് അപേക്ഷകൾ",
    category: "applications",
    summary: "Online applications for NMMS and e-Grantz scholarships.",
    keywords: ["scholarship", "nmms", "egrantz", "e-grantz", "egrants", "സ്കോളർഷിപ്പ്"],
    variants: [
      { id: "nmms", name: "NMMS", documents: [] },
      { id: "e-grantz", name: "e-Grantz", documents: [] },
    ],
    listPending: true,
  },
  {
    slug: "employment-registration",
    name: "Employment registration",
    nameMl: "എംപ്ലോയ്മെന്റ് രജിസ്ട്രേഷൻ",
    category: "applications",
    summary: "Registration and renewal with the Kerala Employment Exchange.",
    keywords: ["employment", "employment exchange", "registration", "എംപ്ലോയ്മെന്റ്"],
    variants: [{ id: "register", name: "Employment registration", documents: [] }],
    listPending: true,
  },
  {
    slug: "sabarimala-virtual-queue",
    name: "Sabarimala virtual queue booking",
    nameMl: "ശബരിമല വെർച്വൽ ക്യൂ ബുക്കിംഗ്",
    category: "applications",
    summary: "Virtual queue slot booking for Sabarimala darshan.",
    keywords: ["sabarimala", "virtual q", "virtual queue", "darshan", "ശബരിമല", "വെർച്വൽ ക്യൂ"],
    variants: [{ id: "book", name: "Sabarimala virtual queue booking", documents: [] }],
    listPending: true,
  },

  /* ---------- Print, scan and more ---------- */
  {
    slug: "cv-and-resume",
    name: "CV and resume",
    nameMl: "സി.വി / റെസ്യൂമെ",
    category: "desk",
    summary: "A CV written and formatted for you, in ATS-friendly or Europass format.",
    keywords: ["cv", "resume", "biodata", "ats", "europass", "സി.വി"],
    variants: [
      { id: "ats", name: "ATS-friendly CV", documents: [] },
      { id: "europass", name: "Europass CV", documents: [] },
    ],
    listPending: true,
  },
  {
    slug: "print-and-scan",
    name: "Print and scan",
    nameMl: "പ്രിന്റ്, സ്കാൻ",
    category: "desk",
    summary: "Printing, scanning and other document work at the centre.",
    keywords: ["print", "printout", "scan", "photocopy", "പ്രിന്റ്", "സ്കാൻ"],
    variants: [{ id: "desk", name: "Print and scan", documents: [] }],
    listPending: true,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesIn(category: CategoryId): Service[] {
  return services.filter((s) => s.category === category);
}

export function documentCount(service: Service): number {
  return service.variants.reduce((n, v) => n + v.documents.length, 0);
}
