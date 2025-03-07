import { DeveloperPage } from "./listdev";
import { ApiServiceDev, Developer } from "./apiServiceDev";
import { setupEditModal } from "./editModal";

export async function renderDeveloperPage(contentId: string, apiUrl: string): Promise<void> {
  const content = document.getElementById(contentId);
  if (!content) return;
  try {
    const response = await fetch("/templates/developerPage.html");
    const html = await response.text();
    content.innerHTML = html;
    //Inisialisasi DeveloperPage dan ambil data dari API
    const developerPage = new DeveloperPage("developersTable");
    const apiServiceDev = new ApiServiceDev(apiUrl);

    apiServiceDev.getDevelopers().then((developers) => {
      developerPage.renderDeveloper(developers);
    });
    setupEditModal(apiServiceDev);
  } catch (err) {
    console.error("GAGAL MEMUAT TEMPLATE HALAMAN DEVELOPER", err);
  }
}
