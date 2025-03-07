import { ApiServiceDev, Developer } from "./developer/apiServiceDev";

export class WelcomePage {
  private content: HTMLElement;
  private apiService: ApiServiceDev;

  constructor(contentId: string, apiUrl: string) {
    const content = document.getElementById(contentId);
    if (!content) throw new Error(`Content with id '${contentId}' not found.`);
    this.content = content;
    this.apiService = new ApiServiceDev(apiUrl);
  }

  render(): void {
    this.content.innerHTML = `
            <div class="halDepan">
                <h2>Selamat Datang!</h2>
                <p>Ini adalah halaman utama aplikasi.</p>
                <a href="#" id="tambahDev">Tambah Developer</a>
            </div>
            
             <!-- FORM TAMBAH  DATA DEVELOPER -->
    <div id="addDeveloperForm" class="modal hidden">
        <div class="modal-content">
            <h2>Tambah Developer</h2>
            <form id="developerForm">
                <label for="devName">Nama:</label>
                <input type="text" id="devName" required>

                <label for="devEmail">Email:</label>
                <input type="text" id="devEmail" required>

                <label for="devRole">Role:</label>
                <input type="text" id="devRole" required>

                <button type="submit">Simpan</button>
                <button type="button" id="cancelDev">Cancel</button>
            </form>
        </div>
    </div>
        `;

    this.setupModalEvent();
  }

  private setupModalEvent() {
    const tambahDevBtn = document.getElementById("tambahDev");
    const modal = document.getElementById("addDeveloperForm");
    const cancelBtn = document.getElementById("cancelDev");
    const formDev = document.getElementById("developerForm") as HTMLFormElement;

    if (tambahDevBtn && modal) {
      tambahDevBtn.addEventListener("click", (event) => {
        event.preventDefault();
        modal.classList.remove("hidden");
      });
    }
    if (cancelBtn && modal) {
      cancelBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    }

    if (formDev) {
      formDev.addEventListener("submit", async (event) => {
        event.preventDefault();

        const newDeveloper: Omit<Developer, "developerId"> = {
          nama: (document.getElementById("devName") as HTMLInputElement).value,
          email: (document.getElementById("devEmail") as HTMLInputElement).value,
          role: (document.getElementById("devRole") as HTMLInputElement).value,
        };

        await this.apiService.createDeveloper(newDeveloper);

        modal?.classList.add("hidden");

        formDev.reset();
      });
    }
  }
}

// <label for="devPhone">Phone:</label>
// <input type="number" id="devPhone">

// <label for="devTanggalLahir">Tanggal Lahir:</label>
// <input type="date" id="devTanggalLahir" required>

// <label for="devStatus">Status:</label>
// <input type="text" id="devStatus">

// <select name="gender" id="devGender">
//     <option value="">-Gender-</option>
//     <option value="1">Pria</option>
//     <option value="2">Wanita</option>
// </select>
