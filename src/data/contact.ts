import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  Icon: IconType;
  external: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "linkedin",
    value: "linkedin.com/in/giovanniclmb",
    href: "https://www.linkedin.com/in/giovanniclmb/",
    Icon: FaLinkedin,
    external: true,
  },
  {
    label: "x",
    value: "x.com/giovaacolombo",
    href: "https://x.com/giovaacolombo",
    Icon: FaXTwitter,
    external: true,
  },
  {
    label: "github",
    value: "github.com/giovanniclmb",
    href: "https://github.com/giovanniclmb",
    Icon: FaGithub,
    external: true,
  },
  {
    label: "email",
    value: "giovaclmb@gmail.com",
    href: "mailto:giovaclmb@gmail.com",
    Icon: FaEnvelope,
    external: false,
  },
];
