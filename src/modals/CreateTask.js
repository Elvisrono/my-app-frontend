import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({modal, toggle, loggedIn, handleNewPost, handleView}) => {
    

    const [form, setForm] = useState(
        {
            category: "",
            todos: "",
            dueDate: ""
            
        }
    )
    
    // description is category and tasklist is task details
    
   
     //handleSave fcn will push taskObj in taskList array
     const handleSave =  (e) => {
        e.preventDefault()
        fetch(`http://localhost:9293/users/${loggedIn.id}/tasks`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json())
        .then(data => {
            handleNewPost();
            toggle();
            setForm({
                category: "",
                todos: "",
                dueDate: ""
              });
        })
            
    }

 
    return (
        
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task - {form.dueDate}</ModalHeader>

            <ModalBody>
            
                    <form>
                        <div className='form-group'>
                            <label>Category</label>
                            <input type="text" className='form-control' value={form.category} onChange={(e) => setForm({...form, category:e.target.value})} name="taskName"/>
                        </div>
                        <div className='form-group'>
                            <label>Tasks</label>
                            <textarea rows="5" className='form-control' value={form.todos} onChange={(e) => setForm({...form, todos:e.target.value})} name ="description"></textarea>
                        </div>
                        <div className='form-group'>
                            <label>Due-Date</label>
                            <input type="date" className='form-control' value={form.dueDate} onChange={(e) => setForm({...form, dueDate:e.target.value})} name="dueDate"></input>
                        </div>
                    </form>     
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleSave}>Create</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
             <Button color="info" onClick={handleView}>View</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateTask;