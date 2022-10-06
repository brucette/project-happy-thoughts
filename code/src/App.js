import React, { useEffect, useState } from 'react';
import { ThoughtForm } from 'components/ThoughtForm';
import { ThoughtList } from 'components/ThoughtList';

export const App = () => {
  const [thoughtList, setThoughtList] = useState([]);
  console.log('APP THOUGHTLIST:', thoughtList)
  const [loading, setLoading] = useState(false);
  const [newThought, setNewThought] = useState('');

  /* const [selectedPokemon, setSelectedPokemon] = useState();
  const [pokemons, setPokemons] = useState([]);
 const [visible, setVisible] = useState(false);
  useEffect(() => {
   /* console.log('app effect:', visible); */
  /* console.log('app change');
  }, [visible]);

  return (
    <div>
      <button type="button" onClick={() => setVisible(prev => !prev)}>Show/Hide</button>
      {visible && <Hello />}
    </div>
  ); 

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.json())
      .then(json => setPokemons(json.results));
      console.log(pokemons)
  }, [])
  return (
    <div>
      <ul>
        {pokemons.map(pokemon => {
          return (
            <li key={pokemon.name}>
              <button onClick={() => setSelectedPokemon(pokemon)}>{pokemon.name}</button>
            </li>
          );
        })}
      </ul>

      {selectedPokemon && <Detail name={selectedPokemon.name} url={selectedPokemon.url} />}*/

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

  // eslint-disable-next-line max-len
  // Function to stop form immediately reloading page (and resetting all variables e.g.) once a submission is made:
  const onFormSubmit = (event) => {
    event.preventDefault();

    // This is needed for posting user's entered message TO the API
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: newThought
      }),
      headers: {
        // eslint-disable-next-line max-len
        // Sending a json file or application to the backend (get his info from the API's documentation):
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
