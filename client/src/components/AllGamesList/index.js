import React from 'reactAllGamesList';
import { Link } from 'react-router-dom';

// change to Gamelist. home will ref this component to display allGamelist. show time, location. 
const AllGamesList = ({
  games,
  gameTitle,
  showGameTitle = true,
  showUsername = true,
}) => {
  // const[loading, data ] need to do useQuery 
  if (!games.length) {
    return <h3>No games Yet</h3>;
  }
  
  return (
    <div>
      {showGameTitle && <h3>{gameTitle}</h3>}
      {games &&
        games.map((game) => (
          <div key={game._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${game.gameAuthor}`}
                >
                  {game.gameAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Type of Sport : {game.sport}
                  </span>
                  <span style={{ fontSize: '1rem' }}>
                    This game was Created on : {game.createdAt}
                  </span>
                  <span style={{ fontSize: '1rem' }}>
                    game date : {game.date}
                  </span>
                  <span style={{ fontSize: '1rem' }}>
                    game time : {game.time}
                  </span>
                  <span style={{ fontSize: '1rem' }}>
                    number of players : {game.number_of_players}
                  </span>
                  <span style={{ fontSize: '1rem' }}>
                    Skill level : {game.skill_level}
                  </span>
                  <span style={{ fontSize: '1rem' }}>
                    Location : {game.location}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this game on {game.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{game.date}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/games/${game._id}`}
            >
              Join the discussion on this game.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AllGamesList;
