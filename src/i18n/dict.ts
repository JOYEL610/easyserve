import type { Lang } from "@/content/services";

/**
 * Every piece of interface text, in English and Malayalam.
 * The Malayalam was written for this site and should be proofread by a
 * native speaker before launch.
 */
const en = {
  langName: "English",
  switchTo: "മലയാളം",
  switchLabel: "മലയാളത്തിൽ കാണുക",
  skip: "Skip to content",
  tagline: "Online Centre",
  place: "Nallamkallu, Edakkazhiyur",
  address: ["Nallamkallu, Edakkazhiyur", "Thrissur, Kerala 680515"],

  nav: { services: "Services", how: "How it works", contact: "Contact", menu: "Menu", login: "Log in" },
  menu: {
    customer: "Customer login",
    customerHint: "Track your applications",
    register: "Create customer account",
    registerHint: "New to EasyServe",
    admin: "Admin login",
    adminHint: "EasyServe staff only",
  },
  enquire: "Enquire now",
  enquireShort: "Enquire",
  enquiryMessage: "Hi EasyServe, I have an enquiry.",
  call: "Call",

  hero: {
    eyebrow: "Online service centre",
    title: "Government certificates and applications, done from wherever you are.",
    lead: "Send your documents on WhatsApp. We file the application and send the certificate back to you. Pick a service to see what to bring.",
    searchLabel: "Which service do you need?",
    placeholder: "Try ration card, income, marriage…",
    often: "Often asked for",
    none: "No service by that name",
    noneHelp: "We may still handle it. Use the Enquire now button and tell us what you need.",
    matches: (n: number) => `${n} matching ${n === 1 ? "service" : "services"}`,
  },

  slip: {
    eyebrow: "What to bring",
    ready: (a: number, b: number) => `${a} of ${b} ready`,
    send: "Send this list on WhatsApp",
    ask: "Ask what to bring",
    open: "Open the full page",
    pending:
      "What you need depends on your case. Message us and we will send you the exact list before you start.",
    options: (name: string) => `${name} options`,
    msgIntro: (title: string) => `Hi EasyServe, I need help with: ${title}.`,
    msgHave: "I have:",
    msgMissing: "Still to arrange:",
    msgList: "Documents on the list:",
    msgAsk: "What do I need to send?",
  },

  directory: {
    title: "What we handle",
    lead: (n: number) => `${n} services. Open one to see the documents it needs.`,
    all: "All services on one page",
    documents: (n: number) => `${n} ${n === 1 ? "document" : "documents"}`,
    options: (n: number) => `${n} options`,
    onRequest: "List on request",
  },

  how: {
    title: "How it works",
    step: (n: number) => `Step ${n}`,
    steps: [
      {
        title: "Message us",
        body: "Tell us on WhatsApp which service you need. We reply with the exact list of documents for your case.",
      },
      {
        title: "Send your documents",
        body: "Send clear photos or scans on WhatsApp, or bring the papers to the centre in Nallamkallu.",
      },
      {
        title: "We file the application",
        body: "We fill in and submit the application on the official portal. If an OTP comes to your phone, we ask for it at that moment.",
      },
      {
        title: "You get the result",
        body: "We send you the certificate or the application receipt once the department issues it.",
      },
    ],
    chargesTitle: "Charges",
    charges:
      "Government fees are set by the department. Our service charge depends on the work. Ask us for both before we start.",
    awayTitle: "Working outside Kerala, or abroad?",
    away: "Much of this can be done without you being here. Message us from wherever you are and we will tell you what is possible for your case and what your family needs to send.",
  },

  servicesPage: {
    metaTitle: "All services and documents required",
    metaDescription:
      "Every service EasyServe handles in Edakkazhiyur, with the documents each one needs: Aadhaar, ration card, PAN, voter ID, income, caste, nativity, birth, death and marriage certificates, Udyam, FSSAI and more.",
    count: (n: number) => `${n} services`,
    title: "Services and the documents each one needs",
    lead: "Open a service to see its checklist. Tick what you already have and send us the list on WhatsApp.",
    missingTitle: "Not on the list?",
    missing: "We take on other online applications too. Tell us what you need and we will say if we can do it.",
  },

  servicePage: {
    metaTitle: (name: string) => `${name}: documents required`,
    metaWithDocs: (summary: string, docs: string) =>
      `${summary} Documents required: ${docs}. Apply through EasyServe, Edakkazhiyur, on WhatsApp.`,
    metaNoDocs: (summary: string) =>
      `${summary} Apply through EasyServe, Edakkazhiyur. Message us on WhatsApp for the document list.`,
    usual:
      "This is the usual list. The department can ask for more depending on your case. We check your documents before filing and tell you if anything else is needed.",
    startTitle: "Start this application",
    start: "Message us with what you need. We confirm the documents and the charges before anything is filed.",
    account: ["Already a customer?", "Log in", "to raise this as a request and follow its status."],
    more: "More in this group",
    enquiry: (name: string) => `Hi EasyServe, I need help with: ${name}.`,
  },

  footer: {
    contact: "Contact and visit",
    disclaimer:
      "EasyServe is a privately run service centre. We are not a government office and are not affiliated with any government department. Certificates and approvals are issued by the department concerned.",
    terms: "Terms and conditions",
    privacy: "Privacy policy",
    cookies: "Cookie settings",
    whatsapp: "Message EasyServe on WhatsApp",
    instagram: "EasyServe on Instagram",
    phone: "Call EasyServe",
    maps: "Directions on Google Maps",
  },

  cookie: {
    label: "Cookie choices",
    title: "Cookies on this site",
    body: "We use essential cookies to keep you logged in and to remember this choice. With your permission we also use analytics cookies to see which pages people use.",
    details: "Read the cookie details",
    current: "Current choice:",
    all: "all cookies accepted",
    essential: "essential cookies only",
    accept: "Accept all cookies",
    reject: "Essential only",
  },

  home: {
    metaTitle: "EasyServe Online Centre | Government certificates and online applications, Edakkazhiyur",
    metaDescription:
      "EasyServe Online Centre in Nallamkallu, Edakkazhiyur handles government certificates and online applications for you: ration card, income certificate, PAN, voter ID, marriage and birth certificates, Udyam, FSSAI and more. Send your documents on WhatsApp from anywhere.",
  },
};

