import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import logo from './logo.png';
import { MdOutlineEditNote, MdDeleteOutline } from 'react-icons/md'
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


const App = () => {
  const [toggle, setToggle] = useState(true);
  const flipToggle = () => { setToggle(!toggle) }

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [stack, setStack] = useState('');
  const [data, setData] = useState([]);

  const [modalInfo, setModalInfo] = useState([]);
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const [checkbox, setCheck] = useState(false);
  const uncheck = () => setCheck(false);
  const [editShow, setEditShow] = useState(false);
  const showEditModal = () => { setEditShow(true); };
  const closeEditModal = () => { setEditShow(false); };

  const [deleteShow, setDelete] = useState(false);
  const showDeleteModal = () => setDelete(true);
  const closeDeleteModal = () => setDelete(false);

  const dateToJsFormat = (date) => { //2018-06-12T19:30
    date = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0') + 'T' + String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
    return date
  }

  const capitalize = (data) => {
    return (data.charAt(0).toUpperCase() + data.slice(1))
  }

  useEffect(() => {
    Axios.get('http://localhost:3001/getprojects').then((response) => {
      console.log("Got the data")
      setData(response.data)
    }).catch((err) => {
      console.log("Error: " + err.message)
    })
  }, [toggle]);

  const submit = () => {
    Axios.post("http://localhost:3001/addproject", {
      name: capitalize(name),
      description: capitalize(description),
      deadline: deadline,
      stack: capitalize(stack),
      completed: false
    }).then((res) => {
      console.log(res.data)
      setName('');
      setDescription('');
      setDeadline('');
      setStack('');
      flipToggle();
    }).catch(err => {
      console.log(`Error: ${err.message}`);
    });

  }

  const submitModal = (id) => {
    Axios.post("http://localhost:3001/editproject", {
      id: id,
      name: modalInfo.name,
      description: modalInfo.description,
      deadline: modalInfo.deadline,
      stack: modalInfo.techStack,
      completed: checkbox
    }).then((res) => {
      console.log(res.data)
      setModalInfo([])
      flipToggle();
      closeEditModal();
      uncheck();
    }).catch(err => {
      uncheck();
      console.log(`Error: ${err.message}`);
    });

  }

  const deleteData = (id) => {
    Axios.post('http://localhost:3001/deleteproject', {
      id: id
    })
      .then(res => {
        console.log(res.data);
        setModalInfo([]);
        flipToggle();
        closeDeleteModal();
      })
      .catch(err => {
        console.log(`Error: ${err.message}`);
      })
  }


  let pendingProjects = data.filter(project => project["completed"] === false)
  pendingProjects = pendingProjects.map(project => {
    return (
      <div key={project["_id"]} className="listBlock">
        <li className="list-group" onClick={() => {
          setModalInfo(project)
          showModal();
        }}>{project.name}</li>
        <div>
          <MdOutlineEditNote className='editIcon' onClick={async () => {
            setModalInfo(project);
            showEditModal();
          }} />
          <MdDeleteOutline className='deleteIcon' onClick={() => {
            setModalInfo(project);
            showDeleteModal();
          }} />
        </div>
      </div>)
  });

  let completedProjects = data.filter(project => project["completed"] === true)
  completedProjects = completedProjects.map(project =>
    <div key={project["_id"]} className="listBlock">
      <li className="list-group" onClick={() => {
        setModalInfo(project);
        showModal();
      }}>{project.name}</li>
      <div>
        <MdDeleteOutline className='deleteIcon' onClick={() => {
          setModalInfo(project);
          showDeleteModal();
        }} />
      </div>
    </div>
  )


  const ModalContainer = () => {
    let date = new Date(modalInfo.deadline);
    date = date.toLocaleDateString() + ', ' + date.toLocaleTimeString()
    return (
      <Modal show={show} onHide={closeModal}>
        <Modal.Header className='modalHead' closeButton closeVariant='white'>
          Project Details:
        </Modal.Header>
        <Modal.Body className='modalBody'>
          <div>Name:  </div><div className='modalIndividual'>{modalInfo.name}</div>
          <div>Description: </div><div className='modalIndividual'>{modalInfo.description}</div>
          <div>Deadline:  </div><div className='modalIndividual'>{date}</div>
          <div>Tech Stack Used:</div><div className='modalIndividual'>{modalInfo.techStack}</div>
          <div>Completed: </div><div className='modalIndividual'>{modalInfo.completed ? 'Yes' : 'No'}</div>
        </Modal.Body>
      </Modal>
    )
  }

  const EditModal = () => {
    let today = new Date();
    today = dateToJsFormat(today);

    return (
      <Modal show={editShow} onHide={closeEditModal}>
        <Modal.Header className='modalHead' closeButton closeVariant='white'>
          Edit {modalInfo.name}
        </Modal.Header>
        <Modal.Body className='editModalBody'>
          <form className='formHolder editForm'>
            <label hidden>Project Name</label>
            <input type="text" placeholder="Project Name" onChange={e => { modalInfo.name = e.target.value }} value={modalInfo.name} />

            <label hidden>Project Description</label>
            <textarea placeholder="Project Description" rows="3" columns="12" onChange={e => { modalInfo.description = e.target.value }} value={modalInfo.description} />

            <label hidden>Project Deadline</label>
            <input type="datetime-local" placeholder="Project Deadline" onChange={e => { modalInfo.deadline = e.target.value }} value={dateToJsFormat(new Date(modalInfo.deadline))} min={today} />

            <label hidden>Tech Stack used</label>
            <input type="text" placeholder="Tech Stack" onChange={e => { modalInfo.techStack = e.target.value }} value={modalInfo.techStack} />

            <div className="checkbox" >
              <label>Mark as complete</label>
              <input type="checkbox" defaultChecked={checkbox} onChange={(e) => { setCheck(e.target.checked); }} />
            </div>
            <button type="button" onClick={() => submitModal(modalInfo._id)}>Done</button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }

  const DeleteModal = () => {
    return (
      <Modal show={deleteShow} onHide={closeDeleteModal} className='delModalContainer'>
        <Modal.Header className='modalHead'>
          Delete {modalInfo.name}?
        </Modal.Header>
        <Modal.Body className='editModalBody delModal'>
          <button onClick={() => deleteData(modalInfo._id)}>Yes</button>
          <button onClick={closeDeleteModal}>No</button>
        </Modal.Body>
      </Modal>
    )
  }

  let today = new Date();
  today = dateToJsFormat(today);

  return (
    <div>
      <nav>
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="hac">
          <span><a className='links' href="https://github.com/">Home</a></span>
          <span><a className='links' href="https://github.com/">About</a></span>
          <span><a className='links' href="https://github.com/">Contact</a></span>
        </div>
      </nav>


      <div className="content">
        <div className="sidebar">
          <div className="pending">Pending Projects
            <ul>{pendingProjects}</ul>
          </div>

          <div className="completed">Completed Projects
            <ul>{completedProjects}</ul>
          </div>
        </div>

        <main>



          <div className="cardContainer">
            <div className="h3">Overview</div>

            <div className="card">
              <div className='circleP'><div>{pendingProjects.length}</div></div>
              <div>
                Pending Projects
              </div>
            </div>

            <div className='card'>
              <div className='circleC'><div>{completedProjects.length}</div></div>
              <div>
                Completed Projects
              </div>
            </div>

          </div>

          <div>
            <form className='formHolder'>
              <div>Add a new Project</div>
              <label hidden>Project Name</label>
              <input type="text" placeholder="Project Name" onChange={e => { setName(e.target.value) }} value={name} />

              <label hidden>Project Description</label>
              <textarea placeholder="Project Description" rows="3" columns="12" onChange={e => { setDescription(e.target.value) }} value={description} />

              <label hidden>Project Deadline</label>
              <input type="datetime-local" placeholder="Project Deadline" onChange={e => { setDeadline(e.target.value) }} value={deadline} min={today} />

              <label hidden>Tech Stack used</label>
              <input type="text" placeholder="Tech Stack" onChange={e => { setStack(e.target.value) }} value={stack} />

              <button type="button" onClick={submit}>Done</button>
            </form>
          </div>

        </main>
      </div>
      {show ? <ModalContainer /> : null}
      {editShow ? <EditModal /> : null}
      {deleteShow ? <DeleteModal /> : null}
    </div>
  )
}


export default App;