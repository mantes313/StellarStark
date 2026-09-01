export type Language = "en" | "lt";

export interface Dictionary {
  navServices: string;
  navWork: string;
  navCare: string;
  navStart: string;
  heroH1: string;
  heroSub: string;
  heroCtaStart: string;
  heroCtaWork: string;
  heroHandleAria: string;
  servicesH2: string;
  buildH3: string;
  buildP: string;
  buildLi1: string;
  buildLi2: string;
  buildLi3: string;
  updateH3: string;
  updateP: string;
  maintainH3: string;
  maintainP: string;
  demoH2: string;
  demoP: string;
  demoPrompt: string;
  swatch1: string;
  swatch2: string;
  swatch3: string;
  swatch4: string;
  demoStatusDefault: string;
  demoStatusLiveSuffix: string;
  workH2: string;
  workOwnLabel: string;
  workOwnSub: string;
  workClientLabel: string;
  workClientSub: string;
  workClientComingSoon: string;
  workOpenAria: string;
  workOpenNewTab: string;
  workCloseAria: string;
  demo1H3: string;
  demo1Tag: string;
  demo1P: string;
  demo2H3: string;
  demo2Tag: string;
  demo2P: string;
  demo3H3: string;
  demo3Tag: string;
  demo3P: string;
  demo4H3: string;
  demo4Tag: string;
  demo4P: string;
  buildYourOwnLabel: string;
  buildYourOwnSub: string;
  buildNameLabel: string;
  buildNamePlaceholder: string;
  buildTaglineLabel: string;
  buildTaglinePlaceholder: string;
  buildLayoutAria: string;
  buildLayoutBold: string;
  buildLayoutSplit: string;
  buildLayoutMinimal: string;
  buildAccentAria: string;
  buildPresetAria: string;
  buildPresetAuto: string;
  buildPresetSalon: string;
  buildPresetMassage: string;
  buildPresetRepair: string;
  buildMiniCta: string;
  buildMiniCtaGhost: string;
  buildDefaultName: string;
  buildDefaultTagline: string;
  buildCtaStart: string;
  contactBuilderNote: string;
  updateTryLabel: string;
  updateTrySub: string;
  updateRequestAria: string;
  updateReqMenuLabel: string;
  updateReqMenuHeadline: string;
  updateReqMenuBody: string;
  updateReqHoursLabel: string;
  updateReqHoursHeadline: string;
  updateReqHoursBody: string;
  updateReqPhoneLabel: string;
  updateReqPhoneHeadline: string;
  updateReqPhoneBody: string;
  updateReqPhotoLabel: string;
  updateReqPhotoHeadline: string;
  updateReqPhotoBody: string;
  updateOldHeadline: string;
  updateOldBody: string;
  updatePromptDefault: string;
  updateStatusLiveSuffix: string;
  maintainTryLabel: string;
  maintainTrySub: string;
  maintainRunBtn: string;
  maintainRunningBtn: string;
  maintainRunAgainBtn: string;
  maintainCheckBackup: string;
  maintainCheckPatch: string;
  maintainCheckUptime: string;
  maintainStatusIdle: string;
  maintainStatusDone: string;
  maintainContentOld: string;
  maintainContentNew: string;
  careH2: string;
  fact1H3: string;
  fact1P: string;
  fact2H3: string;
  fact2P: string;
  fact3H3: string;
  fact3P: string;
  contactH2: string;
  contactP: string;
  footerCopy: string;
  pageTitle: string;
  metaDesc: string;
  langToggleAria: string;
}

