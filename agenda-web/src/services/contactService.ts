import type { Contact } from "../types/contact";
import { api } from "./api";

class ContactService {
  _RESOURCE = "contatos";

  async findAll(): Promise<Contact[]> {
    const response = await api.get(this._RESOURCE);
    return response.data;
  }

  async findById(id: number): Promise<Contact> {
    const response = await api.get(`${this._RESOURCE}/${id}`);
    return response.data;
  }

  async create(request: Contact): Promise<Contact> {
    const response = await api.post(this._RESOURCE, request);
    return response.data;
  }

  async update(request: Contact): Promise<Contact> {
    const response = await api.put(this._RESOURCE, request);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`${this._RESOURCE}/${id}`);
  }
}

export const contactService = new ContactService();
