export type UserType = {
  email: string;
  password: string;
  username?: string;
  access_token?: string;
  token_type?: string;
};

export type StorageUser = {
  loaded?: boolean;
  user: UserType;
};

export interface Contact {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Concept {
  qty: string;
  concept: string;
  unitPrice: string;
  amount: string;
}

export interface InvoiceData {
  from: Contact;
  to: Contact;
  concepts: Concept[];
}

export type GetMember = {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  rate: number;
  skills: Skill[];
};

export type AddMember = {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  rate: number;
  skills: string[];
};

export interface Skill {
  id: string;
  name: string;
  [x: string]: string;
}
