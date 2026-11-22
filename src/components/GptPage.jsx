import { GptSearch } from "./GptSearch";
import Header from "./Header";

// The GPT search screen, now with its own URL (/browse/gpt) so the browser's
// Back and Forward buttons work. It only needs the Header and the search UI;
// it does not need the movie-loading hooks that Browse runs.
const GptPage = () => {
  return (
    <div>
      <Header />
      <GptSearch />
    </div>
  );
};

export default GptPage;
