import React, { Component } from 'react';

export default class TaskList extends Component {
    render() {
        let checklist = this.props.tasks.map((task, index) => {

            const checkboxCheck = (taskTitle) => {
                if (taskTitle === undefined) {
                    return null
                } else return <input type="checkbox"/>
            };

            const checkbox = checkboxCheck(task.taskTitle);

                return (
                    <li key={index}>
                        {checkbox}
                        {task.taskTitle}
                    </li>
                );
        })

       return(
           <div className="TaskList">
                <ul className="TaskList__list">{checklist}</ul>
            </div>
        )
    }
}