export const translations: Record<Language, Dictionary> = {
  en: {
    navServices: "Services",
    navWork: "Work",
    navCare: "Care",
    navStart: "Start a project",
    heroH1: "Your website, built<br/>and kept alive.",
    heroSub:
      "We design it, launch it, then stay on to update and maintain it. One team, for the whole life of your site.",
    heroCtaStart: "Start a project",
    heroCtaWork: "See the work",
    heroHandleAria: "Reveal the finished design. The right side shows this page as a wireframe.",
    servicesH2: "Three jobs. We do all of them.",
    buildH3: "Build",
    buildP:
      "Design and development from a blank page to launch. Copy, structure, and speed handled together, not bolted on later.",
    buildLi1: "Design and development",
    buildLi2: "Copy and structure",
    buildLi3: "Launch and handover",
    updateH3: "Update",
    updateP: "New pages, new features, seasonal changes. You ask, we ship.",
    maintainH3: "Maintain",
    maintainP:
      "Backups, security patches, uptime monitoring, and content changes, handled quietly in the background.",
    demoH2: "Watch an update happen.",
    demoP:
      "Pick a shade. This entire page re-themes in front of you. Changes to a site we maintain feel exactly this direct.",
    demoPrompt: "“Can we try a different look?”",
    swatch1: "Star amber",
    swatch2: "Signal blue",
    swatch3: "Nova rose",
    swatch4: "Aurora mint",
    demoStatusDefault: "Live on every section of this page.",
    demoStatusLiveSuffix: "is live, on every section of this page.",
    workH2: "Selected work",
    workOwnLabel: "Interactive examples",
    workOwnSub: "Built by us. Open one and click around, every button works.",
    workClientLabel: "Client projects",
    workClientSub: "Sites we built and maintain for real businesses.",
    workClientComingSoon: "Case studies landing here soon.",
    workOpenAria: "Open live preview",
    workOpenNewTab: "Open in new tab ↗",
    workCloseAria: "Close preview",
    demo1H3: "AC Repair Workshop",
    demo1Tag: "Auto service",
    demo1P: "Booking flow, service pricing, live diagnostics widget.",
    demo2H3: "Beauty Salon",
    demo2Tag: "Local service",
    demo2P: "Appointment picker, service menu, review carousel.",
    demo3H3: "MasaRena Massage Studio",
    demo3Tag: "Wellness",
    demo3P: "Treatment finder, staff profiles, photo gallery.",
    demo4H3: "V.M. Repair Workshop",
    demo4Tag: "Appliance repair",
    demo4P: "Diagnostics quote tool, service tracker, FAQ accordion.",
    buildYourOwnLabel: "Try building one",
    buildYourOwnSub: "Type a name, pick a look. The preview builds itself as you go.",
    buildNameLabel: "Business name",
    buildNamePlaceholder: "Your business name",
    buildTaglineLabel: "Tagline",
    buildTaglinePlaceholder: "One line about what you do",
    buildLayoutAria: "Page layout",
    buildLayoutBold: "Bold",
    buildLayoutSplit: "Split",
    buildLayoutMinimal: "Minimal",
    buildAccentAria: "Accent color",
    buildPresetAria: "Start from an example",
    buildPresetAuto: "Auto service",
    buildPresetSalon: "Beauty salon",
    buildPresetMassage: "Massage studio",
    buildPresetRepair: "Repair shop",
    buildMiniCta: "Get in touch",
    buildMiniCtaGhost: "Learn more",
    buildDefaultName: "Your Business",
    buildDefaultTagline: "A short line about what you offer.",
    buildCtaStart: "Make this real",
    contactBuilderNote: "We'll pick up from the page you just built.",
    updateTryLabel: "Try shipping one",
    updateTrySub: "Pick a request. Watch it go live on the page.",
    updateRequestAria: "Pick a change to ship",
    updateReqMenuLabel: "New menu item",
    updateReqMenuHeadline: "Try our new autumn menu",
    updateReqMenuBody: "Six new dishes, this week only.",
    updateReqHoursLabel: "Holiday hours",
    updateReqHoursHeadline: "Holiday hours",
    updateReqHoursBody: "10am–4pm, closed Sundays.",
    updateReqPhoneLabel: "New phone number",
    updateReqPhoneHeadline: "New number: (0-611) 22334",
    updateReqPhoneBody: "Same team, easier to reach.",
    updateReqPhotoLabel: "Fresh hero photo",
    updateReqPhotoHeadline: "Fresh look, fresh photos",
    updateReqPhotoBody: "New hero image, shot last week.",
    updateOldHeadline: "Open Tue–Sat, 9–5",
    updateOldBody: "Walk-ins welcome.",
    updatePromptDefault: "“Can we update this?”",
    updateStatusLiveSuffix: "is live on the page.",
    maintainTryLabel: "Try a maintenance pass",
    maintainTrySub: "Run the checks we run quietly, every day.",
    maintainRunBtn: "Run check",
    maintainRunningBtn: "Running…",
    maintainRunAgainBtn: "Run again",
    maintainCheckBackup: "Backup taken",
    maintainCheckPatch: "Security patched",
    maintainCheckUptime: "Uptime verified",
    maintainStatusIdle: "Not run yet.",
    maintainStatusDone: "All clear — verified just now.",
    maintainContentOld: "Last checked: 3 days ago",
    maintainContentNew: "Last checked: just now",
    careH2: "Most agencies leave after launch.<br/>We stay.",
    fact1H3: "Watched around the clock",
    fact1P: "If your site goes down, we usually know before you do.",
    fact2H3: "Patched as released",
    fact2P: "Security updates applied when they ship, not when something breaks.",
    fact3H3: "Changes within a day",
    fact3P: "New hours, new menu, new photo. Send it, and it's live.",
    contactH2: "Start a project",
    contactP: "Tell us what you need. We reply within one business day.",
    footerCopy: "© 2026 StellarStark. Websites built, updated, and kept alive.",
    pageTitle: "StellarStark. Websites built, updated, and kept alive.",
    metaDesc:
      "StellarStark designs, builds, and maintains websites for businesses that can't afford downtime.",
    langToggleAria: "Switch language to Lithuanian"
  },
  lt: {
    navServices: "Paslaugos",
    navWork: "Darbai",
    navCare: "Priežiūra",
    navStart: "Pradėti projektą",
    heroH1: "Jūsų svetainė sukurta<br/>ir palaikoma gyva.",
    heroSub:
      "Sukuriame ją, paleidžiame, o tada toliau atnaujiname ir prižiūrime. Viena komanda visam jūsų svetainės gyvavimo laikui.",
    heroCtaStart: "Pradėti projektą",
    heroCtaWork: "Žiūrėti darbus",
    heroHandleAria:
      "Atskleiskite baigtinį dizainą. Dešinėje pusėje šis puslapis rodomas kaip eskizas.",
    servicesH2: "Trys darbai. Atliekame juos visus.",
    buildH3: "Kūrimas",
    buildP:
      "Dizainas ir programavimas nuo tuščio lapo iki paleidimo. Tekstas, struktūra ir greitis tvarkomi kartu, o ne pridedami vėliau.",
    buildLi1: "Dizainas ir programavimas",
    buildLi2: "Tekstas ir struktūra",
    buildLi3: "Paleidimas ir perdavimas",
    updateH3: "Atnaujinimas",
    updateP: "Nauji puslapiai, naujos funkcijos, sezoniniai pakeitimai. Jūs paprašote, mes įgyvendiname.",
    maintainH3: "Priežiūra",
    maintainP:
      "Atsarginės kopijos, saugumo pataisos, veikimo stebėjimas ir turinio pakeitimai, tvarkomi tyliai fone.",
    demoH2: "Stebėkite, kaip vyksta atnaujinimas.",
    demoP:
      "Pasirinkite atspalvį. Visas šis puslapis pasikeičia jūsų akyse. Pakeitimai svetainėje, kurią prižiūrime, jaučiasi lygiai taip pat tiesiogiai.",
    demoPrompt: "„Gal galėtume pabandyti kitokią išvaizdą?“",
    swatch1: "Žvaigždių gintaras",
    swatch2: "Signalinė mėlyna",
    swatch3: "Aušros rausva",
    swatch4: "Šiaurės pašvaistės mėta",
    demoStatusDefault: "Gyvai veikia visose šio puslapio dalyse.",
    demoStatusLiveSuffix: "dabar gyvai veikia visose šio puslapio dalyse.",
    workH2: "Atrinkti darbai",
    workOwnLabel: "Interaktyvūs pavyzdžiai",
    workOwnSub: "Sukurta mūsų. Atsidarykite ir paspaudinėkite, kiekvienas mygtukas veikia.",
    workClientLabel: "Projektai klientams",
    workClientSub: "Svetainės, kurias sukūrėme ir prižiūrime realiems verslams.",
    workClientComingSoon: "Klientų darbai netrukus pasirodys čia.",
    workOpenAria: "Atidaryti gyvą peržiūrą",
    workOpenNewTab: "Atidaryti naujame lange ↗",
    workCloseAria: "Uždaryti peržiūrą",
    demo1H3: "Auto kondicionierių dirbtuvės",
    demo1Tag: "Auto servisas",
    demo1P: "Registracijos eiga, paslaugų kainos, gyvas diagnostikos valdiklis.",
    demo2H3: "Grožio salonas",
    demo2Tag: "Vietinė paslauga",
    demo2P: "Vizito laiko rinkiklis, paslaugų meniu, atsiliepimų karuselė.",
    demo3H3: "MasaRena masažo studija",
    demo3Tag: "Sveikatingumas",
    demo3P: "Procedūrų paieška, specialistų profiliai, nuotraukų galerija.",
    demo4H3: "V.M. Remonto dirbtuvės",
    demo4Tag: "Buitinės technikos remontas",
    demo4P: "Diagnostikos kainos skaičiuoklė, užsakymo sekimas, DUK skydelis.",
    buildYourOwnLabel: "Pabandykite susikurti",
    buildYourOwnSub: "Įveskite pavadinimą, pasirinkite stilių. Peržiūra kuriasi jūsų akyse.",
    buildNameLabel: "Verslo pavadinimas",
    buildNamePlaceholder: "Jūsų verslo pavadinimas",
    buildTaglineLabel: "Šūkis",
    buildTaglinePlaceholder: "Viena eilutė apie tai, ką siūlote",
    buildLayoutAria: "Puslapio išdėstymas",
    buildLayoutBold: "Ryškus",
    buildLayoutSplit: "Padalintas",
    buildLayoutMinimal: "Minimalus",
    buildAccentAria: "Akcentinė spalva",
    buildPresetAria: "Pradėkite nuo pavyzdžio",
    buildPresetAuto: "Auto servisas",
    buildPresetSalon: "Grožio salonas",
    buildPresetMassage: "Masažo studija",
    buildPresetRepair: "Remonto dirbtuvės",
    buildMiniCta: "Susisiekite",
    buildMiniCtaGhost: "Sužinoti daugiau",
    buildDefaultName: "Jūsų verslas",
    buildDefaultTagline: "Trumpa eilutė apie tai, ką siūlote.",
    buildCtaStart: "Padarykime tikra",
    contactBuilderNote: "Tęsime nuo puslapio, kurį ką tik sukūrėte.",
    updateTryLabel: "Pabandykite paskelbti pakeitimą",
    updateTrySub: "Pasirinkite prašymą. Stebėkite, kaip jis atsiranda puslapyje.",
    updateRequestAria: "Pasirinkite pakeitimą",
    updateReqMenuLabel: "Naujas meniu punktas",
    updateReqMenuHeadline: "Išbandykite naują rudens meniu",
    updateReqMenuBody: "Šeši nauji patiekalai, tik šią savaitę.",
    updateReqHoursLabel: "Šventinės darbo valandos",
    updateReqHoursHeadline: "Šventinės darbo valandos",
    updateReqHoursBody: "10–16 val., sekmadieniais nedirbame.",
    updateReqPhoneLabel: "Naujas telefono numeris",
    updateReqPhoneHeadline: "Naujas numeris: (0-611) 22334",
    updateReqPhoneBody: "Ta pati komanda, lengviau susisiekti.",
    updateReqPhotoLabel: "Nauja pagrindinė nuotrauka",
    updateReqPhotoHeadline: "Naujas žvilgsnis, naujos nuotraukos",
    updateReqPhotoBody: "Nauja pagrindinė nuotrauka, nufotografuota praėjusią savaitę.",
    updateOldHeadline: "Dirbame antr.–šešt., 9–17",
    updateOldBody: "Užsukite be išankstinės registracijos.",
    updatePromptDefault: "„Ar galime tai atnaujinti?“",
    updateStatusLiveSuffix: "jau matoma puslapyje.",
    maintainTryLabel: "Pabandykite priežiūros patikrą",
    maintainTrySub: "Paleiskite patikras, kurias mes atliekame tyliai kasdien.",
    maintainRunBtn: "Paleisti patikrą",
    maintainRunningBtn: "Vykdoma…",
    maintainRunAgainBtn: "Paleisti dar kartą",
    maintainCheckBackup: "Atsarginė kopija padaryta",
    maintainCheckPatch: "Saugumas atnaujintas",
    maintainCheckUptime: "Veikimas patikrintas",
    maintainStatusIdle: "Dar nepaleista.",
    maintainStatusDone: "Viskas tvarkoje — patikrinta ką tik.",
    maintainContentOld: "Paskutinį kartą tikrinta prieš 3 dienas",
    maintainContentNew: "Paskutinį kartą tikrinta ką tik",
    careH2: "Dauguma agentūrų išeina po paleidimo.<br/>Mes liekame.",
    fact1H3: "Stebėma visą parą",
    fact1P: "Jei jūsų svetainė nustoja veikti, dažniausiai sužinome anksčiau nei jūs.",
    fact2H3: "Pataisoma iš karto",
    fact2P: "Saugumo atnaujinimai pritaikomi vos jiems pasirodžius, o ne tada, kai kažkas sugenda.",
    fact3H3: "Pakeitimai per dieną",
    fact3P: "Naujos darbo valandos, naujas meniu, nauja nuotrauka. Atsiųskite, ir tai jau veikia.",
    contactH2: "Pradėti projektą",
    contactP: "Papasakokite, ko jums reikia. Atsakome per vieną darbo dieną.",
    footerCopy: "© 2026 StellarStark. Svetainės kuriamos, atnaujinamos ir palaikomos gyvos.",
    pageTitle: "StellarStark. Svetainės kuriamos, atnaujinamos ir palaikomos gyvos.",
    metaDesc:
      "StellarStark kuria, programuoja ir prižiūri svetaines verslams, kurie negali sau leisti prastovų.",
    langToggleAria: "Perjungti kalbą į anglų"
  }
};
