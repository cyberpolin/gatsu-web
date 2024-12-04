export type UserType = {
  email: string;
  password: string;
  username?: string;
  token?: string;
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
