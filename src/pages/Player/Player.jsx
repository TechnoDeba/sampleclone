import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const[apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTBiOTk2Mjg3MmIwOGI3ODUyYzY1MDYxNDg2NDBhOSIsIm5iZiI6MTcyMzk5Nzk2My4zMjE5OTk4LCJzdWIiOiI2NmMyMWYwYmExOTUyNDJjZDE5MjM2YjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S02Nd7G8vo_lArzVvc5lNUlLlwzegAToTz3NIgIxCNY'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      if (res.results && res.results.length > 0) {
        setApiData(res.results[0]);  
      } else {
        setError("No trailer found for this movie.");  
      }
    })

    .catch(err => {
      setError("Failed to fetch trailer."); 
      console.error(err);
    })
    
    .finally(() => {
      setLoading(false);
    });

  },[id])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key || "OErVaC--Bxk"}`} title='trailer' allowFullScreen></iframe>
      <div className="player-info">
      <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : "N/A"}</p>
          <h2>{apiData.name || "No title available"}</h2>
          <p>{apiData.type || "N/A"}</p>
      </div>
    </div>
  )
}

export default Player