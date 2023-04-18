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
    tipoIdentificacion:number,
    identificacion:number,
    nombres:string,
    apellidos:string,
    celular:number,
    correo:string,
    userLinkedin:string,
    userGitHub:string
}


const postData=async(url:string,data:{})=>{
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
    }
    const response= await fetch(url,options)
    if (!response.ok) { // Si la respuesta indica que hubo un error, lanzar excepción
      if(response.status===409){
        throw new Error('El estudiante ya existe');
      }
      
    }
    
    return response
}


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.querySelector('.form__message');
    const student = {
      tipoIdentificacion: parseInt((document.querySelector('[name="tipoIdentificacion"]') as HTMLSelectElement).value),
      numeroIdentificacion: parseInt((document.querySelector('[name="identificacion"]') as HTMLInputElement).value),
      nombres: (document.querySelector('[name="nombres"]') as HTMLInputElement).value,
      apellidos: (document.querySelector('[name="apellidos"]') as HTMLInputElement).value,
      celular: parseInt((document.querySelector('[name="celular"]') as HTMLInputElement).value),
      correo: (document.querySelector('[name="correo"]') as HTMLInputElement).value,
      linkedin: (document.querySelector('[name="userLinkedin"]') as HTMLInputElement).value,
      github: (document.querySelector('[name="userGitHub"]') as HTMLInputElement).value,
    };
    
    form.classList.add('closing');
    try {
      const response = await postData('https://apiestudiantes.maosystems.dev/estudiantes', student);
      
      if (response.ok) {
        message!.textContent = 'creado exitosamente';
        setTimeout(() => {
          form.style.display = 'none';
          modal.style.display = 'none';
          form.classList.remove('closing');
          form.reset();
          window.location.reload();
        }, 300);
      } 
    } catch (error) {
      message!.textContent = `${error}`;
    }
  });
  

  const getData = async (url: string) => {
    const options={
      headers: {
        method:'GET',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      }

    }
    try {
      const response = await fetch(url,options);
     
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
    const data: student[] = await getData('https://apiestudiantes.maosystems.dev/estudiantes');
    const table = document.querySelector('.container-table__table') as HTMLTableElement;
    console.log(data);
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
        /* deleteRow(data[i]._id) */
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

const editEstudiante=()=>{
  const botonEdit= document.querySelector('.button-editEstudiante') as HTMLButtonElement;
  botonEdit.onclick=()=>{
    
  }
}
