
import Header from './Header';
import { MainSection } from './MainSection';
import { SecondarySection } from './SecondarySection';
import { useNowPlayingMovies } from './hooks/useNowPlayingMovies';
import { usePopularMovies } from './hooks/usePopularMovies';
import { useTopRatedMovies } from './hooks/useTopRatedMovies';
import { useUpcomingMovies } from './hooks/useUpcomingMovies';
const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      {/* Two main components - MainSection , SecondarySection.
      MainSection : Movie tailer + tailor etc.
      SecondarySection : MovieList*n  */}

      <Header />
      <MainSection />
      <SecondarySection />


    </div>
  );
}

export default Browse;
