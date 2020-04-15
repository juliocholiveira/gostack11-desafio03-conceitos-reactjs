import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // Deve ser capaz de criar uma lista com o campo title de todos os repositórios que estão 
    //cadastrados na sua API.
    getAllRepositories();
  }, []);

  async function getAllRepositories(){
    const response = await api.get('/repositories');

    setRepositories(response.data);
  }

  async function handleAddRepository() {
    // Deve ser capaz de adicionar um novo item na sua API através de um botão com o texto Adicionar 
    // e, após a criação, deve ser capaz de exibir o nome dele após o cadastro.
    const response = await api.post('/repositories', {
      title: `Repositório ${Date.now()}`
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // Para cada item da sua lista, deve possuir um botão com o texto Remover que, ao clicar, irá 
    //chamar uma função para remover esse item da lista do seu frontend e da sua API.

    // Remover da api
    const response = await api.delete(`/repositories/${id}`);
    
    console.log(response);

    if (response.status === 204) {
      // Remover item da lista do front-end
      setRepositories(repositories.filter(repository => repository.id != id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => {
          return(
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )})}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
