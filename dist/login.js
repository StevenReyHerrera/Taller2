"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const identifacion = document.getElementById("identificacion").value;
    const correo = document.getElementById("email").value;
    try {
        const response = yield getToken("https://apiestudiantes.maosystems.dev/tokens", { identificacion: identifacion, correo: correo });
        if (response.ok) {
            const token = yield response.text();
            localStorage.setItem('token', token);
        }
    }
    catch (err) {
        console.log(err);
    }
}));
const getToken = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = yield fetch(url, options);
    if (!response) {
        throw new Error("Error al obtener el token");
    }
    return response;
});
