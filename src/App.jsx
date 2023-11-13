import { useState , useEffect} from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  const [pacientes,setPacientes] = useState([]);
  const [paciente,setPaciente] = useState({});


  //Almacenando en local storage

  //Primero vamos a obtener lo que haya en local storage:
  useEffect(()=>{
    const obtenerLS = ()=>{
    const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
    console.log(typeof pacientesLS);

    setPacientes(pacientesLS);
    }
    obtenerLS();
  },[])

  useEffect(()=> {
    localStorage.setItem('pacientes',JSON.stringify(pacientes));
  },[pacientes])

  const eliminarPaciente = id=> {
    const pacientesActualizados = pacientes.filter(
      paciente => paciente.id !== id);
      setPacientes(pacientesActualizados)
    }
  
  

  return (
 <div className="container mx-auto mt-5">
<Header 
    
      
    >
  
 </Header>
 <div className="mt-12 md:flex">
 <Formulario
 //Enviamos el prop:
 pacientes = {pacientes}
 setPacientes = {setPacientes}
 paciente = {paciente}
 //Limpiar la memoria para que el formulario borre el paciente temporal
 setPaciente = {setPaciente}
 

 ></Formulario>
 <ListadoPacientes 
 pacientes = {pacientes}
 setPaciente = {setPaciente}
 eliminarPaciente = {eliminarPaciente}
 >
 

 </ListadoPacientes>
 
 </div>
 
      </div>
  )
}

export default App
