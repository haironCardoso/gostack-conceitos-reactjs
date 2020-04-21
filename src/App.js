import React, {useState,useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([])
  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setRepositories(response.data)
    })
  },[])
  
  async function handleAddRepository() {
    const repository = {
      id : '',
      url: 'https://github.com/eu',
      title: 'Repo adicionado',
      techs: ['Node','react']

    }
    const repo = await api.post('/repositories',repository)
    if (repo.status ===200){
      setRepositories([...repositories,repo.data])
      
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const reposUpdated = repositories.filter(repo => repo.id !== id)
    setRepositories(reposUpdated)
    

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=> (
          <li key={repository.id}>
              <h3>{repository.title}</h3>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>

          </li>
        ))}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
