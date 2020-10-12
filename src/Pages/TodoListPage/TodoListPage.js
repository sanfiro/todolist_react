import React, { useEffect, useState } from "react";
import { todoServices } from "../../Services/todoServices";
import { Todo } from "./components/Todo/Todo";
import { TodoForm } from "./components/TodoForm/TodoForm";
import styles from "./TodoListPage.module.css";
export const TodoListPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (process.env.REACT_APP_SERVER) getTodosServer();
  }, []);

  // FUNCTIONS IF YOU USE THE SERVER
  // -----------------------------------------------------------------------------------------
  async function getTodosServer() {
    try {
      const response = await todoServices.getTodos();
      setTodos(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  const updateTodoServer = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    try {
      const response = await todoServices.updateTodo(todoId, newValue);
      setTodos(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addTodoServer = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    try {
      const response = await todoServices.addTodo(todo);
      setTodos(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeTodoServer = async (id) => {
    try {
      const response = await todoServices.removeTodo(id);
      setTodos(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const completeTodoServer = async (id) => {
    try {
      const response = await todoServices.completeTodo(id);
      setTodos(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  // -----------------------------------------------------------------------------------------

  // FUNCTIONS IF USING THE REACT STATE
  // -----------------------------------------------------------------------------------------
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };
  // -----------------------------------------------------------------------------------------

  return (
    <div className={styles.container}>
      <TodoForm
        onSubmit={process.env.REACT_APP_SERVER ? addTodoServer : addTodo}
      />
      {todos?.map((el, i) => (
        <Todo
          todo={el}
          removeTodo={
            process.env.REACT_APP_SERVER ? removeTodoServer : removeTodo
          }
          completeTodo={
            process.env.REACT_APP_SERVER ? completeTodoServer : completeTodo
          }
          updateTodo={
            process.env.REACT_APP_SERVER ? updateTodoServer : updateTodo
          }
          index={i}
        />
      ))}
    </div>
  );
};
