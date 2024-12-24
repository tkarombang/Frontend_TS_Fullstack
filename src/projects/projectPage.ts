import { ApiServiceProj } from "./apiServiceProj";
import { ProjectPage } from "./listProject";

export function renderProjectPage(contentId: string, apiUrl: string): void {
  const content = document.getElementById(contentId);
  if (content) {
    content.innerHTML = `
              <h1>Projects</h1>
              <div class="container">
        <table id="projectsTable" border="1" style="width: 100%; text-align: left;">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        </div>
              `;
    const projectPage = new ProjectPage("projectsTable", "http://localhost:5020/api");
    const apiServiceProj = new ApiServiceProj(apiUrl);

    apiServiceProj.getProjects(1, 10).then((project) => {
      projectPage.renderProject(project);
    });
  }
}
