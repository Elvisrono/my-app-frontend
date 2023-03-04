import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({ modal, toggle, loggedIn, handleNewPost }) => {
  const [form, setForm] = useState({
    category: '',
    todos: '',
    dueDate: '',
    completed: false,
    
  });
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewPost(description, dueDate);
    setDescription('');
    setDueDate('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9293/users/${loggedIn.id}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        handleNewPost();
        toggle();
        setForm({
          category: '',
          todos: '',
          dueDate: '',
          completed: false,
        });
      });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task - {form.dueDate}</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              name="category"
            />
          </div>
          <div className="form-group">
            <label>Tasks</label>
            <textarea
              rows="5"
              className="form-control"
              value={form.todos}
              onChange={(e) => setForm({ ...form, todos: e.target.value })}
              name="todos"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Due-Date</label>
            <input
              type="date"
              className="form-control"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
              name="dueDate"
            ></input>
          </div>
          <div className="form-group">
            <label>Completed</label>
            <select
              name="completed"
              className="form-control"
              value={form.completed}
              onChange={handleInputChange}
            >
              <option value={false}>Not Completed</option>
              <option value={true}>Completed</option>
            </select>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTask;
