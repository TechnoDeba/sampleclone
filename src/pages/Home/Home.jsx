import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/khakee.jpg'
import hero_title from '../../assets/movie_title.png'
import play_icon from '../../assets/Play_icon.png'
import info_icon from '../../assets/Info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
const Home = () => {

  const navigate = useNavigate();

  const trailerClick =() =>{
    navigate('/player/282394');
  };

  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />
          <p>Gripping crime thriller that chronicles the intense cat-and-mouse chase between a morally upright IPS officer and a powerful, fearsome gangster in West Bengal, exposing the dark nexus of crime, politics, and corruption in the region. </p>
          <div className="hero-btns">
            <button className='btn' onClick={trailerClick}><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
          </div>
          <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
      <TitleCards title={"Trending"} category={"now_playing"} screen={"tv"} language={"bn"}/>
      <TitleCards title={"Blockbuster Movies"} category={"top_rated"} language={"hi"}/>
      <TitleCards title={"Only On Netflix"} category={"popular"} language={"bn"}/>
      <TitleCards title={"Upcoming"} category={"upcoming"} language={"ml"}/>
      <TitleCards title={"Top Picks For You"} category={"now_playing"} language={"kn"}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home