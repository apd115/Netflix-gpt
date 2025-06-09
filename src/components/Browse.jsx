import React from 'react';
import Header from './Header';
import { useEffect } from 'react';
import { options } from '../utils/constants';


const Browse = () => {

  const movies = async ()=>{
     const data = await fetch("https://api.themoviedb.org/3/movie/changes?page=1", options);

     const json = await data.json();
     console.log(json.results);
  }

  useEffect(()=>{
        movies();
  },[]);
  return (
    <div>
      <Header/>
      BROWSE
      
    </div>
  );
}

export default Browse;