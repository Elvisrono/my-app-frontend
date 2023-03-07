import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect } from 'react';
import { useState } from 'react';

const EditTask = ({ modal, loggedIn, handleNewPost, toggle, taskObj, handleView, handleSave}) => {
    const [form, setForm] = useState({
      category: "",
      todos: "",
      dueDate: ""
    });
  
    useEffect(() => {
      if (taskObj) {
        setForm({
          category: taskObj.category,
          todos: taskObj.todos,
          dueDate: taskObj.dueDate,
          completed: taskObj.completed,
        });
      } else {
        const today = new Date().toISOString().slice(0, 10);
        setForm({ ...form, dueDate: today });
      }
    }, [taskObj]);
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleSave(form);
    };
  
    const handleUpdate = (e) => {
      fetch(
        `https://manger.onrender.com/users/${loggedIn.id}/tasks/${taskObj.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );
      handleNewPost();
      toggle();
    };
  
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Task - {form.dueDate}</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              className="form-control"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              name="categories"
            />
          </div>
          <div className="form-group">
            <label> Task Description</label>
            <textarea
              rows="5"
              className="form-control"
              value={form.todos}
              onChange={(e) => setForm({ ...form, todos: e.target.value })}
              name="todos"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Due</label>
            <input
              type="date"
              className="form-control"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
              name="dueDate"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="info" onClick={handleView}>View</Button>
        </ModalFooter>
      </Modal>
    );
  };

  export default EditTask