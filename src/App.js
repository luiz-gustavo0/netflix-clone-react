import React from 'react';
import Api from './services/Api';
import './App.css';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';

function App() {
  const [movieList, setMovieList] = React.useState([]);
  const [featureData, setFeatureData] = React.useState(null);

  React.useEffect(() => {
    //lista total
    const loadAll = async () => {
      let list = await Api.getHomeList();
      setMovieList(list);

      // featureData
      let originals = list.filter((i) => i.slug === 'originals');
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1),
      );
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Api.getMovieInfo(chosen.id, 'tv');

      setFeatureData(chosenInfo);
    };
    loadAll();
  }, []);

  return (
    <div className="page">
      {featureData && <FeatureMovie item={featureData} />}

      <section className="lists">
        {movieList &&
          movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
      </section>
    </div>
  );
}

export default App;
