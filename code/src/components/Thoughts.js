import React, { useEffect, useState } from 'react';
import { ThoughtForm } from 'components/ThoughtForm';
import { ThoughtList } from 'components/ThoughtList';

export const Thoughts = () => {
  const [thoughtList, setThoughtList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newThought, setNewThought] = useState('');

  // Function to get the thoughts currently in the API:
  const fetchThoughts = () => {
    fetch('https://project-happy-thoughts-api-d6aenh5q2a-lz.a.run.app/thoughts')
      .then((res) => res.json())
      .then((json) => setThoughtList(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  // Get all the thoughts already in the API as App loads:
  useEffect(() => {
    setLoading(true);
    setTimeout(() => { fetchThoughts(); }, 500);
  }, []);

  // Sets the variable newThought to what the user has typed in the form:
  const handleNewThought = (event) => {
    setNewThought(event.target.value)
  }

  /* Function to stop form immediately reloading page (and resetting all variables)
   once a submission is made: */
  const onFormSubmit = (event) => {
    event.preventDefault();

    // This is needed for posting user's entered message TO the API
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: newThought
      }),
      headers: {
        /* Sending a json file or application to the backend
          (get this info from the API's documentation): */
        'Content-Type': 'application/json'
      }
    }
    // Post user's message to the API
    fetch('https://project-happy-thoughts-api-d6aenh5q2a-lz.a.run.app/thoughts', options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
      .finally(() => setNewThought(''));
  }

  // Function for increasing like button
  const handleLikeBtnClick = (id) => {
    // Update the like count via patch:
    fetch(`https://project-happy-thoughts-api-d6aenh5q2a-lz.a.run.app/thoughts/${id}/like`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => fetchThoughts())
  };

  return (
    <main>
      <ThoughtForm
        onFormSubmit={onFormSubmit}
        newThought={newThought}
        handleNewThought={handleNewThought} />

      <ThoughtList
        loading={loading}
        thoughtList={thoughtList}
        setThoughtList={setThoughtList}
        fetchThoughts={fetchThoughts}
        handleLikeBtnClick={handleLikeBtnClick} />
    </main>
  );
};
