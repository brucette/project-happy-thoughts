import React from 'react';
import { SingleThought } from 'components/SingleThought';

export const ThoughtList = ({ loading, thoughtList, setThoughtList }) => {
  if (loading) {
    return <h2>Loading in progress...</h2>
  }

  return (
    thoughtList.map((thought) => (
      // eslint-disable-next-line no-underscore-dangle
      <div key={thought._id} className="thoughtCard">
        <SingleThought
          message={thought.message}
          hearts={thought.hearts}
          createdAt={thought.createdAt}
          _id={thought.id} />
      </div>
    ))
  )
}