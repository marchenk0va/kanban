import React, { Component } from 'react';

import Card from './Card';
import NewCardForm from '../nestedComponents/NewCardForm';
import NewCard from '../nestedComponents/NewCard';

export default class List extends Component {
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

    clickedBtn = () => {
        this.setState({addNewClicked: true});
    };

    render() {
        let cards = this.props.cards.map((card) => {
            return ( 
                <Card  {...card} 
                    key={card.id} 
                    deleteCard={() => this.deleteCardHandler(card.id)} />
            ) 
        });

        let newCardForm = this.state.addNewClicked ? <NewCardForm newCard={this.props.addNewCard}/> : null;

        return(
            <div className="List">
                <h1 className="List__title">{this.props.title}</h1>
                {cards}
                {/* <NewCard /> */}
                <button 
                    type="button" 
                    className="List__newCard--btn btn"
                    onClick={this.clickedBtn}>Add new card</button>
                {newCardForm}
            </div>
        );
    }
}