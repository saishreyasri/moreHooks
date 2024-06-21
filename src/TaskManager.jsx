import React, { useReducer, useRef } from 'react';
import './TaskManager.css';

const ADD_TASK = 'ADD_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';

const initialState = {
  tasks: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { tasks: [...state.tasks, { text: action.payload, hidden: false }] };
    case TOGGLE_TASK:
      return {
        tasks: state.tasks.map((task, index) =>
          index === action.payload ? { ...task, hidden: !task.hidden } : task
        )
      };
    default:
      return state;
  }
};

const TaskManager = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  const handleAddTask = () => {
    const taskText = inputRef.current.value;
    if (taskText) {
      dispatch({ type: ADD_TASK, payload: taskText });
      inputRef.current.value = '';
    }
  };

  const handleToggleTask = (index) => {
    dispatch({ type: TOGGLE_TASK, payload: index });
  };

  const handleFocusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="task-manager">
      <h1>Daily Tasks</h1>
      <input ref={inputRef} type="text" placeholder="Enter a task" />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {state.tasks.map((task, index) => (
          <li key={index}>
            <span>{task.hidden ? 'Content is hidden' : task.text}</span>
            <button onClick={() => handleToggleTask(index)}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleFocusInput}>Focus Input</button>
    </div>
  );
};

export default TaskManager;
