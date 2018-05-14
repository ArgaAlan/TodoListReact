import React, { Component } from 'react';
import './TaskFrame.css';

class taskFrame extends Component{
    constructor(props){
        super(props);
        this.state = {
            newTaskContent: '',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeTask = this.writeTask.bind(this);
    }

    handleUserInput(e){
        this.setState({
            newTaskContent: e.target.value, 
        })
    }

    writeTask(){

        this.props.addTask(this.state.newTaskContent);

        this.setState({
            newTaskContent: '',
        })
    }

    render(){
        return(
            <div className='formWrapper'>
                <input className="taskInput"
                placeholder="Write something you need to do"
                value={this.state.newTaskContent} 
                onChange={this.handleUserInput} />
                <button className='taskButton'
                onClick={this.writeTask}>Add</button>
            </div>
        )}
}

export default taskFrame;