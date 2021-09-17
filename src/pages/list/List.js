import api from '../../Service/api.js';
import React, { useEffect, useState } from 'react';
import { Image } from '../../components/image/Image';
import './List.css';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [listPokemons, setListPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const stringSearch = search && search.toLowerCase();

  const filter = !listPokemons || !stringSearch ? listPokemons :
    listPokemons.filter(({ name }) =>
      name.toLowerCase().includes(stringSearch)
    );

  useEffect(() => {
    api.get('/pokemon?limit=151').then(res => {
      setListPokemons(res.data.results);
    }).catch(err => {
      console.log(err);
    })
  });

  if (!listPokemons) {
    return null;
  }

  return (
    <div>
      <h1 className="cabecalho">Pokémons</h1>
      <div className="container containerList">
        <div className="searchContainer">
          <b>
            Nome:
          </b><input type="search" placeholder="Digite o nome do pokémon" value={search} onChange={(ev) => setSearch(ev.target.value)} />
        </div>
        <div className="cardsContainer t">
          {filter.map(pokemon => (
            
            <div className="card cardList">
              <Link to = {`${pokemon.name}`}  style={{ textDecoration: 'none', color: '#2b061e' }}>
                <h4 key={pokemon.name} className="content capitalized ">{pokemon.name} </h4>
                <div className="circle"><Image name={pokemon.name} />  </div>
              </Link>  
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
