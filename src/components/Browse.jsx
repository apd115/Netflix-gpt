
import Header from './Header';
import { MainSection } from './MainSection';
import { SecondarySection } from './SecondarySection';
import { useNowPlayingMovies } from './hooks/useNowPlayingMovies';
const Browse = () => {

  useNowPlayingMovies();
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
