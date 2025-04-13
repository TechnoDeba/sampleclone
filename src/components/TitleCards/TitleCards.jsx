import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title,category,language,screen}) => {

  const [apiData,setApiData] =useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTBiOTk2Mjg3MmIwOGI3ODUyYzY1MDYxNDg2NDBhOSIsIm5iZiI6MTcyMzk5Nzk2My4zMjE5OTk4LCJzdWIiOiI2NmMyMWYwYmExOTUyNDJjZDE5MjM2YjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S02Nd7G8vo_lArzVvc5lNUlLlwzegAToTz3NIgIxCNY'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/${screen?screen:"movie"}?language=en-US&sort_by=popularity.desc&page=1&with_original_language=${language?language:"en"}&region=IN`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  })

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" >
        {apiData.map((card,index)=> {
         return <Link to={`/player/${card.id}`} className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
         </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards