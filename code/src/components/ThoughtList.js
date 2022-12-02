import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export const ThoughtList = ({ loading, thoughtList, handleLikeBtnClick }) => {
  if (loading) {
    return (
      <p className="notify">
        <p>LOADING...</p>
        {/* // spinner: */}
        <div
          className="loadingio-eclipse">
          <div className="ldio-rpinwye8j0b">
            <div />
          </div>
        </div>
      </p>
    )
  }

  // If connection to database fails and there are no thoughts to display in thte thoughtlist:
  if (thoughtList.length === 0) {
    return (
      <p className="notify">Service currently unavailable...Please try again later.</p>
    )
  }

  // Map through all the thoughts currently in the API & display them in a div:
  return (
    thoughtList.map((thought) => (
      // eslint-disable-next-line no-underscore-dangle
      <div key={thought._id} className="thoughtCard">
        <p className="message">{thought.message}</p>
        <div className="cardFooter">
          <div>
            <button
              type="button"
              // eslint-disable-next-line no-underscore-dangle
              onClick={() => handleLikeBtnClick(thought._id)}
              className={thought.hearts === 0 ? 'heartBtn' : 'heartBtn pink'}>
            ❤️
            </button>
          &nbsp; x {thought.hearts}&nbsp;
          </div>
          <div>
            <Moment fromNow>{thought.createdAt}</Moment>
          </div>
        </div>
      </div>
    ))
  );
};