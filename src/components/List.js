import React, { Component } from 'react';

import Card from './Card';
import NewCardForm from '../nestedComponents/NewCardForm';
import NewCard from '../nestedComponents/NewCard';

import { DropTarget } from 'react-dnd';

const listTarget = {
    drop(props, monitor) {
        const draggedID = monitor.getItem().id;
        props.cardCallback.updateStatus(draggedID, props.id);
    }
};

const collect = (connect, monitor) => { return { connectDropTarget: connect.dropTarget() }};

class List extends Component {
    constructor() {
        super();

        this.state = {
            inputValue: "",
            submitted: false,
            addNewClicked: false,
        };

        this.updateInputValue = this.updateInputValue.bind(this);
        this.deleteCardHandler = this.deleteCardHandler.bind(this);
        this.clickedBtn = this.clickedBtn.bind(this);
    };

    updateInputValue = (e) => {
            let updatedValue = e.target.value;
            this.setState({inputValue: updatedValue, submitted: true});
    };

    deleteCardHandler = (cardID) => {
        let cards = this.props.cards;
        let cardToDelete = cards.indexOf(cardID);
        cards.splice(cardToDelete, 1);
        this.setState({cards: cards, addNewClicked: false});
    };

    clickedBtn = () => this.setState({addNewClicked: !this.state.addNewClicked});

    render() {
        const { connectDropTarget } = this.props;
        
        let cards = this.props.cards.map((card) => {
            return ( 
                <Card  {...card} 
                    key={card.id} 
                    deleteCard={(cardID) => this.deleteCardHandler()}
                    cardCallback={this.props.cardCallback} />
            ) 
        });

        let newCardForm = this.state.addNewClicked ? 
            <NewCardForm  cards={this.props.cards} 
                cardCallback={this.props.cardCallback} /> : null;

        return connectDropTarget(
            <div className="List">
                <h1 className="List__title">{this.props.title}</h1>
                {cards}
                {/* <NewCard /> */}
                {newCardForm}
                {!this.state.addNewClicked  &&
                    <button type="button" className="List__newCard--btn btn"
                        onClick={this.clickedBtn}>Add new card</button>}
            </div>
        );
    };
};

export default DropTarget('CARD', listTarget, collect)(List);