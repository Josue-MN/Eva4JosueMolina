import React, {useState, useEffect} from "react";
import { Evento } from "../Interfaces/IEventos";
import { initialStateEvento } from "../constantes/InitialStates";
import { FormularioEvento } from "../Componentes/FormularioEvento";
import { FormularioEventoActualizar } from "../Componentes/FormularioEventoActualizar";
import MostrarEventos from "../Componentes/MostrarEventos";

const GestionEventos = ()=>{
    const [eventos, setEventos] = useState<Evento[]>([])
    const [eventoE, setEventoE] = useState(initialStateEvento)
    const [editarFormulario, setEditarFormulario] = useState(false)


    return(
        <>
        <FormularioEvento setEventos={setEventos}/>
        <MostrarEventos eventos={eventos} setEventos={setEventos}/>
        <FormularioEventoActualizar eventos={eventos} setEventos={setEventos} eventoE={eventoE} cerrarFormulario={() => setEditarFormulario(false)}/>
        </>
    )
}

export default GestionEventos