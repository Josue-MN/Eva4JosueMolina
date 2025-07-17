import React, {useState, useEffect} from "react";
import { Evento } from "../Interfaces/IEventos";
import { initialStateEvento } from "../constantes/InitialStates";
import FormularioEventoActualizar from "../Componentes/FormularioEventoActualizar";


interface Props{
    traerEventos:(e:Evento,index:number) => void;
    eventos:Evento[];
    setEventos:React.Dispatch<React.SetStateAction<Evento[]>>
}

export const MostrarEventos = (props:Props)=>{
    const miAlmacenamineto = window.localStorage
    const [eventoE, setEventoE] = useState(initialStateEvento)
    const [indexEvento, setindexEvento] = useState(Number)
    const [editarFormulario, setEditarFormulario] = useState(false)

    useEffect(()=>{
        const listadoSTREventos = miAlmacenamineto.getItem("eventos")
        if(listadoSTREventos != null){
            let listado = JSON.parse(listadoSTREventos)
            props.setEventos(listado)
    }

        

    },[])

    const queModificar = (evento:Evento,index:number)=>{
        setEventoE(evento);
        setindexEvento(index);
    }

    const queEliminar = (index:number)=>{
        const nuevoslistadoEventos = [...props.eventos]
        nuevoslistadoEventos.splice(index,1)
        props.setEventos(nuevoslistadoEventos)
        miAlmacenamineto.setItem("eventos",JSON.stringify(nuevoslistadoEventos))
    }

    return(
        <>
        <div className="FondoFormularioEvento" id="MostrarEventos">
        <h1>Tabla de actualizacion de datos</h1>
        <br></br>
        <table>
            <thead>
                <tr>
                    <th>Nombre Evento</th>
                    <th>Numero Evento</th>
                    <th>Tipo de Evento</th>
                    <th>Descripcion Evento</th>
                    <th>Fecha Inicio Evento</th>
                    <th>Fecha Termino Evento</th>
                    <th>Duracion Evento (HRS)</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {props.eventos.map((e,index)=>{
                    return(
                        <tr>
                            <td>{e.nombreEvento}</td>
                            <td>{e.numeroEvento}</td>
                            <td>{e.tipoEvento}</td>
                            <td>{e.descripcionEvento}</td>
                            <td>{e.fechaIEvento}</td>
                            <td>{e.fechaTEvento}</td>
                            <td>{e.duracionEvento}</td>
                            <td>
                                <button
                                className="BotonesEncabezado"
                                onClick={()=>{if(confirm("¿Estas seguro que deseas modificar este evento?")){
                                    queModificar(e,index)
                                    setEditarFormulario(true)
                                    }
                                }}
                                >Editar</button>
                                <button
                                className="BotonesEncabezado"
                                onClick={()=>{if(confirm("¿Estas seguro que deseas eliminar este evento?")){
                                    queEliminar(index)
                                    }
                                }}
                                >Eliminar</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
            <div>
            {editarFormulario && <FormularioEventoActualizar eventos={props.eventos} setEventos={props.setEventos} eventoE={eventoE} indexEvento={indexEvento} cerrarFormulario={() => setEditarFormulario(false)}/>}
            </div>
        </div>
        </>
    )

}

export default MostrarEventos