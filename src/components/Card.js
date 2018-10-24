import React, { Component } from 'react';

import { DragSource, DropTarget } from 'react-dnd';

const cardDrag = {
    beginDrag(props) {
        return { 
            id: props.id,
            status: props.status
        };
    },

    endDrag(props) { return props.cardCallback.changeCardDrag(props.id, props.status); }
};

const cardDrop = {
    drop(props, monitor) {
        const draggedID = monitor.getItem().id;
        props.cardCallback.updatePosition(draggedID, props.id);
    }
};

const collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const collectDrop = (connect, monitor) => {
    return { connectDropTarget: connect.dropTarget() };
};

class Card extends Component {
    constructor() {
        super();

        this.state = {
            taskListEmpty: false,
        }
    };

    render() {
        const { connectDragSource, connectDropTarget } = this.props;

        const getLevelClass = (level) => {
            if(level === 'low') {
                return 'level--low'
            } else if(level === 'medium') {
                return 'level--medium'
            } else return 'level--high'
        }
        const levelClass = getLevelClass(this.props.level);

        return connectDropTarget(connectDragSource(
            <div className={`Card ${levelClass}`}>
                <div>
                    <h3 className={"Card__title"}>
                        {this.props.cardTitle}
                        <button 
                            className="Card__title--delete btn"
                            onClick={this.props.deleteCard}> delete
                        </button>
                    </h3>
                </div>
                <div className="Card__description">{this.props.description}</div>
                {/* <TaskList tasks={this.props.tasks}/> */}
                {/* <input type="checkbox" className="checkedCard"/> */}
                <span className="level">{this.props.level}</span>
            </div>
        ))
    };
};

const drag = DragSource('CARD', cardDrag, collectDrag)(Card);
const drop = DropTarget('CARD', cardDrop, collectDrop)(drag);
export default drop;