import api from '../../Service/api.js';
import React, { useEffect, useState } from 'react';
import { Types } from '../../components/types/Types';
import { Image } from '../../components/image/Image';
import { Evolution } from '../../components/Evolution/Evolution';
import { useParams } from 'react-router';
import './details.css';

const Details = () => {
  //export function Details () {
  const [Pokemon, setPokemon] = useState(null);
  const param = useParams();
  console.log({ param });
  useEffect(() => {
    api.get('/pokemon/' + param.name).then(res => {
      setPokemon(res.data);
    }).catch(err => {
      console.log(err);
    })
  });

  if (!Pokemon) {
    return null;
  }

  return (
    <div>
      <h1 className="cabecalho">Evolução</h1>
      <div className="container containerList">
        <div className="container containerPrincipal ">
          <div className="container conteudo">
          <div className="card cardInfo">
            <div className="circle"><Image name={Pokemon.name} /></div>
            <h1 key={Pokemon.name} className="content capitalized ">{Pokemon.name} </h1>
            <b>Tipo(s):</b><Types name={Pokemon.name} />
          </div>
          
            <Evolution name={Pokemon.name} />
          </div>
          
          
        </div>
      </div>
    </div>
      );
};

export default Details;

