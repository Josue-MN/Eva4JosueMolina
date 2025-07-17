import {collection, addDoc, getDocs} from "firebase/firestore"
import { db } from "./Conexion"
import { Evento } from "../Interfaces/IEventos"

export const registrarEventosFB = async(e:Evento) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db,"Eventos"),e);
    console.log("Document written with ID: ", docRef.id)

}

export const obtenerEventosFB = async() => {
    let listadoE:Evento[] = []
    const consulta = await getDocs(collection(db,"Eventos"));
    consulta.forEach((doc)=>{
        // doc.data() is never undefined for query doc snapshots
        let Evento:Evento = {
            nombreEvento: doc.data().nombreEvento,
            numeroEvento: doc.data().numeroEvento,
            tipoEvento: doc.data().tipoEvento,
            descripcionEvento: doc.data().descripcionEvento,
            fechaIEvento: doc.data().fechaIEvento,
            fechaTEvento: doc.data().fechaTEvento,
            duracionEvento: doc.data().duracionEvento
        }
        listadoE.push(Evento)
        console.log(doc.id, " => ", doc.data())
    })
    return listadoE
}