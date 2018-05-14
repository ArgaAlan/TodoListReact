import React, { Component } from 'react';
import Task from './Task/Task';
import TaskFrame from './TaskFrame/TaskFrame';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

//import Auth from './Auth/Auth.js';
//import { Navbar, Button } from 'react-bootstrap';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
//import { Button } from 'reactstrap';

class App extends Component {

  constructor(props){
    super(props);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('tasks');

    this.state = {
      tasks: [], 
    }
  }

  componentWillMount(){
    const previousTasks = this.state.tasks;

    this.database.on('child_added', snap => {
      previousTasks.push({
        id: snap.key, 
        taskContent: snap.val().taskContent,
      })

      this.setState({
        tasks: previousTasks
      })
    })

    this.database.on('child_removed', snap => {
      for(var i = 0; i < previousTasks.length; i++){
        if(previousTasks[i].id === snap.key){
          previousTasks.splice(i, 1);
        }
      }
    
      this.setState({
        tasks: previousTasks
      })
    })
  }

  addTask(task){
    this.database.push().set({ taskContent: task});
  }

  removeTask(taskId){
    this.database.child(taskId).remove();
  }

  render() {

    return (
      
      <div className="tasksWrapper">
          <div className="tasksHeader">
            <div>
              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="#home">TODOLIST+BOOTSTRAP</a>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                  <NavItem eventKey={1} href="#">
                    Sign in
                  </NavItem>
                  <NavItem eventKey={2} href="#">
                    Sign Up
                  </NavItem>
                  <NavItem eventKey={3} href="#">
                    Log Out
                  </NavItem>
                </Nav>
              </Navbar>
            </div>
          </div>
          
          <div className="tasksBody">
          <div className="tasksBlock">
            <TaskFrame addTask={this.addTask}/>
          </div>
            {
              this.state.tasks.map((task) => {
                return (
                  <Task taskContent={task.taskContent} taskId={task.id} key={task.id} removeTask = {this.removeTask} />
                )
              })
            }
          </div>
        </div>
    );
  }
}

export default App;