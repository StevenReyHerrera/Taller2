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
      form.style.display = 'none'; // Ocultar formulario después de 0.3 segundos
      modal.style.display = 'none'; 
      form.classList.remove('closing'); // Eliminar clase closing
    }, 300);
  };
  

  interface student{
    _id:number;
    tipoIdentificacion:string,
    identificacion:number,
    nombres:string,
    apellidos:string,
    celular:number,
    correo:string,
    userLinkedin:string,
    userGitHub:string
}


const postData=async(url:string,data:student)=>{
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
    }
    const response= await fetch(url,options)
    if (!response.ok) { // Si la respuesta indica que hubo un error, lanzar excepción
      throw new Error('Hubo un error al crear el estudiante');
    }
    return response
}


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.querySelector('.form__message');
    const student = {
      _id: parseInt((document.querySelector('[name="identificacion"]') as HTMLInputElement).value),
      tipoIdentificacion: (document.querySelector('[name="tipoIdentificacion"]') as HTMLSelectElement).value,
      identificacion: parseInt((document.querySelector('[name="identificacion"]') as HTMLInputElement).value),
      nombres: (document.querySelector('[name="nombres"]') as HTMLInputElement).value,
      apellidos: (document.querySelector('[name="apellidos"]') as HTMLInputElement).value,
      celular: parseInt((document.querySelector('[name="celular"]') as HTMLInputElement).value),
      correo: (document.querySelector('[name="correo"]') as HTMLInputElement).value,
      userLinkedin: (document.querySelector('[name="userLinkedin"]') as HTMLInputElement).value,
      userGitHub: (document.querySelector('[name="userGitHub"]') as HTMLInputElement).value,
    };
    form.classList.add('closing');
    try {
      const response = await postData('http://localhost:5000/student', student);
      if (response.ok) {
        message!.textContent = 'creado exitosamente';
        setTimeout(() => {
          form.style.display = 'none';
          modal.style.display = 'none';
          form.classList.remove('closing');
          form.reset();
          window.location.reload();
        }, 300);
      } else {
        message!.textContent = 'Hubo un error al crear el estudiante';
      }
    } catch (error) {
      message!.textContent = 'El usuario ya existe';
    }
  });
  

  const getData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos');
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error);
    }
  };
  const fillTable = async () => {
    const data: student[] = await getData('http://localhost:5000/getStudents');
    const table = document.querySelector('.container-table__table') as HTMLTableElement;
  
    for (let i = 0; i < data.length; i++) {
      const row = document.createElement('tr');
      table.appendChild(row);
      const currentStudent = data[i];
      Object.keys(currentStudent).slice(1,9).forEach((propiedad, index) => { 
        const value = currentStudent[propiedad as keyof student];
        const cell = document.createElement('td');
        cell.textContent = value.toString();
        row.appendChild(cell);
      });
      const botonDelete=document.createElement('button') as HTMLButtonElement;
      botonDelete.setAttribute('class','container-table__table__button-delete')
      botonDelete.textContent='delete';
      botonDelete.onclick = () => {
        deleteRow(data[i]._id)
      };
      row.appendChild(botonDelete)
    }
  };
  
  const deleteData=async(url:string)=>{
    const options={
        method:'DELETE',    
    }
    const response= await fetch(url,options)
    if(!response){
        throw new Error('Hubo un error al eliminar el estudiante');    
    }
    return response;
  }

  const deleteRow=(id:number)=>{
     const url:string=`http://localhost:5000/deleteStudent/${id}`
     try{
        deleteData(url)
        window.location.reload();
     }catch(err){
        console.log(err)
     }   
  }
  
fillTable()
