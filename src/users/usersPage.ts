import { UsersTable } from "./users";

export function renderUserPage(contentId: string): void {
  const content = document.getElementById(contentId);
  if (content) {
    content.innerHTML = `
                       <h1>Daftar Pengguna</h1>
              <div class="container">
              <table id="usersTable" border="1" style="width: 100%; text-align: left;">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Nama</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Site</th>
                      </tr>
                  </thead>
                  <tbody>
                      <!-- Data pengguna akan ditambahkan di sini -->
                  </tbody>
              </table>
              </div>`;
    const usersTable = new UsersTable("usersTable");
    usersTable.fetchAndDisplayUsers();
  }
}
