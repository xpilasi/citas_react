
//Formulario
import React from 'react'
import { useState ,useEffect} from 'react'
import Error from './Error';


const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {

    const [nombre,setNombre] = useState('');
    const [propietario,setPropietario] = useState('');
    const [email,setEmail] = useState('');
    const [fecha,setFecha] = useState('');
    const [sintomas,setSintomas] = useState('');
    const [error,setError] = useState(false);

    useEffect(()=>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    },[paciente])

   
    const generarId = ()=>{
        const key1 = Math.random().toString(36).substring(2)
        const key2 = Date.now().toString(36)
        const fullKey = key1+key2
        
        return fullKey
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        //Validación de formulario

        if([nombre, propietario,email,fecha,sintomas].includes('')){
            console.log('Hay al menos un campo vacío')
            setError(true)
            return;
        }
        setError(false)
        const objetoPaciente = {
            nombre, 
            propietario,
            email,
            fecha,
            sintomas,
            
        }

        if(paciente.id) {
            //Editando el registro
               
               objetoPaciente.id = paciente.id;
            
               const pacientesActualizados = pacientes.map(pacienteState => 
                                                pacienteState.id === paciente.id 
                                                ? objetoPaciente
                                                : pacienteState )
                setPacientes(pacientesActualizados);
                setPaciente({});
        }else{

            //nuevo registro
            //Se hace una copia del array con el spread operator
            objetoPaciente.id = generarId();
            setPacientes([...pacientes,objetoPaciente])
        }

        

        //Reiniciar formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        

        
    }

  return (
    <div className='md:w-1/2 lg:w-2/5'>
        <h2 className="font-black text-3xl text-center">
            Seguimiento pacientes</h2>
        <p className='text-xl mt-5 mb-10 text-center'>
            Añade pacientes y {" "}
            <span className="text-indigo-600 font-bold ">Adminístralos</span>
        </p>
        <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-lg py-10 px-5 mb-10"action="">
            
            {error && <Error mensaje ='Todos los campos son obligatorios'/>}

            <div className='mb-5'>
                <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>
                    Nombre BESTIA
                </label>
                <input 
                id='mascota'
                    type="text" 
                    placeholder='Nombre de la BESTIA'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="propietario" className='block text-gray-700 uppercase font-bold'>
                    Nombre Propietario
                </label>
                <input 
                id='propietario'
                    type="text" 
                    placeholder='Nombre del propietario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={propietario}
                    onChange={(e)=>setPropietario(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="email" className='block text-gray-700 uppercase font-bold'>
                    Email
                </label>
                <input 
                id='email'
                    type="email" 
                    placeholder='Email contacto propietario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>
                    Alta
                </label>
                <input 
                id='alta'
                    type="date" 
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={fecha}
                    onChange={(e)=>setFecha(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="sintomas" className='block text-gray-700 uppercase font-bold'>
                    Síntomas
                </label>
                <textarea 
                id='sintomas'
                    placeholder='Describe los síntomas'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={sintomas}
                    onChange={(e)=>setSintomas(e.target.value)}
                />

                <input 
                type="submit"
                className={paciente.id 
                    ? "bg-pink-500 w-full p-3 mt-5 text-white uppercase font-bold hover:bg-pink-700 cursor-pointer transition-all rounded"
                    : "bg-indigo-600 w-full p-3 mt-5 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded"
                
                }
                value={paciente.id ? "Editar paciente" : "Agregar paciente"}
                />
            </div>
        </form>
    </div>
  )
}

export default Formulario