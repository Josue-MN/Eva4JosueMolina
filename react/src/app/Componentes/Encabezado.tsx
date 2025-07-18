import React, {useState} from "react"
import FormularioEvento from "./FormularioEvento"
import MostrarEventos from "./MostrarEventos"
import Home from "./Home";

import { Evento } from "../Interfaces/IEventos";
import { initialStateEvento } from "../constantes/InitialStates";

export const Encabezado = () =>{ 
    const [ingresarFormulario, setIngresarFormulario] = useState(false)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [mostrarHome, setMostrarHome] = useState(false)
    const [mostrarHome1, setMostrarHome1] = useState(true)
    
    const [eventos, setEventos] = useState<Evento[]>([])
    const [eventoE, setEventoE] = useState(initialStateEvento)
    


    
    return(
        <>
        <header className="Encabezado">
        <h2 className="TituloEncabezado">Gestor de Eventos Municipales</h2>
        <nav>
        <ul className="AlineacionEncabezado">
            <li>
                <button 
                className="BotonesEncabezado"
                onClick={()=>{setMostrarHome(true);
                    setMostrarFormulario(false);
                    setIngresarFormulario(false);
                    setMostrarHome1(false);
                    }
                }
                >Menu Principal</button>
            </li>
            <li>
                <button className="BotonesEncabezado"
                onClick={()=>{setIngresarFormulario(true);
                    setMostrarFormulario(false);
                    setMostrarHome(false);
                    setMostrarHome1(false);
                    }
                }
                >Menu Ingreso de Eventos</button>
            </li>
            <li>
                <button className="BotonesEncabezado"
                onClick={()=>{setMostrarFormulario(true);
                    setIngresarFormulario(false);
                    setMostrarHome(false);
                    setMostrarHome1(false);
                    }
                }
                >Menu Vista de Eventos</button>
            </li>
        </ul>
        </nav>
        </header>
        <div className="ManejoDeDispocicion">
            {ingresarFormulario && <FormularioEvento/>}
            {mostrarFormulario && <MostrarEventos eventos={eventos} setEventos={setEventos}/>}
            {mostrarHome && <Home/>}
            {mostrarHome1 && <Home/>}
        </div>
        </>
    )
}
export default Encabezado