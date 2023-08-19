import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify'

import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    const cleanedInput = input.replace(/[^\d]/g, '');

    if (!cleanedInput.match(/^\d{8}$/)) {
      toast.warning("CEP inválido. Insira um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const response = await api.get(`${cleanedInput}/json`);
      if (response.data.erro) {
        toast.error("CEP não encontrado. Verifique o CEP informado.");
        return;
      }

      setCep(response.data);
      setInput("");
      toast.success("Aqui está seu endereço!");
    } catch (error) {
      toast.error("Ops.. Erro ao buscar cep. Verifique se o CEP é válido.");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1 className="title"><a href="/">Buscar meu CEP</a></h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite aqui o seu CEP"
          size={40}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength="10"
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={22} color="#FFF" />
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