import React, { useState, useRef, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

function TodoItem({ todoItem, updateTodo, removeTodo })
{
  function onCheck(e)
  {
    updateTodo(todoItem);
  }

  function onRemove(e)
  {
    removeTodo(todoItem);
  }

  return <div class='bg-slate-900 w-[850px] flex justify-end'>
    <div class='pt-2 flex-grow'>
      Task : {todoItem.value}
    </div>
    <div class='px-2 my-2 border'>
      <label>
        <input type='checkbox' checked={todoItem.completed} onChange={onCheck} />
      </label>
    </div>
    <button class='' onClick={onRemove}>Remove</button>
  </div>
}

function App()
{
  const [count, setCount] = useState(0);

  let [todos, setTodo] = useState([{
    id: "0",
    value: "Learn React Basics",
    completed: false
  }]);

  let formData = useRef("");

  function renderTodos()
  {
    return (<div>
      {todos.map((element, index) =>
      (
        <React.Fragment key={index}>
          <TodoItem todoItem={element} updateTodo={updateTodo} removeTodo={removeTodo} />
        </React.Fragment>
      ))
      }
    </div >)
  }

  function onChange(e)
  {
    formData.current = e.target.value;
  }

  function updateTodo(todoItem)
  {
    const newTodos = todos.map((value) => value.value === todoItem.value ? { ...value, completed: !todoItem.completed } : value);
    setTodo(newTodos);
  }

  function addTodo(e)
  {
    e.preventDefault();
    console.log(formData.current);

    setTodo([...todos, { id: todos.length, value: formData.current, completed: false }]);
  }

  function removeTodo(todoItem)
  {
    let newTodos = Array.from(todos);
    newTodos = newTodos.filter((value, index) => (value != todoItem));
    setTodo(newTodos);
  }

  function renderForm()
  {
    return (
      <React.Fragment>
        <form onSubmit={addTodo}>
          <span className='formTitle'>Task Name :{" "}</span>
          <label htmlFor='name'></label>
          <textarea className='formInput' id='name' name='name' ref={formData} onChange={onChange}></textarea>
          {" "}
          <span style={{ paddingLeft: "20px", position: "relative", top: "-20px" }}> <button type='submit'>Add Todo</button></span>
        </form>
      </React.Fragment >)
  }

  return (
    <React.Fragment>
      <div class='container mx-auto bg-blue-400'>
        < h1 class='font-semibold' > TODO List</h1 >
      </div>
      <div class="text-lg font-bold italic">
        A division
      </div>
      <div className='p-4'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        {renderForm()}
      </div>

      <div class='border-2 border-gray-500 border-opacity-100 p-2 flex'>
        <span class="border flex-1">Tasks </span>
        <span className='topbar-item2'>Status</span>
      </div>

      <div class='w-[775px] my-[25px] pl-[10px] bg-slate-800'>
        {renderTodos()}
      </div>
    </React.Fragment >
  )
}

export default App
