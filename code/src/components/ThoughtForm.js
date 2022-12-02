import React from 'react';

export const ThoughtForm = ({ onFormSubmit, newThought, handleNewThought }) => {
  return (
    <section className="form">
      <form onSubmit={onFormSubmit}>
        <h4>What&apos;s making you happy right now?</h4>
        <textarea
          placeholder="Enter your thought here..(min 5 characters)"
          rows={4}
          minLength="5"
          maxLength="140"
          value={newThought}
          onChange={handleNewThought}
          type="text"
          className="userInput" />
        <div className="characters">{140 - newThought.length} characters remaining</div>
        <button
          className="submitBtn"
          type="submit">
          ❤️ Send Happy Thought ❤️
        </button>
      </form>
    </section>
  );
}