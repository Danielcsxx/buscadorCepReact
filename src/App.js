import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify'

import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {

    if(input === '') {
      toast.warning("CEP inválido.. tente novamente");
      return;
    } try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
      toast.success("Aqui está seu endereço!")

    } catch {
      toast.error("Ops.. Erro ao buscar cep.");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title"><a href="/">Buscar meu CEP</a></h1>
      <div className="containerInput">

        <input
          type='text'
          placeholder="Digite aqui o seu CEP"
          size="40"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Estado: {cep.uf}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Rua: {cep.logradouro}</span>
        </main>
      )}
    </div>
  );
}
export default App;