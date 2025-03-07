import { Router } from "./router";
import { WelcomePage } from "./welcome";
// import "./css/table.css";

// Render Page
import { renderProjectPage } from "./projects/projectPage";
import { renderDeveloperPage } from "./developer/developerPage";
import { renderUserPage } from "./users/usersPage";

// Inisialisasi Router
const router = new Router();
const contentId = "content";

// Array of Object Pages
const pages = [
  {
    name: "welcome",
    render: () => {
      const welcomePage = new WelcomePage(contentId, "http://localhost:5020/api/Developers");
      welcomePage.render();
    },
  },
  {
    name: "users",
    render: () => renderUserPage(contentId),
  },
  {
    name: "list",
    render: () => renderDeveloperPage(contentId, "http://localhost:5020/api/Developers"),
  },
  {
    name: "projects",
    render: () => renderProjectPage(contentId, "http://localhost:5020/api/Project"),
  },
];

// Tambahkan Routes ke Halaman secara Dinamis
pages.forEach((page) => router.addRoute(page.name, page.render));

// Routing untuk halaman yang berbeda
const hash = window.location.hash.substring(1);
const page = pages.find((p) => p.name === hash);
if (page) {
  page.render();
} else {
  pages[0].render();
}
// Jalankan Router
router.listen();
