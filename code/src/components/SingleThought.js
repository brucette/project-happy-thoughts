import React, { useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export const SingleThought = ({ message, hearts, createdAt, _id }) => {
  const [singleThoughthearts, setSingleThoughtHearts] = useState(hearts);

  // Function for likes:
  const handleLikeBtnClick = () => {
    // Post a like to the API
    fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${_id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      // Then increase the local likes with one:
      .then(setSingleThoughtHearts(hearts += 1));
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
            onClick={handleLikeBtnClick}>
            {/* &#128151; */}❤️
          </button>
          &nbsp; x {singleThoughthearts}&nbsp;
        </div>
        <div>
          {/* formatDistance(new Date(createdAt), Date.now(), { addSuffix: true }) */}
          <Moment fromNow>{createdAt}</Moment>
        </div>
      </div>
    </>
  )
}