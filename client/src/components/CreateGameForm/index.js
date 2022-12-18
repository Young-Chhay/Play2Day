import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form'

import { ADD_GAME } from '../../utils/mutations';
import { QUERY_ALL_GAMES, QUERY_ME } from '../../utils/queries';

import styles from "./index.module.css";
import Auth from '../../utils/auth';

// Gameform instead. 
const CreateGameForm = () => {
  const [gameName, setGameName] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [number_of_players, setNumber_of_players] = useState("");
  const [skill_level, setSkill_level] = useState("")
  
    // to configure all the variables and connect to Mutation and model. 
  const [addGame, { error }] = useMutation(ADD_GAME, {
    update(cache, { data: { addGame } }) {
      try {
        const { games } = cache.readQuery({ query: QUERY_ALL_GAMES });

        cache.writeQuery({
          query: QUERY_ALL_GAMES,
          data: { Games: [addGame, ...games] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      try {
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, games: [...me.games, addGame] } },
      });
    } catch (e) {
      console.log(error)
    }},
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addGame({
        variables: {
          gameName,
          sport,
          date,
          time,
          location,
          number_of_players,
          skill_level,
          gameCreator: Auth.getProfile().data.username,
        },
      });

      setGameName('');
      setSport('');
      setDate('');
      setTime('');
      setLocation('');
      setNumber_of_players('');
      setSkill_level('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setGameName(value);
  };

  const handleSportChange = (event) => {
    const value = event.target.value;
    setSport(value);
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleTimeChange = (event) => {
    const value = event.target.value;
    setTime(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const handleNumber_of_players = (event) => {
    const value = event.target.value;
    setNumber_of_players(value);
  };

  const handleSkill_levelChange = (event) => {
    const value = event.target.value;
    setSkill_level(value);
  };



  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <div className={styles.container}>
            <form className={styles.gameForm} onSubmit={handleFormSubmit}>
              <h3>Add a new game for people to join</h3>
              <fieldset>
                <input
                  placeholder="Enter game name"
                  type="text"
                  tabIndex="1"
                  name="gameName"
                  value={gameName}
                  onChange={handleNameChange}
                  required
                  autoFocus
                />
              </fieldset>
              <fieldset>
                <select onChange={handleSportChange} value={sport} type="text" tabIndex="2" required>
                  <option>Select a sport</option>
                  <option value="Basketball">Basketball 🏀</option>
                  <option value="Baseball">Baseball ⚾</option>
                  <option value="Soccer">Soccer ⚽</option>
                </select>
                {/* <input
                  placeholder="Enter sport"
                  type="text"
                  tabIndex="2"
                  name="sport"
                  value={sport}
                  onChange={handleSportChange}
                  required
                /> */}
              </fieldset>
              <fieldset>
                <input
                  placeholder="Set the date of the game"
                  type="text"
                  tabIndex="3"
                  name="date"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  placeholder="Set the game time"
                  type="text"
                  tabIndex="4"
                  name="time"
                  value={time}
                  onChange={handleTimeChange}
                  required
                />
              </fieldset>
              <fieldset>
                <select onChange={handleLocationChange} value={location} type="text" tabIndex="5" required>
                  <option>Set a location for the game</option>
                  <option value="Irvine">Irvine Park, Irvine</option>
                  <option value="Orange">Hart Park, Orange</option>
                  <option value="GardenGrove">Eastgate Park, Garden Grove</option>
                </select>
                {/* <input
                  placeholder="Set the game location"
                  type="text"
                  tabIndex="5"
                  name="location"
                  value={location}
                  onChange={handleLocationChange}
                  required
                /> */}
              </fieldset>
              <fieldset>
                <input
                  placeholder="Select the number of players"
                  type="text"
                  tabIndex="6"
                  name="numberOfPlayers"
                  value={number_of_players}
                  onChange={handleNumber_of_players}
                />
              </fieldset>
              <fieldset>
                <select onChange={handleSkill_levelChange} value={skill_level} type="text" tabIndex="7" required>
                  <option>Set the desired skill level of the players</option>
                  <option value="Nubz">Nubz</option>
                  <option value="Mediocre">Mediocre</option>
                  <option value="L33t">L33t</option>
                </select>
                {/* <input
                  placeholder="Select the targeted game skill level"
                  type="text"
                  tabIndex="7"
                  name="skillLevel"
                  value={skill_level}
                  onChange={handleSkill_levelChange}
                  required
                /> */}
              </fieldset>
              <fieldset>
                <button name="submit" type="submit" data-submit="...Sending">
                  Create Game
                </button>
              </fieldset>
            </form>
          </div>

          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </>
      ) : (
        <p>
          You need to be logged in to use Play2Today. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CreateGameForm;
