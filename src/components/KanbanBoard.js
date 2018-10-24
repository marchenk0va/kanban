import React, { Component } from 'react';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill';

import { throttle } from '../utils/utils';
import List from './List';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


const API_URL = 'http://localhost:3000/cards';
const API_HEADERS = {
    "Content-Type": "application/json"
};

class KanbanBoard extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            cards: [],
        };

        this.updateCardStatus = throttle(this.updateCardStatus.bind(this), 100);
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
        this.changeCardDrag = this.changeCardDrag.bind(this);
    }

    componentDidMount() {
        fetch(API_URL, {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log("Error collecting and sending data.", error);
            });
    }

    updateCardStatus(cardID, listID) {
        let cards = this.state.cards;
        let cardIndex = cards.findIndex((card) => card.id === cardID);
        let card = cards[cardIndex];
        if (card.status !== listID) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: listID }
                    }
                }
            }));
        };
    };
    
    updateCardPosition(cardID, afterID) {
        if (cardID !== afterID) {
            let cardIndex = this.state.cards.findIndex((card) => card.id === cardID);
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex((card) => card.id === afterID);
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        };
    };

    changeCardDrag(cardID, status) {
        let cards = this.state.cards;
        let cardIndex = cards.findIndex((card) => card.id === cardID);
        let card = cards[cardIndex];

        fetch(`${API_URL}/${cardID}`, {
            method: "PUT",
            headers: API_HEADERS,
            body: JSON.stringify({
                status: card.status,
                cardTitle: card.cardTitle,
                description: card.description,
                level: card.level, 
                order_position: cardIndex
            })
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Error from server.")
            }
        })
        .catch((error) => {
            console.log("Error collecting: ", error);
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: status }
                    }
                }
            }));
        });
    };

    render() {
        return(
            <div className="KanbanBoard">
                <List 
                    id='to-do'
                    title="To Do:"
                    cards={this.state.cards.filter(card => card.status === "to-do")}
                    cardCallback={{
                        updateStatus: this.updateCardStatus,
                        updatePosition: this.updateCardPosition,
                        changeCardDrag: this.changeCardDrag }} />
                <List 
                    id='in-progress'
                    title="In Progress:"
                    cards={this.state.cards.filter(card => card.status === "in-progress")}
                    cardCallback={{
                        updateStatus: this.updateCardStatus,
                        updatePosition: this.updateCardPosition,
                        changeCardDrag: this.changeCardDrag }} />
                <List 
                    id='completed'
                    title="Completed:"
                    cards={this.state.cards.filter(card => card.status === "completed")}
                    cardCallback={{
                        updateStatus: this.updateCardStatus,
                        updatePosition: this.updateCardPosition,
                        changeCardDrag: this.changeCardDrag }} />
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(KanbanBoard);