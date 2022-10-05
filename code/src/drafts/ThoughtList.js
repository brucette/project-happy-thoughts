import React, { useState } from "react";
import { formatDistance } from 'date-fns';

export const ThoughtList = ({ loading, thoughtList, setThoughtList }) => {
  const onTaskCheckChange = (task) => {
    setTaskList(taskList => taskList.map(singleTask => {
      if(singleTask._id === task._id) {
        return {
          ...singleTask, isChecked: !singleTask.isChecked
        };
      }
      return singleTask;
    }));
  }

  if (loading) {
    return <h2>Loading in progress...</h2>
  }

  // Function for likes: 
  const handleLikeBtnClick = (event) => {
   hearts += 1;
  }

  return (
      thoughtList.map((thought) => (
        <div key={thought._id} className="thoughtCard">
          <h4>{thought.message}</h4>
          <div className="cardFooter">
            <div>
            <button 
              className="heartBtn"
              type="button" 
              onClick={() => handleLikeBtnClick}>
              &#128151;
            </button>
            &nbsp;x&nbsp;
          </div>
          <div>
            <p>{formatDistance(new Date(thought.createdAt), Date.now(), {addSuffix: true})}</p>
          </div>
        </div> 
      </div>
    ))

  )
}