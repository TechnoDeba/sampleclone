import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navRef = useRef();
  const [searchTerm,setSearchTerm] = useState('');
  const [lastSearch,setLastSearch] = useState('');

const handleSearch = ()=>{
  if(!searchTerm.trim())
    return;
  console.log('Search for:',searchTerm);
  setLastSearch(searchTerm);
  setSearchTerm('');
};
const navigate = useNavigate();
useEffect(() => {
  const fetchMovieId = async () => {
    if (!lastSearch) return;

    const apiKey = '7a0b9962872b08b7852c6506148640a9';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(lastSearch)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const movieId = data.results[0].id;

        console.log(`Movie "${lastSearch}" found with ID:`, movieId);
      
          navigate(`/player/${movieId}`);
        // Use movieId as needed
      } else {
        console.log(`No movie found for "${lastSearch}"`);
      }
    } catch (error) {
      console.error('Error fetching movie ID:', error);
    }
  };

  fetchMovieId();
}, [lastSearch]);

const handleKeyDown =(e)=>{
  if(e.key ==='Enter'){
    handleSearch();
  }
};

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY >=80){
        navRef.current.classList.add('nav-dark')
      }
      else {
        navRef.current.classList.remove('nav-dark')
      }
    })
  })
  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search-container">
        <input type="text" class="search-input" placeholder="Search..." value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} onKeyDown={handleKeyDown}/>
        <img src={search_icon} alt="" className='icons' onClick={handleSearch}/>
         </div>
        <p>Children</p>
        <img src={bell_icon} alt="" className='icons'/>
        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p onClick={()=>{logout()}}>Sign Out Of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar