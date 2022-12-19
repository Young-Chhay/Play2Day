import React from 'react';
// import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CreateGameForm from '../components/CreateGameForm';
import AllGamesList from '../components/AllGamesList';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME, } from '../utils/queries';


const Profile = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });
    // const user = [data]
    const user = data?.me || data?.user || {};
    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading....</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    // all user to see 1/ create a games & 2/ See all User joined game  ( come from CreateGameForm and from AllGameList)
    // user will have unique id tie to create games. 
    return (
        <div>
            <div className="flex-row justify-center mb-3">
                <h2 className="col-12 col-md-10 ">
                    Your Created Games
                </h2>

                <div className="col-12 col-md-10 mb-5">
                    <AllGamesList
                        games={user.games}
                        title={`${user.username}'s games...`}
                        showGameTitle={false}
                        showUsername={false}
                    />
                    
                    {/* <AllGamesList
                        games={game.joinedUsers.map(user => user.username).join(", ")}
                        title={`${user.username}'s games...`}
                        showGameTitle={false}
                        showUsername={false}
                    /> */}
                    
                    {/* <Link className="text-light" to="/">
            <h1 className="m-0">Tech Thoughts</h1>
          </Link> */}
                </div>
                {!userParam && (
                    <div
                        className="col-12 col-md-10 mb-3 p-3"
                        style={{ border: '1px dotted #1a1a1a' }}
                    >
                        <CreateGameForm />
                    </div>
                )}
            </div>

            
        </div>
    );
};

export default Profile;
