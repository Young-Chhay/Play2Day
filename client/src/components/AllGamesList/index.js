import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./index.module.css"


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
    <div className={styles.cardFrame}>
      {showGameTitle && <h3>{gameTitle}</h3>}
      {games &&
        games.map((game) => (
          <div key={game._id} className={styles.card}>
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/me/${game.gameCreator}`}
                >
                  {game.gameCreator} <br />
                  <div>
                    <span style={{ fontSize: '1rem' }}>
                      Game ID: {game.gameName}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '1rem' }}>
                      Sport: {game.sport}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '1rem' }}>
                      Date: {game.date}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '1rem' }}>
                      Time: {game.time}
                    </span>  
                  </div>
                  <div>
                    <span style={{ fontSize: '1rem' }}>
                      Number of Players: {game.number_of_players}
                    </span>  
                  </div>              
                  <div>
                    <span style={{ fontSize: '1rem' }}>
                      Skill Level : {game.skill_level}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '1rem' }}>
                      Location : {game.location}
                    </span>
                  </div>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    {game.user}'s Game
                  </span>
                </>
              )}
            </h4>
            {/* Update this code to be game.user to pull all the users who signed up for the game */}
            <div className="card-body bg-light p-2">
              <p>{game.date}</p>
            </div>
            {/* Change this button so that instead of a link, it's an event listener for other users who have logged in can join the game */}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/games/${game._id}`}
            >
              Join this game.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AllGamesList;
