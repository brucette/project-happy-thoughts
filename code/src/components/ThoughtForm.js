import React from 'react';

export const ThoughtForm = ({ onFormSubmit, newThought, handleNewThought }) => {
  return (
    <section className="form">
      <form onSubmit={onFormSubmit}>
        <h4>What's making you happy right now?</h4>
        <textarea
          value={newThought}
          onChange={handleNewThought}
          className="userInput" />
        <button
          className="submitBtn"
          type="submit">
          {/* &#128151; */}❤️ Send Happy Thought {/* &#128151; */}❤️
        </button>
      </form>
    </section>
  );
}