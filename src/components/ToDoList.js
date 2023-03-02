import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import CreateTask from '../modals/CreateTask';
import { useState } from 'react';
import Card from './Card';
import Search from './Search';
import "../components/signup.css";

const ToDoList =({tasks, loggedIn, deleteTask, handleNewPost}) => {
    const [modal, setModal] = useState(false);

    const toggle =()=> {
        setModal(!modal);
    }

    

  

  return (
    <>
    
     <div className='header text-center'>
        <h3>Task Manager</h3>
        <button className="btn btn-primary mt-2" onClick={()=> setModal(true)}>Create Task</button>
        <div class = "logout-form">
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
