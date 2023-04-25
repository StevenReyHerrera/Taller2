const loginForm = document.querySelector(".login-form");

loginForm!.addEventListener("submit", async (event) => {
  event.preventDefault();
  const identifacion = (
    document.getElementById("identificacion") as HTMLInputElement
  ).value;
  const correo = (document.getElementById("email") as HTMLInputElement).value;

  getToken("https://apiestudiantes.maosystems.dev/tokens", {
    identificacion: identifacion,
    correo: correo,
  });
});

const getToken = async (url: string, data: {}) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const message = document.getElementById("message");
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error al obtener el token");
    }
    const token = await response.text();
    localStorage.setItem("token", token);
    console.log(token);
    message!.textContent = "";
    window.location.href="./registro.html"
  } catch (error) {
    message!.textContent = "Error";
  }
};
