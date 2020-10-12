import React, { useEffect, useRef, useState } from "react";
import styles from "./TodoForm.module.css";
export const TodoForm = ({ edit, onSubmit }) => {
  const [input, setInput] = useState(edit?edit.value:"");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = (e) => {
    // The preventDefault () method cancels the event
    // if it is cancelable, meaning that the default action that
    // belongs to the event will not occur.
    //     Clicking on a "Submit" button, prevent it from submitting a form
    // Clicking on a link, prevent the link from following the URL
    e.preventDefault();

    onSubmit({
      // The floor() method rounds a number DOWNWARDS to the
      // nearest integer, and returns the result.
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };

  return (
    <>
      {!edit && <h1 className={styles.title}>What's the plan for today?</h1>}
      <form onSubmit={() => null} className={styles.form}>
        {edit ? (
          <>
          <input
          type="text"
          placeholder="Update todo"
          value={input}
          onChange={handleChange}
          name="text"
          className={styles.todo_input}
          ref={inputRef}
          
          />
          <button onClick={handleSubmit} className={styles.btn}>
          Update
        </button>
        </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Add a todo"
              value={input}
              onChange={handleChange}
              name="text"
              className={styles.todo_input}
              ref={inputRef}
            />
            <button onClick={handleSubmit} className={styles.btn}>
              Add todo
            </button>
          </>
        )}
      </form>
    </>
  );
};
