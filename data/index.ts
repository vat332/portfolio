export const navItems = [
  { name: "Projekty", link: "#projects" },
  { name: "Technologie", link: "#technologies" },
  { name: "Doświadczenie", link: "#experience" },
  { name: "Podejście", link: "#approch" },
  { name: "Kontakt", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "Stawiam na współpracę i otwartą komunikację.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Szybko się ucze i dostosowuje do nowych wyzwań.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Mój stack technologiczny:",
    description: "Stale dążę do doskonalenia umiejętności",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Entuzjasta technologii z pasją do programowania.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "Clean Code to podstawa",
    description: "",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Chcesz rozpocząć wspólny projekt?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Issue Tracker",
    des: "Issue Tracker to aplikacja do zarządzania problemami w projektach. Umożliwia przeglądanie, tworzenie i zarządzanie problemami w projekcie.",
    img: "/p1.png",
    iconLists: [
      "/vercel.svg",
      "/vite.svg",
      "/ts.svg",
      "/tail.svg",
      "/next.svg",
    ],
    link: "https://issue-tracker-ten-psi.vercel.app/",
    github: "https://github.com/vat332/issue-tracker",
  },
  {
    id: 2,
    title: "Interaktywna strona z grami GameHub",
    des: "Game Hub to aplikacja internetowa, która pozwala użytkownikom przeglądać informacje o grach, w tym zrzuty ekranu, zwiastuny, oceny krytyków i wiele więcej.",
    img: "/p2.png",
    iconLists: [
      "/re.svg",
      "/vercel.svg",
      "/vite.svg",
      "/ts.svg",
      "/chakra.svg",
    ],
    link: "https://game-hub-nine-dun-57.vercel.app/",
    github: "https://github.com/vat332/game-hub-site",
  },
  {
    id: 3,
    title: "Animowana strona internetowa na wzór Apple",
    des: "Odtworzyłem stronę internetową iPhone’a 15 Pro firmy Apple, łącząc animacje GSAP z efektami 3D przy użyciu Three.js.",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://apple-website-ten-olive.vercel.app/",
    github: "https://github.com/vat332/apple_website",
  },
  {
    id: 4,
    title: "Przykładowa strona internetowa dla fimry Hostingowej",
    des: "Responsywna oraz nowczesna strona dla firmy.",
    img: "/p4.png",
    iconLists: ["/tail.svg", "/ts.svg", "/vercel.svg", "/vite.svg"],
    link: "https://website-khaki-nu.vercel.app/",
    github: "https://github.com/vat332/website",
  },
  {
    id: 5,
    title: "Chef Claude - Przepisy kulinarne",
    des: "Aplikacja Chef Claude pozwala użytkownikowi wprowadzić listę składników, a następnie generuje propozycję przepisu na podstawie tych składników, korzystając z AI.",
    img: "/p5.png",
    iconLists: ["/tail.svg", "/vercel.svg", "/vite.svg"],
    link: "https://aplikacja-do-proponowania-potraw.vercel.app/",
    github: "https://github.com/vat332/aplikacja-do-proponowania-potraw",
  },
];

export const technologies = [
  {
    quote:
      "Next.js to zaawansowany framework oparty na React, który umożliwia serwerowe renderowanie stron, generowanie statycznych witryn oraz błyskawiczne ładowanie. Doskonały wybór do tworzenia nowoczesnych aplikacji webowych z naciskiem na SEO i wydajność.",
    name: "Next.js",
    title: "Framework Reacta do SSR i SSG",
  },
  {
    quote:
      "React to biblioteka JavaScript służąca do budowy dynamicznych interfejsów użytkownika. Dzięki komponentowej strukturze ułatwia rozwijanie i utrzymanie dużych aplikacji frontendowych.",
    name: "React",
    title: "Biblioteka UI stworzona przez Meta",
  },
  {
    quote:
      "Tailwind CSS to utility-first framework CSS, który pozwala szybko i efektywnie tworzyć estetyczne interfejsy bez konieczności pisania własnego kodu CSS.",
    name: "Tailwind CSS",
    title: "Framework do szybkiego stylowania",
  },
  {
    quote:
      "Three.js umożliwia tworzenie zaawansowanej grafiki 3D w przeglądarce internetowej z wykorzystaniem WebGL. To idealne rozwiązanie do budowy interaktywnych wizualizacji i efektownych animacji 3D.",
    name: "Three.js",
    title: "Biblioteka JavaScript do grafiki 3D",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Stażysta – Sprint S.A.",
    desc: "Refaktoryzacja kodu aplikacji webowych (Vue.js, PHP Symfony), tworzenie nowych funkcjonalności oraz testowanie ich za pomocą testów jednostkowych. Współpraca z zespołem frontendowym. Realizacja produkcji zgodnie z dokumentacją techniczną i normami jakości.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Pracownik serwisu komputerowego System Plus S.A. – Ciechanów",
    desc: "Obsługa klientów, doradzanie w wyborze produktów, dbanie o pozytywne doświadczenia zakupowe oraz wykonywanie prac fizycznych zgodnie z procedurami bezpieczeństwa.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Stażysta w firmie komputerowej COMA S.A.",
    desc: "Obsługa klientów, doradztwo, dbanie o porządek, wykonywanie prac fizycznych zgodnie z procedurami bezpieczeństwa i jakością.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/vat332",
  },
  {
    id: 2,
    img: "/linkedin.svg",
    link: "https://www.linkedin.com/in/sebastian-murawski332/",
  },
];
