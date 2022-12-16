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
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <CreateGameForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <AllGamesList
              games={games}
              title="Check out all these games!"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
