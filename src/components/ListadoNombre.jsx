import React, {useState} from 'react'
import uniqid from 'uniqid'

function ListadoNombre(){

    const [nombre, setNombre] = useState('');
    const [listaNombre, setListaNombres] = useState([]); 
    const [modoEdicion, setModoEdicion] = useState(false); 
    const [id, setId] = useState('');
    const [error, setError] = useState(false);


    const addNombre = (event) => {
        event.preventDefault();
        if(!nombre.trim()){
            setError(true);
            return
        }
        else{
            setError(false)
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
        setListaNombres([...listaNombre, nuevoNombre]);
        setNombre("");
    }
    
    const deleteNombre = (id) => {
        const nuevaLista = listaNombre.filter((elemento) => elemento.id !== id);
        setListaNombres(nuevaLista);
    }

    const editar = (persona) => {
        setModoEdicion(true);
        setNombre(persona.tituloNombre);
        setId(persona.id);
    }

    const editarNombre = (event) => {
        event.preventDefault();
        if(!nombre.trim()){
            setError(true);
            return
        }
        else{
            setError(false)
        }
        const listaEditada = listaNombre.map( persona => persona.id === id ? {id:persona.id, tituloNombre:nombre} : persona);
        setListaNombres(listaEditada);
        setNombre("");
        setModoEdicion(false);
    }

    return (
        <div>
            <h2>Crud</h2>
            <div className="row">
                <div className="col">
                    Listado de Nombres
                    <ul className="list-group">
                        {
                            listaNombre.map((persona) => {
                                return  <li className="list-group-item" key={persona.id}>
                                            {persona.tituloNombre}
                                            <button onClick={()=>{deleteNombre(persona.id)}} className="btn btn-danger">Eliminar</button>
                                            <button onClick={()=>{editar(persona)}} className="btn btn-success">Editar</button>
                                        </li>
                            })
                        }
                    </ul>
                </div>
                <div className="col">
                    Agregar nombres
                    <form onSubmit={modoEdicion ? (e) => {editarNombre(e)} : (e) => {addNombre(e)}} className="form-group">
                        <p><input value={nombre} onChange={(event) => {setNombre(event.target.value)}} className="form-control mb-3 mt-3" type="text" placeholder="Nombre"/></p>
                        <p className="text-danger">{error ? 'Valores no validos' : ''}</p>
                        <p> <input type="submit" value={modoEdicion ? 'Editar Nombre' : 'Agregar Nombre'}/> </p>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ListadoNombre;