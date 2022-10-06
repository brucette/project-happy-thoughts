import React from 'react';
import { SingleThought } from 'components/SingleThought';

export const ThoughtList = ({ loading, thoughtList }) => {
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
          // eslint-disable-next-line no-underscore-dangle
          _id={thought._id} />
      </div>
    ))
  )
}