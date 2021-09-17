import api from '../../Service/api.js';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Image } from '../image/Image';
import './evolution.css';

export function Evolution (props) {
  const [pokeEvolution, setPokeEvolution] = useState([]);
  const name = useParams();
  console.log(name);
  let concEvolves = [];
   const montarArvore = useCallback(chain => {
    const evolve = {
      name: chain.species.name,
      level: 0,
    }
    if (chain.evolution_details.length){
      evolve.level = chain.evolution_details[0].min_level;
    }
    concEvolves =[...concEvolves, evolve];
    if(chain.evolves_to){
      chain.evolves_to.forEach(evolves => {
         concEvolves = montarArvore(evolves);
      });
    }
    return concEvolves;
  });

  useEffect(() => {
    api.get(`/pokemon-species/${props.name}`).then(res => {
      api.get(res.data.evolution_chain.url.split('v2')[1]).then(resEvolution => {
        concEvolves = montarArvore(resEvolution.data.chain);
        setPokeEvolution(concEvolves);
      });
    });
    console.log({pokeEvolution});
  });

  return (
    <div className=" card cardsContainerEvolution">
        {pokeEvolution.map(poke => (
          <div className="card cardEvolution t">
            <span key={poke.name} className="capitalized content">{poke.name}</span>
            <div className="circleEvolution"><Image name={poke.name} /> </div>
            <span className="content">Level: {poke.level}</span>
          </div>
          ))}       
    </div>
  );
};


