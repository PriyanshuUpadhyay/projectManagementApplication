import React from 'react';
import logo from './logo.png'
import './App.css'
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    let pendingProjects = ["Project1", "Project2", "Project3"]
    pendingProjects = pendingProjects.map(project => <li className="list-group">{project}</li>)
    let completedProjects = ["Project1", "Project2", "Project3"]
    completedProjects = completedProjects.map(project => <li className="list-group">{project}</li>)


    return (
      <div>
        <nav>
          <div>
            <img className="logo" src={logo} alt="logo" />
          </div>
          <div className="hac">
            <span><a href="https://github.com/">Home</a></span>
            <span><a href="https://github.com/">About</a></span>
            <span><a href="https://github.com/">Contact</a></span>
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
                <label hidden>Project Name</label>
                <input type="text" placeholder="Project Name" />
                <label hidden>Project Description</label>
                <textarea placeholder="Project Description" rows="3" columns="12" />
                <label hidden>Project Deadline</label>
                <input type="date" placeholder="Project Deadline" />
                <label hidden>Tech Stack used</label>
                <input type="text" placeholder="Tech Stack" />
                <button type="submit">Done</button>
              </form>
            </div>

          </main>
        </div>
      </div>
    )
  }
}

export default App;