import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if (todoString) {
      let savedTodos = JSON.parse(todoString)
      setTodos(savedTodos)
    }
  }, [])

  const saveToLocalStorage = (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id)
    setTodo(t.todo)
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }

  const handleAdd = () => {
    if (todo.trim().length > 3) {
      let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
      setTodos(newTodos)
      setTodo("")
      saveToLocalStorage(newTodos)
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }

  return (
    <>
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black">

      <Navbar />
      <div className="mx-2 md:container md:mx-auto my-5 rounded-2xl p-5 bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl min-h-[80vh] md:w-1/2 border border-yellow-600">
        <h1 className='font-extrabold text-center text-2xl text-yellow-400 tracking-wide'>
          ITask – Manage your todos in style ✨
        </h1>

        {/* Add Todo Section */}
        <div className="addtodo my-5 m-2 flex-col gap-3">
          <h2 className='text-lg font-bold text-yellow-300'>Add a Todo</h2>
          <input 
            onChange={handleChange} 
            value={todo} 
            type="text" 
            className='w-full bg-gray-900 border border-yellow-500 rounded-full px-5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
          />
          <button 
            onClick={handleAdd} 
            disabled={todo.trim().length <= 3} 
            className='bg-yellow-500 hover:bg-yellow-600 p-2 py-1 mt-2 text-sm font-bold disabled:bg-gray-600 text-black rounded-full shadow-md transition-all duration-300'
          >
            Save
          </button>
        </div>

        {/* Show Finished Checkbox */}
        <div className="my-4 text-yellow-300 font-semibold">
          <input 
            type="checkbox" 
            onChange={toggleFinished} 
            checked={showFinished} 
            className="accent-yellow-500"
          /> Show Finished
        </div>

        {/* Todos List */}
        <h2 className='text-lg font-bold m-2 text-yellow-400'>Your Todos</h2>
        <div className="todos m-2">
          {todos.length === 0 && <div className='m-5 text-gray-400'>No todos available</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between items-center bg-gray-800 border border-gray-700 rounded-xl p-3 shadow-lg">
                <div className='flex gap-5 items-center'>
                  <input 
                    name={item.id} 
                    onChange={handleCheckbox} 
                    type="checkbox" 
                    checked={item.isCompleted} 
                    className="accent-yellow-500"
                  />
                  <div className={item.isCompleted ? "line-through text-gray-500" : "text-white"}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button 
                    onClick={(e) => handleEdit(e, item.id)} 
                    className='bg-yellow-500 hover:bg-yellow-600 p-2 py-1 text-sm font-bold text-black rounded-md mx-1 shadow-md transition-all duration-300'
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, item.id)} 
                    className='bg-red-600 hover:bg-red-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 shadow-md transition-all duration-300'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      </div>
    </>
  )
}

export default App
