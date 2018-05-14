import React, { Component } from 'react';
import Task from './Task/Task';
import TaskFrame from './TaskFrame/TaskFrame';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

//import Auth from './Auth/Auth.js';
//import { Navbar, Button } from 'react-bootstrap';

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
          <div className="heading">To do list, so you don't forget anything
           
          </div>
          </div>
          <div className="tasksBlock">
            <TaskFrame addTask={this.addTask}/>
          </div>
          <div className="tasksBody">
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