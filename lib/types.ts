export type Role = { n: string; d: string };
export type Experiment = { t: string; s: string[]; w: string };
export type Book = { t: string; a: string; d: string; ag: string };

export type AgeBand = "5-8" | "8-12" | "12+";
export type GameType =
  | "Strategy"
  | "Card"
  | "Cooperative"
  | "Word"
  | "Dexterity";
export type Subject =
  | "Biology"
  | "Space"
  | "Engineering"
  | "Geography"
  | "Forensics";

export type Game = {
  id: number;
  slug: string;
  name: string;
  icon: string;
  ibg: string;
  tc: string;
  tbg: string;
  stem: string;
  subj: Subject;
  type: GameType;
  age: AgeBand;
  time: string;
  players: string;
  bgg: number;
  wiki: string;
  photo?: string;
  desc: string;
  detail: string;
  concepts: string[];
  roles: Role[];
  facts: string[];
  tools: string[];
  exps: Experiment[];
  books: Book[];
};
