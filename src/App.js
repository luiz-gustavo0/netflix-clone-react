import React from 'react';
import Api from './services/Api';
import './App.css';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

function App() {
  const [movieList, setMovieList] = React.useState([]);
  const [featureData, setFeatureData] = React.useState(null);
  const [balckHeader, setBlackHeader] = React.useState(false);

  React.useEffect(() => {
    //lista total
    const loadAll = async () => {
      let list = await Api.getHomeList();
      setMovieList(list);

      // featureData
      let originals = list.filter((i) => i.slug === 'originals');
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Api.getMovieInfo(chosen.id, 'tv');

      setFeatureData(chosenInfo);
    };
    loadAll();
  }, []);

  React.useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className='page'>
      <Header black={balckHeader} />
      {featureData && <FeatureMovie item={featureData} />}

      <section className='lists'>
        {movieList &&
          movieList.map((item, key) => (
            <MovieRow
              key={key}
              title={
                item.title === 'Originais da Netflix' ? 'Originais' : item.title
              }
              items={item.items}
            />
          ))}
      </section>
      <footer>
        <p> Desenvolvido para fins de estudo. </p>
        <p> Direitos de imagem para Netiflix.</p>
        <p> Dados pegos do site Themoviedb.org</p>
      </footer>
      {movieList.length <= 0 && (
        <div className='loading'>
          <img
            src='https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif'
            alt='loading'
          />
        </div>
      )}
    </div>
  );
}

export default App;
