import axios from "axios"
import react, {useState, useEffect} from "react"

const App = () => {
  const [Notes, setNotes] = useState()
  const [Title, setTitle] = useState()
  const [Text, setText] = useState()

  const getNotes = () => {
    axios.get(`http://192.168.15.27:1337/api/notas`)
    .then((itens) => {
      setNotes(itens.data.data)
      console.log(itens.data)
    })
    .catch((error) => {
      console.error(`erro: ${error}`)
    })
    
  }

  const handleDelete = (id) => {

    axios.delete(`http://192.168.15.27:1337/api/notas/${id}`, {
      

    })
    .then((response) => {
      getNotes()
    })

    .catch((error)=> {
      console.error(`erro: ${error}`)
    })

  }
  
  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post('http://192.168.15.27:1337/api/notas', {
      data: {
        Title: Title,
        Text: Text
      }
      
    })
    .then((response) => {
      console.log(response);
      getNotes()
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  const handleEdit = (id) => {

    axios.put(`http://192.168.15.27:1337/api/notas/${id}`, {
      data: {
        Title: Title,
        Text: Text
      }
      
    })
    .then((response) => {
      console.log(response);
      getNotes()
    })
    .catch((error) => {
      console.log(error);
    })

  }

  useEffect(() => {
    getNotes()
  }, [])
  
  return (
    <div className="App">
      {Notes?.map((item, index) => (
        <div key={index}>
          <h2>{item.attributes.Title}</h2>
          <p>{item.attributes.Text}</p>
          <button onClick={() => handleDelete(item.id)}>Deletar</button>
          <button onClick={() => handleEdit(item.id)}>Editar</button>
        </div>
      ))}


      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input type="text" value={Title || ''} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Text
          <input type="text" value={Text || ''} onChange={(e) => setText(e.target.value)} />
        </label>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}



export default App;
