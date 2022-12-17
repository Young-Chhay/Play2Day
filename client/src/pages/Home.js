import React from 'react';
import { useQuery } from '@apollo/client';

import AllGamesList from '../components/AllGamesList';
import CreateGameForm from '../components/CreateGameForm';

import { QUERY_ALL_GAMES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_GAMES);
  const games = data?.games || [];
  console.log(games)

  return (
    <main>
      <div>
        <h1>Check out these available games:</h1>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <AllGamesList
            games={games}
            title="Check out all these games!"
          />
        )}
      </div>
    </main>
  );
};

export default Home;
