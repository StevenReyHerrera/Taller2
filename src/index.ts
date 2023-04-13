const buttonAdd=document.querySelector('.button-addEstudiante') as HTMLButtonElement;
const form= document.querySelector('.form') as HTMLFormElement;
const buttonClose=document.querySelector('.form__button-cerrar') as HTMLButtonElement;
const modal = document.querySelector('.modal') as HTMLDivElement;
buttonAdd.onclick=()=>{
    form.style.display='flex';
    modal.style.display = 'flex';  
}

buttonClose.onclick = () => {
    form.classList.add('closing'); // Agregar clase closing
    setTimeout(() => {
      form.style.display = 'none'; // Ocultar formulario después de 0.5 segundos
      modal.style.display = 'none'; 
      form.classList.remove('closing'); // Eliminar clase closing
    }, 300);
  };
  
