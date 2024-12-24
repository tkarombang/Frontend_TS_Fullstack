import { Developer } from "./apiServiceDev";

export class DeveloperPage {
  private tableBody: HTMLTableSectionElement;

  constructor(tableId: string) {
    const table = document.querySelector<HTMLTableSectionElement>(`#${tableId} tbody`);
    if (!table) {
      throw new Error(`Table with id '${tableId}' not found.`);
    }
    this.tableBody = table;
  }

  renderDeveloper(developers: Developer[]): void {
    this.tableBody.innerHTML = ""; // Kosongkan tabel sebelum render ulang

    developers.forEach((dev) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${dev.developerId}</td>
                <td>${dev.nama}</td>
                <td>${dev.email}</td>
                <td>${dev.role}</td>
                <td>
                    <button class="edit-btn" data-id="${dev.developerId}">Edit</button>
                </td>
            `;
      this.tableBody.appendChild(row);
    });

    //Tambahkan event listener untuk tombol Edit
    const editBtn = this.tableBody.querySelectorAll(".edit-btn");
    editBtn.forEach((button) => {
      button.addEventListener("click", (event: Event) => {
        const target = event.target as HTMLButtonElement;
        const developerId = target.getAttribute("data-id");
        if (developerId) {
          alert(`Tombol Developer - ${developerId}`);
        }
      });
    });
  }
}
