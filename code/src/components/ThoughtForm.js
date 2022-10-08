import React from 'react';

export const ThoughtForm = ({ onFormSubmit, newThought, handleNewThought }) => {
  return (
    <section className="form">
      <form onSubmit={onFormSubmit}>
        <h4>What&apos;s making you happy right now?</h4>
        <textarea
          placeholder="Enter your message here.."
          rows={3}
          minLength="5"
          maxLength="140"
          value={newThought}
          onChange={handleNewThought}
          type="text"
          className="userInput" />
        <button
          className="submitBtn"
          type="submit">
          ❤️ Send Happy Thought ❤️
        </button>
      </form>
    </section>
  );
}