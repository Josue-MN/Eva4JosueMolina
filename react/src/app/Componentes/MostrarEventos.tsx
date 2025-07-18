import React, {useState, useEffect} from "react";
import { Evento } from "../Interfaces/IEventos";
import { initialStateEvento } from "../constantes/InitialStates";
import FormularioEventoActualizar from "../Componentes/FormularioEventoActualizar";
import { obtenerEventosFB, eliminarEventosFB } from "../FireBase/Promesas";


interface Props{
    eventos:Evento[];
    setEventos:React.Dispatch<React.SetStateAction<Evento[]>>
}

export const MostrarEventos = (props:Props)=>{
    const [eventoE, setEventoE] = useState(initialStateEvento)
    const [editarFormulario, setEditarFormulario] = useState(false)

    useEffect(()=>{
        obtenerEventosFB().then((listadoE) => {
            props.setEventos(listadoE)
        }).catch((errores) => {
            alert("Eventos no cargan")
            console.log(errores)
        })
    },[])

    const queModificar = (evento:Evento)=>{
        setEventoE(evento);
        setEditarFormulario(true);
    }

    const queEliminar = (idEvento:string)=>{
        eliminarEventosFB(idEvento)
        obtenerEventosFB().then(props.setEventos);
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
                                    queModificar(e)
                                    setEditarFormulario(true)
                                    }
                                }}
                                >Editar</button>
                                <button
                                className="BotonesEncabezado"
                                onClick={()=>{if(confirm("¿Estas seguro que deseas eliminar este evento?")){
                                    queEliminar(e.idEvento)
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
            {editarFormulario && <FormularioEventoActualizar eventos={props.eventos} setEventos={props.setEventos} eventoE={eventoE} cerrarFormulario={() => setEditarFormulario(false)}/>}
            </div>
        </div>
        </>
    )

}

export default MostrarEventos