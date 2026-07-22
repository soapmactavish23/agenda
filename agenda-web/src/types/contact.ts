import z from "zod";

export interface Contact {
  id: number | null;
  name: string;
  email: string;
  contact: string;
}

export let newContact = {
  id: null,
  name: "",
  contact: "",
  email: "",
};

export const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nome não pode estar vazio.")
    .max(150, "Nome deve ter no máximo 150 caracteres."),

  contact: z
    .string()
    .trim()
    .min(1, "Contato não pode estar vazio.")
    .max(15, "Contato deve ter no máximo 15 caracteres."),

  email: z
    .string()
    .trim()
    .max(150, "E-mail deve ter no máximo 150 caracteres.")
    .min(1, "Contato não pode estar vazio.")
    .email("Informe um e-mail válido.")
    .or(z.literal("")),
});
