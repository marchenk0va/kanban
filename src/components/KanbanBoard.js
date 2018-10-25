import React, { Component } from 'react';
import List from './List';

export default class KanbanBoard extends Component {
    render() {
        return(
            <div className="KanbanBoard">
                <List 
                    id='to-do'
                    title="To Do:"
                    cards={this.props.cards.filter(card => card.status === "to-do")}
                    cardCallback={this.props.cardCallbacks} />
                <List 
                    id='in-progress'
                    title="In Progress:"
                    cards={this.props.cards.filter(card => card.status === "in-progress")}
                    cardCallback={this.props.cardCallbacks} />
                <List 
                    id='completed'
                    title="Completed:"
                    cards={this.props.cards.filter(card => card.status === "completed")}
                    cardCallback={this.props.cardCallbacks} />
            </div>
        )
    }
}
