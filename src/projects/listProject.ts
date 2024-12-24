import { ApiServiceProj, Projects } from "./apiServiceProj";

export class ProjectPage {
  private tableBody: HTMLTableSectionElement;
  private apiService: ApiServiceProj;

  constructor(tableId: string, apiUrl: string) {
    const table = document.querySelector<HTMLTableSectionElement>(`#${tableId} tbody`);
    if (!table) {
      throw new Error(`Table with id ${tableId} NOT FOUND.`);
    }
    this.tableBody = table;
    this.apiService = new ApiServiceProj(apiUrl);
  }

  async loadProjects(page: number = 1, pageSize: number = 10): Promise<void> {
    const projects = await this.apiService.getProjects(page, pageSize);
    this.renderProject(projects);
  }

  renderProject(projects: Projects[]): void {
    this.tableBody.innerHTML = "";

    projects.forEach((proj) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${proj.projectId}</td>
      <td>${proj.nama}</td>
      <td>${proj.description}</td>
      <td>${formatDate(proj.start_Date)}</td>
      <td>${formatDate(proj.end_Date)}</td>
      <td>${proj.status}</td>
      `;
      this.tableBody.appendChild(row);
      // console.log(typeof proj.start_Date);
      // console.log(typeof proj.end_Date);
    });
  }
}
function formatDate(dateString: string | number | Date | null): string {
  if (!dateString) return "Invalid Date";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
