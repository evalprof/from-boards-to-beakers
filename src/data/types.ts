export interface Role {
  n: string;
  d: string;
}

export interface Experiment {
  t: string;
  s: string[];
  w: string;
}

export interface Book {
  t: string;
  a: string;
  d: string;
  ag: string;
}

export interface Game {
  id: number;
  name: string;
  icon: string;
  ibg: string;
  tc: string;
  tbg: string;
  stem: string;
  subj: string;
  type: string;
  age: string;
  time: string;
  players: string;
  bgg: number;
  wiki: string;
  photo: string;
  desc: string;
  detail: string;
  concepts: string[];
  roles: Role[];
  facts: string[];
  tools: string[];
  exps: Experiment[];
  books: Book[];
}
