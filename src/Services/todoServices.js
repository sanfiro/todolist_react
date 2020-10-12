import axios from 'axios'

const BASE_URL="http://localhost:9999"
export const todoServices = {
    getTodos,
    addTodo,
    removeTodo,
    updateTodo,
    completeTodo
};

async function getTodos() {
     return await axios.get(`${BASE_URL}/todos`);   
  }

  async function addTodo(todo) {
    return await axios.post(`${BASE_URL}/todos`,todo);   
 }

 async function removeTodo(todoId) {
    return await axios.delete(`${BASE_URL}/todos/${todoId}`);   
 }

 async function updateTodo(todoId,newTodo) {
    return await axios.put(`${BASE_URL}/todos/${todoId}`,newTodo);   
 }

 async function completeTodo(todoId) {
    return await axios.get(`${BASE_URL}/todos/complete/${todoId}`);   
 }
 
   


