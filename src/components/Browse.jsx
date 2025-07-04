
import { useSelector } from 'react-redux';
import { GptSearch } from './GptSearch';
import Header from './Header';
import { MainSection } from './MainSection';
import { SecondarySection } from './SecondarySection';
import { useNowPlayingMovies } from './hooks/useNowPlayingMovies';
import { usePopularMovies } from './hooks/usePopularMovies';
import { useTopRatedMovies } from './hooks/useTopRatedMovies';
import { useUpcomingMovies } from './hooks/useUpcomingMovies';
const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);


  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      {
        showGptSearch ? (<GptSearch />) : (<>

          <MainSection />
          <SecondarySection />
        </>)

      }






    </div>
  );
}

export default Browse;
