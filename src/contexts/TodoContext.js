import React, { createContext, useContext } from "react";


export const TodoContext = createContext({
    todos : [
      { 
      todo: "",
      completed: false,
    }
  ],

  addTodo: (todo) =>{},
  updateTodo: (id, todo) =>{},
  deleteTodo: (id) =>{},
  toggleCompleted: (id) =>{},
})

export const useTodo = () => { 
  return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider