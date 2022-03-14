import './App.css';
import React from "react";
import axios from "axios";
function App() {
  const [respTxt, setRespTxt] = React.useState(null);
  const [userSearch, setUserSearch] = React.useState(null);
  const [repositories, setRepositories] = React.useState([]);

  const onInputChange = (event) => {
    setRespTxt(null)
    setRepositories([]);
    setUserSearch(event.target.value);
   }
    function searchRepository() {
      setRepositories([]);
    axios
      .get("https://api.github.com/users/"+userSearch+"/repos")
      .then((response) => {
        setRepositories(response.data);
        if(repositories === 0){
          setRespTxt("Nenhum repositório encontrado.")
        }
      })
      .catch((error) => {
        setRespTxt("Usuário não encontrado!")
        setRepositories([])
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Buscador de repositórios por usuario: <b>{userSearch ? '@'+userSearch : ''}</b>
        </p>
        <form className="formSearch">
          <label>
            <input type="text" name="repositoryName" onChange={onInputChange} />
          </label>
          <button type="button" onClick={searchRepository}>Buscar</button>
        </form>
        <ul className="ListRepository">{ repositories.map( (value) => 
        <li key={value.name.toString()}>
          <h2><a href={value.html_url} target="_blank" rel="noreferrer">{ value.name }</a></h2>
          <span>&#9733;	{value.stargazers_count}</span>
          </li>
        ) }
        <p>{respTxt}</p>
        </ul>
      </header>
    </div>
  );
}

export default App;
