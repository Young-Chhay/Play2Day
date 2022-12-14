import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_GAME } from '../../utils/mutations';
import { QUERY_ALL_GAMES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

// Gameform instead. 
const CreateGameForm = () => {
  const [gameText, setGameText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

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
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, games: [...me.games, addGame] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addGame({
        variables: {
          gameText,
          gameAuthor: Auth.getProfile().data.username,
        },
      });

      setGameText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'gameText' && value.length <= 280) {
      setGameText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="gameText"
                placeholder="Here's a new game..."
                value={gameText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Game
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CreateGameForm;
