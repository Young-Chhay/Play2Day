import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';
import { ADD_GAME } from '../utils/mutations';

import Auth from '../utils/auth';

const CreateGame = (props) => {
  const [formState, setFormState] = useState({ sport: '', difficulty_level: '' });
  const [login, { error, data }] = useMutation(ADD_GAME);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      sport: '',
      diffficulty_level: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Create Game</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder=""
                  name="sport"
                  type="sport"
                  value={formState.sport}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="difficulty_level"
                  type="diffficulty_level"
                  value={formState.difficulty_level}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateGame;
