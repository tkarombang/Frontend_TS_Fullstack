import { ApiServiceDev, Developer } from "./apiServiceDev";

export function setupEditModal(apiService: ApiServiceDev) {
  const modal = document.querySelector("#editModal") as HTMLDivElement;
  const closeModal = document.querySelector(".close-btn") as HTMLSpanElement;
  const editForm = document.querySelector("#editForm") as HTMLFormElement;

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  editForm.addEventListener("submit", (event) => {
    // var event : Event | undefined;
    event.preventDefault();

    const devId = (document.getElementById("devId") as HTMLInputElement).value;
    const devName = (document.getElementById("devName") as HTMLInputElement).value;
    const devEmail = (document.getElementById("devEmail") as HTMLInputElement).value;
    const devRole = (document.getElementById("devRole") as HTMLInputElement).value;

    const updatedDeveloper: Developer = {
      developerId: parseInt(devId),
      nama: devName,
      email: devEmail,
      role: devRole,
    };

    try {
      apiService.updateDeveloper(updatedDeveloper);
      alert("DATA BERHASIL DIPERBAHARUI");
      modal.style.display = "none";
      location.reload();
    } catch (error) {
      alert("GAGAL MEMPERBAHARUI DATA" + error);
    }
  });
}

export function openEditModal(developerId: number) {
  const modal = document.querySelector("#editModal") as HTMLDivElement;
  modal.style.display = "flex";

  // AMBIL DATA DEVELOPER DARI API
  fetch(`http://localhost:5020/api/Developers/${developerId}`)
    .then((response) => response.json())
    .then((developer: Developer) => {
      (document.getElementById("devId") as HTMLInputElement).value = developer.developerId.toString();
      (document.getElementById("devName") as HTMLInputElement).value = developer.nama;
      (document.getElementById("devEmail") as HTMLInputElement).value = developer.email;
      (document.getElementById("devRole") as HTMLInputElement).value = developer.role;
    });
}
