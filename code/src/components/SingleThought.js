import React, { useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export const SingleThought = ({ message, hearts, createdAt, _id }) => {
  const [singleThoughthearts, setSingleThoughtHearts] = useState(hearts);

  // Function for likes:
  const handleLikeBtnClick = () => {
    // Post a like to the API
    fetch(`https://project-happy-thoughts-api-d6aenh5q2a-lz.a.run.app/thoughts/${_id}/like`, { // https://happy-thoughts-technigo.herokuapp.com/thoughts/${_id}/like`
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    })
      // Then increase the local like count with one:
      .then(setSingleThoughtHearts(hearts += 1))
  };
  // Extract info for a single thought in the list of all thoughts in the API & display in a div:
  return (
    <>
      <p className="message">{message}</p>
      <div className="cardFooter">
        <div>
          <button
            hearts={singleThoughthearts}
            type="button"
            onClick={handleLikeBtnClick}
            className={singleThoughthearts === 0 ? 'heartBtn' : 'heartBtn pink'}>
            ❤️
          </button>
          &nbsp; x {singleThoughthearts}&nbsp;
        </div>
        <div>
          <Moment fromNow>{createdAt}</Moment>
        </div>
      </div>
    </>
  );
};