import axios from "axios";
import { Contact } from "./entities/contacts";

// Define the base URL for the API
const baseURL = "https://jsonplaceholder.typicode.com";

export const ContactAPI = {
  // GET all contacts
  fetchAllContacts: async () => {
    try {
      const response = await axios.get(`${baseURL}/users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all contacts:", error);
      throw error;
    }
  },

  // GET a single contact by ID
  fetchContactById: async (id: number) => {
    try {
      const response = await axios.get(`${baseURL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contact with ID ${id}:`, error);
      throw error;
    }
  },

  // CREATE a new contact
  createContact: async (contactData: Contact) => {
    try {
      const response = await axios.post(`${baseURL}/users`, contactData);
      return response.data;
    } catch (error) {
      console.error("Error creating new contact:", error);
      throw error;
    }
  },

  // UPDATE a contact by ID (using PUT)
  updateContact: async (id: number, updatedData: Contact) => {
    try {
      const response = await axios.put(`${baseURL}/users/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating contact with ID ${id}:`, error);
      throw error;
    }
  },

  // DELETE a contact by ID
  deleteContact: async (id: number) => {
    try {
      const response = await axios.delete(`${baseURL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting contact with ID ${id}:`, error);
      throw error;
    }
  },
};
