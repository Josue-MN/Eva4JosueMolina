import {collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc} from "firebase/firestore"
import { db } from "./Conexion"
import { Evento } from "../Interfaces/IEventos"

export const registrarEventosFB = async(e:Evento) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db,"Eventos"),{
        nombreEvento: e.nombreEvento,
        numeroEvento: e.numeroEvento,
        tipoEvento: e.tipoEvento,
        descripcionEvento: e.descripcionEvento,
        fechaIEvento: e.fechaIEvento,
        fechaTEvento: e.fechaTEvento,
        duracionEvento: e.duracionEvento
    });
    //console.log("Document written with ID: ", docRef.id)
    return docRef.id

}

export const obtenerEventosFB = async() => {
    let listadoE:Evento[] = []
    const consulta = await getDocs(collection(db,"Eventos"));
    consulta.forEach((doc)=>{
        // doc.data() is never undefined for query doc snapshots
        const evento:Evento = {
            idEvento: doc.id,
            nombreEvento: doc.data().nombreEvento,
            numeroEvento: doc.data().numeroEvento,
            tipoEvento: doc.data().tipoEvento,
            descripcionEvento: doc.data().descripcionEvento,
            fechaIEvento: doc.data().fechaIEvento,
            fechaTEvento: doc.data().fechaTEvento,
            duracionEvento: doc.data().duracionEvento
        }
        listadoE.push(evento)
        //console.log(doc.id, " => ", doc.data())
    })
    return listadoE
}

export const actualizarEventoFB = async(e:Evento,idEvento:string) => {
    const eventoDoc = doc(db, "Eventos", idEvento);
    const consulta = await getDoc(eventoDoc);
    if(consulta.exists()){
        await updateDoc(eventoDoc, {
        nombreEvento: e.nombreEvento,
        numeroEvento: e.numeroEvento,
        tipoEvento: e.tipoEvento,
        descripcionEvento: e.descripcionEvento,
        fechaIEvento: e.fechaIEvento,
        fechaTEvento: e.fechaTEvento,
        duracionEvento: e.duracionEvento
        })
        alert("Evento Actualizado con exito")
        return 1
        //console.log("HOLAA: "+idEvento)
    }
    else{
        alert("Error, el evento ya existe o fue eliminado.")
        return 0
        //console.log("CHAOO "+idEvento)
    } 
    
}

export const eliminarEventosFB = async(idEvento:string) => {
    const eventoDoc = doc(db,"Eventos",idEvento)
    const consulta = await getDoc(eventoDoc);
    if(consulta.exists()){
        await deleteDoc(eventoDoc)
        alert("Evento Eliminado con exito")
        return 1
    }
    else{
        alert("Error, el evento ya existe o fue eliminado.")
        return 0
    }
}