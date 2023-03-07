import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({modal, toggle, loggedIn, handleNewPost}) => {
    
    const [form, setForm] = useState({
        category: "",
        todos: "",
        dueDate: ""
    });

    const [viewTask, setViewTask] = useState(null);

    const handleSave = (e) => {
        e.preventDefault()
        fetch(`https://manger.onrender.com/users/${loggedIn.id}/tasks`, {
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
        });
    }

    const handleView = (e) => {
        e.preventDefault();
        // fetch the task details using an API call or any other method
        fetch(`https://manger.onrender.com/users/${loggedIn.id}/tasks/${taskId}`)
            .then(response => response.json())
            .then(data => {
                setViewTask(data);
            });
    }

    const closeModal = () => {
        setViewTask(null);
    }

    return (
        <>
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
                    <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
                    <Button color="info" onClick={handleView}>View</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={viewTask !== null} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>View Task</ModalHeader>
                <ModalBody>
                    <p>Category: {viewTask?.category}</p>
                    <p>Tasks: {viewTask?.todos}</p>
                    <p>Due Date: {viewTask?.dueDate}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={closeModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Create;
