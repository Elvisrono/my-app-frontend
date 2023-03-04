import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateTask from './modals/CreateTask';



function App() {

  const [loggedIn, setLoggedIn] = useState({})
  const [tasks, setTasks] = useState([])
  const [post, setPosts] = useState(true)

  const addNewUser = (newUser) => setLoggedIn(newUser);


  useEffect(() => {
    fetch(`http://localhost:9293/users/${loggedIn.id}/tasks`)
    .then(r => r.json())
    .then( (tasksarr) => {
      console.log(tasksarr)
      setTasks(tasksarr)
    })
    }, [loggedIn, post])

    const deleteTask = (id) => {
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
    }

    function handleNewPost() {
      setPosts((post) => !post)
    }



  return (
    <div className="App">
      <Routes>
      <Route
  path="/home"
  element={
    <ToDoList
      tasks={tasks}
      loggedIn={loggedIn}
      deleteTask={deleteTask}
      handleNewPost={handleNewPost}
      CreateTask={CreateTask} // add this line
    />
  }
/>

          <Route path='/home' element= {<ToDoList tasks={tasks} loggedIn={loggedIn} deleteTask={deleteTask} handleNewPost={handleNewPost}/>}/> 
          <Route path='/users/new' element = {<Signup addNewUser={addNewUser}/>}/>
          <Route path='/' element = { <Login setLoggedIn={setLoggedIn} />}/>
      </Routes>
    </div>
  );
}

export default App;
