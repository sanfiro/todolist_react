import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import styles from './Todo.module.css'
export const Todo = ({todo,index,completeTodo,removeTodo,updateTodo}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });
  function stringToHslColor(str, s, l) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    var h = hash % 360;
    return 'hsl('+h+', '+s+'%, '+l+'%)';
  }

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  return (
    <div
      className={todo.isComplete ? styles.todo_complete : styles.todo}
      style={{backgroundColor: stringToHslColor(todo.text, 50, 50)}}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}
      className={styles.text}>
        {todo.text}
      </div>
      <div className={styles.iconContainer}>
      <FontAwesomeIcon icon={faEdit}
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className={styles.icon}
        />
        <FontAwesomeIcon icon={faTrashAlt}
          onClick={() => removeTodo(todo.id)}
          className={styles.icon}
        />
        
      </div>
    </div>
  );
};
