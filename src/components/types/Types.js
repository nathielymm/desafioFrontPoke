import api from '../../Service/api.js';
import React, { useEffect, useState } from 'react';

export function Types(props) {
  const [pokeTypes, setPokeTypes] = useState([]);

  useEffect(() => {
    console.log(props.name);
    api.get('/pokemon/' + props.name).then(res => {
      setPokeTypes(res.data.types);
    }).catch(err => {
      console.log(err);
    })
  });

  if (!pokeTypes) {
    return null;
  }

  return (
    <div>
      {pokeTypes.map(type => (
        <p className="capitalized" key={type.type.name}>{type.type.name} </p>
      ))}
    </div>
  );
};


