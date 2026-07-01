import type { IconType } from "react-icons";
import { FaDatabase, FaJava } from "react-icons/fa6";
import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiReact,
  SiTypescript,
} from "react-icons/si";

export interface TechItem {
  label: string;
  Icon: IconType;
}

export const STACK: TechItem[] = [
  { label: "HTML", Icon: SiHtml5 },
  { label: "CSS", Icon: SiCss },
  { label: "JavaScript", Icon: SiJavascript },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "React", Icon: SiReact },
  { label: "Java", Icon: FaJava },
  { label: "SQL", Icon: FaDatabase },
  { label: "MySQL", Icon: SiMysql },
];
