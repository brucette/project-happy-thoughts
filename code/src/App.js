import React, { useEffect, useState } from 'react';
import { ThoughtForm } from 'drafts/ThoughtForm';
import { ThoughtList } from 'drafts/ThoughtList';

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

  // Function to stop form immediately reloading page once a submission is made:
  const onFormSubmit = (event) => {
    event.preveventDefault();

    // This is for ???? when posting user's enter message TO the API
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: newThought
      })
    }

    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts', options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
      .finally(() => setNewThought(''));
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
