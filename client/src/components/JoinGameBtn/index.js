import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { JOIN_GAME } from '../../utils/mutations';

import Auth from '../../utils/auth';

const JoinGameBtn = ({ gameId }) => {
  const [joinedUsers, setJoinedUsers] = useState('');
  const [joinGame, { error }] = useMutation(JOIN_GAME);

  const handleBtnSubmit = async (event) => {
    // event.preventDefault();
    console.log(gameId)
    console.log(Auth.getProfile().data.username)
    try {
      const { data } = await joinGame({
        variables: {
          gameId,
          joinedUsers: Auth.getProfile().data.username,
        },
      });

      setJoinedUsers(data);
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(gameId);

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <button
            className="btn btn-primary btn-block btn-squared"
            onClick={handleBtnSubmit}
            >
              Join this game.
            </button>
        </>
      ) : (
        <p>
          You need to be logged in to join a game. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default JoinGameBtn;