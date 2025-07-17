import React, {useState, useEffect} from "react";
import { Evento } from "../Interfaces/IEventos";
import { initialStateEvento } from "../constantes/InitialStates";
import { FormularioEvento } from "../Componentes/FormularioEvento";
import { FormularioEventoActualizar } from "../Componentes/FormularioEventoActualizar";
import MostrarEventos from "../Componentes/MostrarEventos";

const GestionEventos = ()=>{
    const miAlmacenamineto = window.localStorage
    const [eventos, setEventos] = useState<Evento[]>([])
    const [eventoE, setEventoE] = useState(initialStateEvento)
    const [indexEvento, setindexEvento] = useState(Number)
    const [editarFormulario, setEditarFormulario] = useState(false)

    const traerEventos = (e:Evento,index:number)=>{
        setEventoE(e)
        setindexEvento(index)
    }

    useEffect(()=>{
        let listadoSTREventos = miAlmacenamineto.getItem("eventos")
        if(listadoSTREventos != null){
            let listado = JSON.parse(listadoSTREventos)
            setEventos(listado)
        }
    },[])

    return(
        <>
        <FormularioEvento eventos={eventos} setEventos={setEventos}/>
        <MostrarEventos eventos={eventos} setEventos={setEventos} traerEventos={traerEventos}/>
        <FormularioEventoActualizar eventos={eventos} setEventos={setEventos} eventoE={eventoE} indexEvento={indexEvento} cerrarFormulario={() => setEditarFormulario(false)}/>
        </>
    )
}

export default GestionEventos