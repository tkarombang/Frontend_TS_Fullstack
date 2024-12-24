import axios from "axios";

export interface Developer {
  developerId: number;
  nama: string;
  email: string;
  role: string;
}

export class ApiServiceDev {
  private API_URL: string;

  constructor(apiUrl: string) {
    this.API_URL = apiUrl;
  }

  async getDevelopers(): Promise<Developer[]> {
    try {
      const response = await axios.get<Developer[]>(this.API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
}
