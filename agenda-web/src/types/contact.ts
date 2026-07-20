export interface Contact {
  id?: number;
  name: string;
  email: string;
  contact: string;
}

export type ContactFormData = Omit<Contact, "id">;
