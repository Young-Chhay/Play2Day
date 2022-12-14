import React from 'react';
import { useQuery } from '@apollo/client';

// Homepage will display all avail games  : Allgameslist, gameform, NavBar(Header)  for signup login profile  links
// keep comment out for now. 

import AllGamesList from '../components/AllGamesList';
import CreateGameForm from '../components/CreateGameForm';

import { QUERY_ME } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const games = data?.games || [];

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
                            title="Some Feed for Thought(s)..."
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;
