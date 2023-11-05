import React, { useEffect, useState} from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {


  const [todos, setTodos] = useState([])

  const addTodo = (todo)=>{
    setTodos((prevTodos) => [{id: Date.now(), ...todo}, ...prevTodos])
  }
  
  const updateTodo = (todo, id) => {
    setTodos((prevTodos) => prevTodos.map((prevTodo)=> (
      prevTodo.id === id ? todo : prevTodo)))
  } 
  
  const deleteTodo = (id) => {
    setTodos((prevTodos) => (prevTodos.filter((prevTodo) => prevTodo.id !== id)))
  } 
  
  const toggleComplete = (id) => {
    setTodos((prevTodos)=> prevTodos.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo ))
  } 

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem('todos'))

    if (todos && todos.length>0){
      setTodos(todos)
    }
  }, [])

  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])

  return (
    <TodoProvider value = {{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-[100vw] mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.slice().reverse().map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
          </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
