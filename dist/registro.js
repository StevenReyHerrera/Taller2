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
const buttonAdd = document.querySelector('.button-addEstudiante');
const form = document.querySelector('.form');
const buttonClose = document.querySelector('.form__button-cerrar');
const modal = document.querySelector('.modal');
const botonEdit = document.querySelector('.button-edit');
const formUpdate = document.querySelector('.form-update');
//botones principales
buttonAdd.onclick = () => {
    form.style.display = 'flex';
    modal.style.display = 'flex';
    formUpdate.style.display = 'none';
};
botonEdit.onclick = () => {
    if (formUpdate.style.display === 'block') {
        formUpdate.style.display = 'none';
    }
    else {
        formUpdate.style.display = 'block';
    }
};
buttonClose.onclick = () => {
    form.classList.add('closing'); // Agregar clase closing
    setTimeout(() => {
        form.style.display = 'none'; // Ocultar formulario después de 0.3 segundos
        modal.style.display = 'none';
        form.classList.remove('closing'); // Eliminar clase closing
    }, 300);
};
const postData = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    };
    const response = yield fetch(url, options);
    if (!response.ok) { // Si la respuesta indica que hubo un error, lanzar excepción
        if (response.status === 409) {
            throw new Error('El estudiante ya existe');
        }
    }
    return response;
});
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const message = document.querySelector('.form__message');
    const student = {
        tipoIdentificacion: parseInt(document.querySelector('[name="tipoIdentificacion"]').value),
        numeroIdentificacion: parseInt(document.querySelector('[name="identificacion"]').value),
        nombres: document.querySelector('[name="nombres"]').value,
        apellidos: document.querySelector('[name="apellidos"]').value,
        celular: parseInt(document.querySelector('[name="celular"]').value),
        correo: document.querySelector('[name="correo"]').value,
        linkedin: document.querySelector('[name="userLinkedin"]').value,
        github: document.querySelector('[name="userGitHub"]').value,
    };
    form.classList.add('closing');
    try {
        const response = yield postData('https://apiestudiantes.maosystems.dev/estudiantes', student);
        if (response.ok) {
            message.textContent = 'creado exitosamente';
            setTimeout(() => {
                form.style.display = 'none';
                modal.style.display = 'none';
                form.classList.remove('closing');
                form.reset();
                window.location.reload();
            }, 300);
        }
    }
    catch (error) {
        message.textContent = `${error}`;
    }
}));
const getData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    };
    try {
        const response = yield fetch(url, options);
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
        }
        const data = yield response.json();
        return data.data;
    }
    catch (error) {
        console.log(error);
    }
});
const fillTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData('https://apiestudiantes.maosystems.dev/estudiantes/');
    const table = document.querySelector('.container-table__table');
    for (let i = 0; i < data.length; i++) {
        console.log(i);
        const row = document.createElement('tr');
        table.appendChild(row);
        const currentStudent = data[i];
        Object.keys(currentStudent).forEach((propiedad, index) => {
            const value = currentStudent[propiedad];
            const cell = document.createElement('td');
            cell.textContent = value.toString();
            row.appendChild(cell);
        });
        const botonDelete = document.createElement('button');
        botonDelete.setAttribute('class', 'container-table__table__button-delete');
        botonDelete.textContent = 'delete';
        botonDelete.onclick = () => {
            /* deleteRow(data[i]._id) */
        };
        row.appendChild(botonDelete);
    }
});
const deleteData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'DELETE',
    };
    const response = yield fetch(url, options);
    if (!response) {
        throw new Error('Hubo un error al eliminar el estudiante');
    }
    return response;
});
const deleteRow = (id) => {
    const url = `http://localhost:5000/deleteStudent/${id}`;
    try {
        deleteData(url);
        window.location.reload();
    }
    catch (err) {
        console.log(err);
    }
};
fillTable();
const editStudent = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    };
    const labelMessage = document.querySelector('.form-update__message');
    try {
        const response = yield fetch(`https://apiestudiantes.maosystems.dev/estudiantes/${id}`, options);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Estudiante no encontrado');
            }
            throw new Error('Error al actualizar');
        }
        const message = yield response.json();
        labelMessage.textContent = `${message.message}`;
        setTimeout(() => {
            formUpdate.style.display = 'none';
            formUpdate.reset();
        }, 2000);
    }
    catch (err) {
        labelMessage.textContent = `${err}`;
    }
});
formUpdate.addEventListener('submit', (event) => {
    event.preventDefault();
    editStudent(parseInt(document.getElementById('id-estudiante').value), {
        "nombres": document.querySelector('[name="nombres-update"]').value,
        "apellidos": document.querySelector('[name="apellidos-update"]').value,
        "celular": parseInt(document.querySelector('[name="celular-update"]').value),
        "correo": document.querySelector('[name="correo-update"]').value,
        "linkedin": document.querySelector('[name="linkedin-update"]').value,
        "github": document.querySelector('[name="github-update"]').value,
    });
});
