import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

// get single game change the name. Display all game info ( time location who createdgame, number player, skill lvl)
// ref to game model. 
import { QUERY_SINGLE_GAME } from '../utils/queries';

// single game wit associated comments  
const SingleGame = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { gameId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    // pass URL parameter
    variables: { gameId: gameId },
  });

  const game = data?.game || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {game.user} <br />
        <span style={{ fontSize: '1rem' }}>
          created this game on {game.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {game.date} <br />
        <span style={{ fontSize: '1rem' }}>
          number of players {game.number_of_players}
        </span>
      </h3>
      </div>

      <div className="bg-light py-4">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {game.sport} <br />
        <span style={{ fontSize: '1rem' }}>
          skill level{game.skill_level}
        </span>
      </h3>
      </div>

      <div className="bg-light py-4">
         <br />
        <span style={{ fontSize: '1rem' }}>
          Location:  {game.location}
        </span>
      </div>

      {/* <div className="my-5">
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </div> */}
    </div>
  );
};

export default SingleThought;
