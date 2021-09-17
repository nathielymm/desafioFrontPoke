import api from '../../Service/api.js';
import React, { useEffect, useState } from 'react';
export function Image (props) {
  const [pokeImage, setPokeImage] = useState('');

  useEffect(() => {
    console.log(props.name);
    api.get('/pokemon/'+props.name).then(res => {
      setPokeImage(res.data.sprites.front_default);
    }).catch(err => {
      console.log(err);
    })
  });

  if (!pokeImage) {
    return null;
  }

  return (
   <img src={pokeImage} alt={props.name}/> 
  );
};


