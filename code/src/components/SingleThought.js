import React, { useState } from 'react';
import { formatDistance } from 'date-fns';

export const SingleThought = ({ message, hearts, createdAt, _id }) => {
  const [singleThoughthearts, setSingleThoughtHearts] = useState(hearts);

  // Function for likes:
  const handleLikeBtnClick = () => {
    setSingleThoughtHearts(hearts += 1);
    fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${_id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return (
    <>
      <h4>{message}</h4>
      <div className="cardFooter">
        <div>
          <button
            className="heartBtn"
            hearts={singleThoughthearts}
            type="button"
            onClick={() => handleLikeBtnClick}>
            {/* &#128151; */}❤️
          </button>
          &nbsp; x {singleThoughthearts}&nbsp;
        </div>
        <div>
          <p>{formatDistance(new Date(createdAt), Date.now(), { addSuffix: true })}</p>
        </div>
      </div>
    </>
  )
}