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

  async createDeveloper(developer: Omit<Developer, "developerId">): Promise<void> {
    try {
      await axios.post(`${this.API_URL}`, developer);
      console.log("DEVELOPER BARU BERHASIL DIBUAT");
    } catch (err) {
      console.error("GAGAL MENAMBAHKAN DEVELOPER", err);
    }
  }

  async updateDeveloper(developer: Developer): Promise<void> {
    try {
      await axios.put(`${this.API_URL}/${developer.developerId}`, developer, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("DEVELOPER UPDATE SUCCESSFULL");
    } catch (error) {
      console.error("ERROR UPDATING DEVELOPER:", error);
      throw new Error("Failed to update Developer");
    }
  }
}
