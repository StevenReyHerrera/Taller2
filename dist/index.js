"use strict";
const buttonAdd = document.querySelector('.button-addEstudiante');
const form = document.querySelector('.form');
const buttonClose = document.querySelector('.form__button-cerrar');
const modal = document.querySelector('.modal');
buttonAdd.onclick = () => {
    form.style.display = 'flex';
    modal.style.display = 'flex';
};
buttonClose.onclick = () => {
    form.classList.add('closing'); // Agregar clase closing
    setTimeout(() => {
        form.style.display = 'none'; // Ocultar formulario después de 0.5 segundos
        modal.style.display = 'none';
        form.classList.remove('closing'); // Eliminar clase closing
    }, 300);
};
