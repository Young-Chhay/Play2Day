import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./index.module.css";
import JoinGameBtn from '../JoinGameBtn';


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
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    {game.gameCreator}'s Game
                  </span>
                </>
              )}
            </h4>
            {/* Update this code to be game.user to pull all the users who signed up for the game */}
            <div className="card-body bg-light p-2">
              <div>Sport: {game.sport}</div>
              <div>Date: {game.date}</div>
              <div>Time: {game.time}</div>
              <div>Location: {game.location}</div>
              <div>Number of Players: {game.number_of_players}</div>
              <div>Skill Level: {game.skill_level}</div>
            </div>
            {/* Change this button so that instead of a link, it's an event listener for other users who have logged in can join the game */}
            <div
              // className="btn btn-primary btn-block btn-squared"
              // to={`/games/${game._id}`}
            >
              <JoinGameBtn />
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllGamesList;
