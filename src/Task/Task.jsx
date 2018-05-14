import React, { Component } from 'react';
import './Task.css';
import PropTypes from 'prop-types';
import { DEFAULT_ECDH_CURVE } from 'tls';

class Task extends Component{
    constructor(props){
        super(props);
        this.taskContent = props.taskContent;
        this.taskId = props.taskId;
    }

handleRemoveTask(id){
    this.props.removeTask(id);
}

    render(props){
        return(
            <div className="task fade-in">
                <span className="closebtn"
                      onClick={() => this.handleRemoveTask(this.taskId)}>
                      &#9932;
                </span>
                <p className="taskContent">{ this.taskContent }</p>

                <input type="hidden" role="uploadcare-uploader" name="content"
                 data-crop="disabled"
                 data-preview-step="true"
                 data-images-only="true" />
            </div>
        )
    }
}

Task.propTypes = {
    taskContent: PropTypes.string
}

export default Task;