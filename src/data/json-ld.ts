import type {
  Person,
  CollegeOrUniversity,
  OrganizationRole,
  IdReference,
  WebSite,
  Graph,
  Thing,
} from "schema-dts";

export const bsuirRef: IdReference = {
  "@id": "https://www.bsuir.by/#organization",
};
export const bsuir: CollegeOrUniversity = {
  ...bsuirRef,
  "@type": "CollegeOrUniversity",
  name: "Belarusian State University of Informatics and Radioelectronics",
  alternateName: "BSUIR",
  url: "http://www.bsuir.by/",
  foundingDate: "1964-03-15",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Minsk",
    addressCountry: "Belarus",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 53.91772,
    longitude: 27.594972,
  },
  sameAs: [
    "https://www.wikidata.org/wiki/Q816145",
    "https://en.wikipedia.org/wiki/Belarusian_State_University_of_Informatics_and_Radioelectronics",
  ],
};
export const bsuirRole: OrganizationRole<IdReference, "memberOf"> = {
  "@type": "OrganizationRole",
  roleName: "Student",
  startDate: "2023",
  endDate: "2027",
  memberOf: bsuirRef,
  numberedPosition: 1,
};

export const nadevkoRef: IdReference = {
  "@id": "https://nadevko.cc/#nadevko",
};
export const nadevko: Person = {
  ...nadevkoRef,
  "@type": "Person",

  name: "Aliaksei Baradzin",
  alternateName: ["Nadeŭka", "nadevko"],
  jobTitle: "Software Engineering Student",

  memberOf: bsuirRole,
  affiliation: bsuirRef,

  url: "https://nadevko.cc/",
  email: "me@nadevko.cc",
  sameAs: [
    "https://github.com/nadevko",
    "https://codeberg.org/nadevko",
    "https://t.me/akujasavic",
  ],

  gender: "Male",

  description:
    "3rd-year Software Engineering student at BSUIR. Strong Linux background and experience across multiple programming languages (C++, C#, Java, Go, Zig, Lisp). Interested in DevOps, backend and system-level development.",
  knowsLanguage: ["en", "be", "ru"],
  knowsAbout: [
    "Linux",
    "NixOS",
    "Nix",
    "DevOps",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Bash",

    "C",
    "C++",
    "C#",
    "F#",
    "Java",
    "Go",
    "Zig",
    "Python",
    "TypeScript",

    "PostgreSQL",
    "Networking",

    "Node.js",
    "React",
    "Webpack",
  ],
};

export const websiteRef: IdReference = {
  "@id": "https://nadevko.cc/#website",
};
export const website: WebSite = {
  "@type": "WebSite",
  url: "https://nadevko.cc",
  publisher: nadevkoRef,
  description: "Nadevko's personal webpage",
  inLanguage: "en",
};

export default (graph: Thing[]): Graph => ({
  "@context": "https://schema.org",
  "@graph": graph,
});
