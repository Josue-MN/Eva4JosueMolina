import React, {useEffect, useState} from "react";
import { Evento } from "../Interfaces/IEventos";
import { initialStateEvento } from "../constantes/InitialStates";

import { registrarEventosFB, obtenerEventosFB } from "../FireBase/Promesas";

interface Props{
    setEventos:React.Dispatch<React.SetStateAction<Evento[]>>
}

export const FormularioEvento = ({setEventos}:Props) =>{
    const miAlmacenamineto = window.localStorage
    const [evento, setEvento] = useState(initialStateEvento)
    const [eNombreE, setENombreE] = useState("")
    const [eNumeroE, setENumeroE] = useState("")
    const [eTipoE, setETipoE] = useState("")
    const [eDescripcionE, setEDescripcionE] = useState("")
    const [eFechaInicioE, setEFechaInicioE] = useState("")
    const [eFechaTerminoE, setEFechaTerminoE] = useState("")
    const [eDuracionE, setEDuracionE] = useState("")
    const [errorRegistrar, setErrorRegistrar] = useState("")

    useEffect(()=>{
        obtenerEventosFB().then((listadoE) => {
            setEventos(listadoE)
        }).catch((errores) => {
            alert("No se puede registrar el evento")
            console.log(errores)
        })
    },[])

    
    const [nombreC, setNombreC] = useState(0)
    const [numeroC, setNumeroC] = useState(0)
    const [tipoC, setTipoC] = useState(0)
    const [descripcionC, setDescripcionC] = useState(0)
    const [fechaIC, setFechaIC] = useState(0)
    const [fechaTC, setFechaTC] = useState(0)
    const [duracionC, setDuracionC] = useState(0)
    const handleEvento = (name:string,value:string) =>{
        
        const NuevoEvento = {
            ...evento,[name]:value
        }
        setEvento(NuevoEvento)
        
        const SoloLetras = /^[a-zA-ZñÑ]*$/
        const SoloLetrasConEspacioYNumeros = /^[a-zA-ZñÑ0-9\s]*$/
        const CCEA = "Comuniquese con el administrador"
        const FechaActual = new Date().toISOString().split('T')[0]
        
        //Nombre Evento
        if(NuevoEvento.nombreEvento.length > 3){
            setENombreE("")
            if(SoloLetras.test(NuevoEvento.nombreEvento) == false){
                setENombreE("El nombre no puede llevar numeros, caracteres especiales o espacios")
                setNombreC(0)
            }
            else if(SoloLetras.test(NuevoEvento.nombreEvento) == true){
                setENombreE("")
                setNombreC(1)
            }
            else{
                setENumeroE(CCEA)
                setNombreC(0)
            }
        }
        else{
            setENombreE("Debe ingresar al menos un nombre con mas de 3 letras")
        }
        //Numero Evento
        if(Number(NuevoEvento.numeroEvento) <= 0){
            setENumeroE("No puede ingresar un numero menor a 0, numeros negativos o dejar el campo vacio")
            setNumeroC(0)
        }
        else if(Number(NuevoEvento.numeroEvento) <= 999){
            setENumeroE("")
            setNumeroC(1)
        }
        else if(Number(NuevoEvento.numeroEvento) >= 999){
            setENumeroE("No puede ingresar un numero de evento mayor a 999")
            setNumeroC(0)
        }
        else{
            setENumeroE(CCEA)
            setNumeroC(0)
        }
        //Tipo Evento
        if(NuevoEvento.tipoEvento == ""){
            setETipoE("Debe elegir al menos un tipo de evento.")
            setTipoC(0)
        }
        else{
            setETipoE("")
            setTipoC(1)
        }
        //Descripcion Evento
        if(NuevoEvento.descripcionEvento.length <= 50){
            setEDescripcionE("Debes ingresar al menos una descripcion de 30 letras")
            setDescripcionC(0)
        }
        else if(NuevoEvento.descripcionEvento.length >= 51){
            setEDescripcionE("")
            if(SoloLetrasConEspacioYNumeros.test(NuevoEvento.descripcionEvento) == false){
                setEDescripcionE("La descripcion no puede llevar caracteres especiales")
            setDescripcionC(0)
            }
            else if(SoloLetrasConEspacioYNumeros.test(NuevoEvento.descripcionEvento) == true){
                setENombreE("")
            setDescripcionC(1)
            }
            else{
                setENumeroE(CCEA)
            }
        }
        //Fecha Inicial Evento y Final
        if(NuevoEvento.fechaIEvento == ""){
            setEFechaInicioE("No puede dejar este campo vacio")
            setFechaIC(0)
        }
        else{
            setEFechaInicioE("")
            if(NuevoEvento.fechaIEvento < FechaActual){
                setEFechaInicioE("No puede poner una fecha menor a la actual.")
                setFechaIC(0)
            }
            else{
                if(NuevoEvento.fechaTEvento == ""){
                    setEFechaTerminoE("No puede dejar este campo vacio")
                    setFechaTC(0)
                }
                else{
                    setEFechaTerminoE("")
                    const fecha = NuevoEvento.fechaIEvento
                    if(NuevoEvento.fechaIEvento > NuevoEvento.fechaTEvento){   
                        setEFechaTerminoE("La fecha de termino no puede ser menor a la de inicio "+fecha)
                        setFechaIC(0)
                        setFechaTC(0)
                    }
                    else{
                        setEFechaTerminoE("")
                        if(NuevoEvento.fechaTEvento > "2030-12-31"){
                            setEFechaTerminoE("El evento no puede durar mas de 5 años, cambialo.")
                            setFechaTC(0)
                        }
                        else if(NuevoEvento.fechaTEvento <= "2030-12-31"){
                            setEFechaTerminoE("")
                            setFechaIC(1)
                            setFechaTC(1)
                        }
                        else{
                            setEFechaTerminoE(CCEA)
                        }
                    }
                }
            }
        }
        //Duracion Evento
        if(Number(NuevoEvento.duracionEvento) <= 0){
            setEDuracionE("No puede ingresar un numero menor a 0, numeros negativos, o dejar vacio el dato")
            setDuracionC(0)
        }
        else if(Number(NuevoEvento.duracionEvento) <= 24){
            setEDuracionE("")
            setDuracionC(1)
        }
        else if(Number(NuevoEvento.duracionEvento) >= 25){
            setEDuracionE("No puede ingresar una hora de duracion mayor a 24 HRS")
            setDuracionC(0)
        }
        else{
            setEDuracionE(CCEA)
        }
    }

    const handleRegistrar = ()=>{
        if(nombreC == 1 && numeroC == 1 && tipoC == 1 && descripcionC == 1 && fechaIC == 1 && fechaTC == 1 && duracionC == 1){
        //if(true){
            registrarEventosFB(evento).then((id)=>{
                const eventoConID: Evento = {...evento,idEvento: id}
                
                alert("Evento Registrado")
            
                setEvento(initialStateEvento)
                setNombreC(0),setNumeroC(0),setTipoC(0),setDescripcionC(0),setFechaIC(0),setFechaTC(0),setDuracionC(0)
                setErrorRegistrar("")
            }).catch((errores)=>{
                alert("No se pudo registrar")
                console.log(errores)
            })
            
        }
        else{
            setErrorRegistrar("Asegurese de completar todos los campos.")
        }   
    }

    

    return(
        <>
        <div className="FondoFormulario">
        <h1>Formulario de registro de eventos</h1>
        <br></br>
        <label>Nombre: </label>
        <input
        name="nombreEvento"
        type="text"
        placeholder="Ingrese el Nombre del Evento"
        value={evento.nombreEvento}
        onChange={(e)=>handleEvento(e.currentTarget.name,e.currentTarget.value)}
        ></input>
        <br></br>
        <span>{eNombreE}</span>
        <br></br>
        <br></br>
        <label>Numero: </label>
        <input
        name="numeroEvento"
        type="number"
        placeholder="Ingrese el Numero del Evento"
        value={evento.numeroEvento || ""}
        onChange={(e)=>handleEvento(e.currentTarget.name,e.currentTarget.value)}
        ></input>
        <br></br>
        <span>{eNumeroE}</span>
        <br></br>
        <br></br>
        <label>Tipo: </label>
        <select
        name="tipoEvento"
        value={evento.tipoEvento}
        onChange={(e)=>handleEvento(e.currentTarget.name,e.currentTarget.value)}
        >
            <option value="">Elige la categoria del evento</option>
            <option value="Recaudacion">Evento de Recaudacion</option>
            <option value="Social">Evento Social</option>
            <option value="Empresa">Evento Empresarial</option>
            <option value="Reunion">Evento de Reunion</option>
            <option value="Extracurricular">Evento Extracurricular</option>
        </select>
        <br></br>
        <span>{eTipoE}</span>
        <br></br>
        <br></br>
        <label>Descripcion: </label>
        <br></br>
        <textarea 
        name="descripcionEvento"
        value={evento.descripcionEvento}
        onChange={(e)=>handleEvento(e.currentTarget.name,e.currentTarget.value)}
        className="Descripcion"
        ></textarea>
        <br></br>
        <span>{eDescripcionE}</span>
        <br></br>
        <br></br>
        <label>Fecha Inicio: </label>
        <input
        name="fechaIEvento"
        type="date"
        value={evento.fechaIEvento}
        onChange={(e)=>handleEvento(e.currentTarget.name,e.currentTarget.value)}
        ></input>
        <br></br>
        <span>{eFechaInicioE}</span>
        <br></br>
        <br></br>
        <label>Fecha Termino: </label>
        <input
        name="fechaTEvento"
        type="date"
        lang="es"
        value={evento.fechaTEvento}
        onChange={(e)=>handleEvento(e.currentTarget.name,e.currentTarget.value)}
        ></input>
        <br></br>
        <span>{eFechaTerminoE}</span>
        <br></br>
        <br></br>
        <label>Duracion (HRS): </label>
        <input
        name="duracionEvento"
        type="number"
        placeholder="Ingrese las horas que duro el evento"
        value={evento.duracionEvento || ""}
        onChange={(e)=>handleEvento(e.currentTarget.name,e.currentTarget.value)}
        ></input>
        <br></br>
        <span>{eDuracionE}</span>
        <br></br>
        <br></br>

        <button
        className="BotonesEncabezado"
        onClick={() => {handleRegistrar()}}
        >Registrar</button>
        <br></br>
        <span>{errorRegistrar}</span>
        </div>
        </>
    );
}

export default FormularioEvento