export type Dict = typeof en;

const ml: Dict = {
  langName: "മലയാളം",
  switchTo: "English",
  switchLabel: "View in English",
  skip: "ഉള്ളടക്കത്തിലേക്ക് പോകുക",
  tagline: "Online Centre",
  place: "നാലാംകല്ല്, എടക്കഴിയൂർ",
  address: ["നാലാംകല്ല്, എടക്കഴിയൂർ", "തൃശ്ശൂർ, കേരളം 680515"],

  nav: { services: "സേവനങ്ങൾ", how: "എങ്ങനെ ചെയ്യാം", contact: "ബന്ധപ്പെടുക", menu: "മെനു", login: "ലോഗിൻ" },
  menu: {
    customer: "കസ്റ്റമർ ലോഗിൻ",
    customerHint: "നിങ്ങളുടെ അപേക്ഷകളുടെ സ്ഥിതി അറിയാം",
    register: "കസ്റ്റമർ അക്കൗണ്ട് തുടങ്ങുക",
    registerHint: "EasyServe-ൽ ആദ്യമായാണോ?",
    admin: "അഡ്മിൻ ലോഗിൻ",
    adminHint: "EasyServe ജീവനക്കാർക്ക് മാത്രം",
  },
  enquire: "ഇപ്പോൾ അന്വേഷിക്കൂ",
  enquireShort: "അന്വേഷിക്കൂ",
  enquiryMessage: "ഹായ് EasyServe, എനിക്ക് ഒരു കാര്യം അന്വേഷിക്കാനുണ്ട്.",
  call: "വിളിക്കൂ",

  hero: {
    eyebrow: "ജനസേവന കേന്ദ്രം",
    title: "സർക്കാർ സർട്ടിഫിക്കറ്റുകളും അപേക്ഷകളും, എവിടെ ഇരുന്നുകൊണ്ടും.",
    lead: "രേഖകൾ വാട്സ്ആപ്പിൽ അയക്കൂ. അപേക്ഷ ഞങ്ങൾ സമർപ്പിച്ച് സർട്ടിഫിക്കറ്റ് നിങ്ങൾക്ക് അയച്ചുതരാം. എന്തൊക്കെ രേഖകൾ വേണമെന്ന് കാണാൻ ഒരു സേവനം തിരഞ്ഞെടുക്കൂ.",
    searchLabel: "ഏത് സേവനമാണ് വേണ്ടത്?",
    placeholder: "റേഷൻ കാർഡ്, വരുമാനം, വിവാഹം…",
    often: "കൂടുതൽ പേർ ചോദിക്കുന്നവ",
    none: "ആ പേരിൽ സേവനം കണ്ടില്ല",
    noneHelp: "എങ്കിലും ഞങ്ങൾക്ക് ചെയ്തുതരാൻ കഴിഞ്ഞേക്കും. മുകളിലെ ബട്ടൺ അമർത്തി ആവശ്യം പറയൂ.",
    matches: (n: number) => `${n} ${n === 1 ? "സേവനം" : "സേവനങ്ങൾ"} കണ്ടെത്തി`,
  },

  slip: {
    eyebrow: "കൊണ്ടുവരേണ്ട രേഖകൾ",
    ready: (a: number, b: number) => `${b}-ൽ ${a} തയ്യാർ`,
    send: "ഈ ലിസ്റ്റ് വാട്സ്ആപ്പിൽ അയക്കൂ",
    ask: "എന്തൊക്കെ വേണമെന്ന് ചോദിക്കൂ",
    open: "മുഴുവൻ പേജ് കാണുക",
    pending:
      "വേണ്ട രേഖകൾ ഓരോ കേസിനും വ്യത്യാസപ്പെടാം. ഞങ്ങൾക്ക് മെസ്സേജ് അയക്കൂ, കൃത്യമായ ലിസ്റ്റ് അയച്ചുതരാം.",
    options: (name: string) => `${name}: ഓപ്ഷനുകൾ`,
    msgIntro: (title: string) => `ഹായ് EasyServe, എനിക്ക് ഈ സേവനം വേണം: ${title}.`,
    msgHave: "എന്റെ കൈയിലുള്ളവ:",
    msgMissing: "ഇനി ശരിയാക്കാനുള്ളവ:",
    msgList: "ലിസ്റ്റിലെ രേഖകൾ:",
    msgAsk: "എന്തൊക്കെ രേഖകൾ അയക്കണം?",
  },

  directory: {
    title: "ഞങ്ങൾ ചെയ്യുന്ന സേവനങ്ങൾ",
    lead: (n: number) => `${n} സേവനങ്ങൾ. വേണ്ട രേഖകൾ കാണാൻ ഒന്ന് തുറക്കൂ.`,
    all: "എല്ലാ സേവനങ്ങളും ഒരു പേജിൽ",
    documents: (n: number) => `${n} ${n === 1 ? "രേഖ" : "രേഖകൾ"}`,
    options: (n: number) => `${n} ഓപ്ഷനുകൾ`,
    onRequest: "ലിസ്റ്റ് ചോദിക്കൂ",
  },

  how: {
    title: "എങ്ങനെ ചെയ്യാം",
    step: (n: number) => `ഘട്ടം ${n}`,
    steps: [
      {
        title: "മെസ്സേജ് അയക്കൂ",
        body: "ഏത് സേവനമാണ് വേണ്ടതെന്ന് വാട്സ്ആപ്പിൽ പറയൂ. നിങ്ങളുടെ കേസിന് വേണ്ട രേഖകളുടെ ലിസ്റ്റ് ഞങ്ങൾ അയച്ചുതരാം.",
      },
      {
        title: "രേഖകൾ അയക്കൂ",
        body: "രേഖകളുടെ വ്യക്തമായ ഫോട്ടോയോ സ്കാനോ വാട്സ്ആപ്പിൽ അയക്കൂ. അല്ലെങ്കിൽ നാലാംകല്ലിലെ സെന്ററിൽ നേരിട്ട് കൊണ്ടുവരാം.",
      },
      {
        title: "അപേക്ഷ ഞങ്ങൾ സമർപ്പിക്കും",
        body: "ഔദ്യോഗിക പോർട്ടലിൽ അപേക്ഷ പൂരിപ്പിച്ച് സമർപ്പിക്കുന്നത് ഞങ്ങളാണ്. നിങ്ങളുടെ ഫോണിൽ OTP വന്നാൽ ആ സമയത്ത് മാത്രം ചോദിക്കും.",
      },
      {
        title: "സർട്ടിഫിക്കറ്റ് നിങ്ങളുടെ കൈയിൽ",
        body: "വകുപ്പ് അനുവദിച്ചാലുടൻ സർട്ടിഫിക്കറ്റോ അപേക്ഷയുടെ രസീതോ നിങ്ങൾക്ക് അയച്ചുതരും.",
      },
    ],
    chargesTitle: "ഫീസ്",
    charges:
      "സർക്കാർ ഫീസ് നിശ്ചയിക്കുന്നത് വകുപ്പാണ്. ഞങ്ങളുടെ സർവീസ് ചാർജ് ജോലിക്കനുസരിച്ചാണ്. തുടങ്ങും മുമ്പ് രണ്ടും ചോദിച്ചറിയാം.",
    awayTitle: "കേരളത്തിന് പുറത്തോ വിദേശത്തോ ആണോ?",
    away: "ഇവയിൽ പലതും നിങ്ങൾ നേരിട്ട് വരാതെ തന്നെ ചെയ്യാം. എവിടെ നിന്നായാലും മെസ്സേജ് അയക്കൂ. നിങ്ങളുടെ കേസിൽ എന്ത് ചെയ്യാമെന്നും വീട്ടുകാർ എന്ത് അയക്കണമെന്നും പറഞ്ഞുതരാം.",
  },

  servicesPage: {
    metaTitle: "എല്ലാ സേവനങ്ങളും ആവശ്യമായ രേഖകളും",
    metaDescription:
      "എടക്കഴിയൂരിലെ EasyServe ചെയ്യുന്ന എല്ലാ സേവനങ്ങളും ഓരോന്നിനും വേണ്ട രേഖകളും: ആധാർ, റേഷൻ കാർഡ്, പാൻ, വോട്ടർ ഐഡി, വരുമാന, ജാതി, നേറ്റിവിറ്റി, ജനന, മരണ, വിവാഹ സർട്ടിഫിക്കറ്റുകൾ, ഉദ്യം, FSSAI.",
    count: (n: number) => `${n} സേവനങ്ങൾ`,
    title: "സേവനങ്ങളും ഓരോന്നിനും വേണ്ട രേഖകളും",
    lead: "ഒരു സേവനം തുറന്നാൽ അതിന്റെ ചെക്ക്‌ലിസ്റ്റ് കാണാം. കൈയിലുള്ളവ ടിക്ക് ചെയ്ത് ലിസ്റ്റ് വാട്സ്ആപ്പിൽ അയക്കൂ.",
    missingTitle: "ലിസ്റ്റിൽ ഇല്ലേ?",
    missing: "മറ്റ് ഓൺലൈൻ അപേക്ഷകളും ഞങ്ങൾ ചെയ്യാറുണ്ട്. ആവശ്യം പറയൂ, ചെയ്യാൻ കഴിയുമോ എന്ന് അറിയിക്കാം.",
  },

  servicePage: {
    metaTitle: (name: string) => `${name}: ആവശ്യമായ രേഖകൾ`,
    metaWithDocs: (summary: string, docs: string) =>
      `${summary} ആവശ്യമായ രേഖകൾ: ${docs}. എടക്കഴിയൂരിലെ EasyServe വഴി വാട്സ്ആപ്പിൽ അപേക്ഷിക്കാം.`,
    metaNoDocs: (summary: string) =>
      `${summary} എടക്കഴിയൂരിലെ EasyServe വഴി അപേക്ഷിക്കാം. രേഖകളുടെ ലിസ്റ്റിന് വാട്സ്ആപ്പിൽ മെസ്സേജ് അയക്കൂ.`,
    usual:
      "ഇത് സാധാരണ വേണ്ടിവരുന്ന ലിസ്റ്റാണ്. നിങ്ങളുടെ കേസിനനുസരിച്ച് വകുപ്പ് കൂടുതൽ രേഖകൾ ചോദിച്ചേക്കാം. സമർപ്പിക്കും മുമ്പ് ഞങ്ങൾ രേഖകൾ പരിശോധിച്ച്, മറ്റെന്തെങ്കിലും വേണമെങ്കിൽ അറിയിക്കും.",
    startTitle: "ഈ അപേക്ഷ തുടങ്ങാം",
    start: "ആവശ്യം മെസ്സേജ് ചെയ്യൂ. സമർപ്പിക്കും മുമ്പ് രേഖകളും ഫീസും ഞങ്ങൾ ഉറപ്പാക്കും.",
    account: ["അക്കൗണ്ട് ഉണ്ടോ?", "ലോഗിൻ ചെയ്ത്", "ഇത് ഒരു റിക്വസ്റ്റായി നൽകി സ്ഥിതി അറിയാം."],
    more: "ഈ വിഭാഗത്തിലെ മറ്റ് സേവനങ്ങൾ",
    enquiry: (name: string) => `ഹായ് EasyServe, എനിക്ക് ഈ സേവനം വേണം: ${name}.`,
  },

  footer: {
    contact: "ബന്ധപ്പെടുക",
    disclaimer:
      "EasyServe ഒരു സ്വകാര്യ സേവന കേന്ദ്രമാണ്. ഇത് സർക്കാർ ഓഫീസ് അല്ല; ഒരു സർക്കാർ വകുപ്പുമായും ബന്ധമില്ല. സർട്ടിഫിക്കറ്റുകളും അനുമതികളും നൽകുന്നത് ബന്ധപ്പെട്ട വകുപ്പാണ്.",
    terms: "നിബന്ധനകൾ",
    privacy: "സ്വകാര്യതാ നയം",
    cookies: "കുക്കി ക്രമീകരണം",
    whatsapp: "EasyServe-ന് വാട്സ്ആപ്പിൽ മെസ്സേജ് അയക്കൂ",
    instagram: "EasyServe ഇൻസ്റ്റഗ്രാമിൽ",
    phone: "EasyServe-നെ വിളിക്കൂ",
    maps: "ഗൂഗിൾ മാപ്പിൽ വഴി കാണുക",
  },

  cookie: {
    label: "കുക്കി തിരഞ്ഞെടുപ്പ്",
    title: "ഈ സൈറ്റിലെ കുക്കികൾ",
    body: "ലോഗിൻ നിലനിർത്താനും ഈ തിരഞ്ഞെടുപ്പ് ഓർക്കാനും അത്യാവശ്യ കുക്കികൾ ഉപയോഗിക്കുന്നു. നിങ്ങൾ അനുവദിച്ചാൽ, ആളുകൾ ഏതൊക്കെ പേജുകൾ കാണുന്നു എന്നറിയാൻ അനലിറ്റിക്സ് കുക്കികളും ഉപയോഗിക്കും.",
    details: "കുക്കി വിവരങ്ങൾ വായിക്കുക",
    current: "ഇപ്പോഴത്തെ തിരഞ്ഞെടുപ്പ്:",
    all: "എല്ലാ കുക്കികളും അനുവദിച്ചു",
    essential: "അത്യാവശ്യമുള്ളവ മാത്രം",
    accept: "എല്ലാ കുക്കികളും അനുവദിക്കുക",
    reject: "അത്യാവശ്യമുള്ളവ മാത്രം",
  },

  home: {
    metaTitle: "EasyServe ഓൺലൈൻ സെന്റർ | സർക്കാർ സർട്ടിഫിക്കറ്റുകളും ഓൺലൈൻ അപേക്ഷകളും, എടക്കഴിയൂർ",
    metaDescription:
      "എടക്കഴിയൂർ നാലാംകല്ലിലെ EasyServe ഓൺലൈൻ സെന്റർ സർക്കാർ സർട്ടിഫിക്കറ്റുകളും ഓൺലൈൻ അപേക്ഷകളും ചെയ്തുതരുന്നു: റേഷൻ കാർഡ്, വരുമാന സർട്ടിഫിക്കറ്റ്, പാൻ, വോട്ടർ ഐഡി, വിവാഹ, ജനന സർട്ടിഫിക്കറ്റുകൾ, ഉദ്യം, FSSAI. എവിടെ നിന്നും വാട്സ്ആപ്പിൽ രേഖകൾ അയക്കാം.",
  },
};

const dictionaries: Record<Lang, Dict> = { en, ml };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang];
}

/** Prefixes a site path with /ml for Malayalam pages. */
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? "/ml" : `/ml${path}`;
}

/** Pages that exist in both languages. Everything else is English only. */
export function hasMalayalam(pathname: string): boolean {
  return pathname === "/" || pathname === "/services" || pathname.startsWith("/services/");
}
