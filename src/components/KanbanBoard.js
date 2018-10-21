import React, { Component } from 'react';

import List from './List';
import NewCard from '../nestedComponents/NewCard';

export default class KanbanBoard extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            cards: [],
        };

        this.addNewCardHandler = this.addNewCardHandler.bind(this);
    }
    
    // change change change
    addNewCardHandler = () => {
        let cards = this.props.cards;
        cards.splice(cards, 0, cards[0]); 
        this.setState({cards: cards})
        console.log(cards);        
    };

    render() {
        return(
            <div className="KanbanBoard">
                <List 
                    title="To Do:"
                    cards={this.props.cards.filter(card => card.status === "to-do")}
                    addNewCard={this.addNewCardHandler} />
                <List 
                    title="In Progress:"
                    cards={this.props.cards.filter(card => card.status === "in-progress")}
                    addNewCard={this.addNewCardHandler} />
                <List 
                    title="Completed:"
                    cards={this.props.cards.filter(card => card.status === "completed")}
                    addNewCard={this.addNewCardHandler} />
            </div>
        )
    }
}