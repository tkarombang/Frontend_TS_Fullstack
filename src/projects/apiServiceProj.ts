import axios from "axios";

export interface Projects {
  projectId: number;
  nama: string;
  description: string;
  start_Date: string | null;
  end_Date: string | null;
  status: string;
}

export class ApiServiceProj {
  private API_URL: string;

  constructor(apiUrl: string) {
    this.API_URL = apiUrl;
  }

  async getProjects(page: number, pageSize: number): Promise<Projects[]> {
    try {
      const response = await axios.get<Projects[]>(`${this.API_URL}`, {
        params: {
          page,
          pageSize,
        },
      });
      // console.log(response.data);
      return response.data.map((proj) => ({
        ...proj,
        start_Date: proj.start_Date ? new Date(proj.start_Date).toISOString() : null,
        end_Date: proj.end_Date ? new Date(proj.end_Date).toISOString() : null,
      }));
    } catch (error) {
      console.error("Error fetching Projects:", error);
      return [];
    }
  }
}
