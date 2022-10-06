import React, { useEffect, useState } from 'react';
import { ThoughtForm } from 'components/ThoughtForm';
import { ThoughtList } from 'components/ThoughtList';

export const App = () => {
  const [thoughtList, setThoughtList] = useState([]);
  console.log('APP THOUGHTLIST:', thoughtList)
  const [loading, setLoading] = useState(false);
  const [newThought, setNewThought] = useState('');

  // Function to get the thoughts currently in the API:
  const fetchThoughts = () => {
    setLoading(true);
    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts')
      .then((res) => res.json())
      .then((json) => setThoughtList(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  // Get all the thoughts already in the API as App loads:
  useEffect(() => {
    fetchThoughts();
  }, []);

  // Sets the variable newThought to what the user has typed in the form:
  const handleNewThought = (event) => {
    setNewThought(event.target.value)
  }

  /* Function to stop form immediately reloading page (and resetting all variables e.g.)
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
        (get his info from the API's documentation): */
        'Content-Type': 'application/json'
      }
    }

    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts', options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
      .finally(() => setNewThought(''));
  }

  if (loading) {
    return (
      <p>PAGE IS LOADING...</p>
    )
  }

  return (
    <main>
      <ThoughtForm
        onFormSubmit={onFormSubmit}
        newThought={newThought}
        handleNewThought={handleNewThought} />

      <ThoughtList
        loading={loading}
        thoughtList={thoughtList}
        setThoughtList={setThoughtList} />
    </main>
  );
};
