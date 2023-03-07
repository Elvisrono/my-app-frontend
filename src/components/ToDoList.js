import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import CreateTask from '../modals/CreateTask';
import { useState } from 'react';
import Card from './Card';
import Search from './Search';
import "../components/signup.css";
import "../components/todolist.css"

const ToDoList =({tasks, loggedIn, deleteTask, handleNewPost}) => {
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState([]);


    const toggle =()=> {
        setModal(!modal);
    }
    {loggedIn.id && (
  <CreateTask
    modal={modal}
    toggle={toggle}
    loggedIn={loggedIn}
    handleNewPost={handleNewPost}
  />
)}

    async function searchFunction(searchTerms){
        fetch("https://manger.onrender.com/users/${loggedIn.id}/tasks")
          .then(res => res.json())
          .then(data => {
            //let newData = [];
            const filtered = data.filter(item => {
              return item.description.includes(searchTerms)
              
            })
            setSearch(filtered)
            console.log(filtered)
          })
          .catch(error => {
            console.log(error)
          })
    
      }

    

  

  return (
    <>
    
     <div className='header text-center'>
        <h1>TASK MANAGER</h1>
        <form></form>
        <Search searchFunction={searchFunction} />
        <button className="btn btn-primary mt-2" onClick={()=> setModal(true)}>Create Task</button>
        <div className = "logout-form">
        <a id='logout' href='/'>LogOut</a>
        </div>
        
    </div>
   
    <div className='task-container'>
       
        {tasks.map((obj) => <Card taskObj={obj} handleNewPost={handleNewPost} loggedIn={loggedIn} deleteTask={deleteTask} />)}
        
    </div> 
   
    
    <CreateTask toggle ={toggle} handleNewPost={handleNewPost} modal={modal} loggedIn={loggedIn}/>
    
     
    </>
     );
};


export default ToDoList;
