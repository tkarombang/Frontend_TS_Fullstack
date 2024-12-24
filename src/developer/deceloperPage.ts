import { DeveloperPage } from "./listdev";
import { ApiServiceDev } from "./apiServiceDev";

export function renderDeveloperPage(contentId: string, apiUrl: string): void {
  const content = document.getElementById(contentId);
  if (content) {
    content.innerHTML = `
                      <h1>Daftar Developers</h1>
                      <div class="container">
                      <table id="developersTable" border="1" style="width: 100%; text-align: left;">
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>Nama</th>
                                  <th>Email</th>
                                  <th>Role</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              <!-- Data pengguna akan ditambahkan di sini -->
                          </tbody>
                      </table>
                      </div>
                  `;

    //Inisialisasi DeveloperPage dan ambil data dari API
    const developerPage = new DeveloperPage("developersTable");
    const apiServiceDev = new ApiServiceDev(apiUrl);

    apiServiceDev.getDevelopers().then((developers) => {
      developerPage.renderDeveloper(developers);
    });
  }
}
