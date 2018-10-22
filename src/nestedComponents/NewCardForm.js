import React, { Component } from 'react';

import NewCard from './NewCard';

export default class NewCardForm extends Component {
    constructor() {
        super();

        this.state = {
            inputValue: "",
            descriptionValue: "",
            tasks: [],
            clicked: false,
            priority: 'low',
            cancel: false,
        };

        this.baseState = this.state; // for cancel btn
        this.updateInputValue = this.updateInputValue.bind(this);
    };

    updateInputValue = (e) => {
        let updatedInput = e.target.value;
        this.setState({inputValue: updatedInput});
    };

    updateDescription = (e) => {
        let updatedDescr = e.target.value;
        this.setState({descriptionValue: updatedDescr});
    };

    deleteNewCard = () => {
       let cards = this.props.cards;
       console.log(cards);
    }

    clicked = () => {
        this.setState({clicked: true});
    };

    handleSubmit = (e) => { e.preventDefault() };

    handleRatioChange = (e) => {
        this.setState({priority: e.target.value})
    };

    resetForm = () => {
        this.setState(this.baseState);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !equals(nextProps, this.props);
    // }

    render() {
        if(this.state.clicked) {
            return <NewCard
                cardTitle={this.state.inputValue} 
                description={this.state.descriptionValue}
                level={this.state.priority}
                deleteCard={this.deleteNewCard} />
        };

        const {onCancel} = this.state;

            return (
                <div className="NewCardForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="card-title" className="NewCardForm__label">Title</label>
                    <input 
                        type="text" 
                        value={this.state.inputValue}
                        placeholder="..." 
                        className="NewCardForm__title"
                        onChange={e => this.updateInputValue(e)}
                        cardtitle={this.state.inputValue} />

                    <label htmlFor="card-description" className="NewCardForm__label">Description</label>
                    <textarea 
                        type="text"
                        id="card-descriprtion"
                        value={this.state.descriptionValue}
                        placeholder="..." 
                        className="NewCardForm__description"
                        onChange={e => this.updateDescription(e)}
                        description={this.state.descriptionValue} />

                    <form>
                        <legend>Select priority level</legend>
                            <div>
                                <input type="radio" id="low"
                                        name="drone" value="low" 
                                        checked={this.state.priority === 'low'}
                                        onChange={this.handleRatioChange} />
                                <label htmlFor="low">low</label>
                            </div>

                            <div>
                                <input type="radio" id="medium"
                                        name="drone" value="medium" 
                                        checked={this.state.priority === 'medium'}
                                        onChange={this.handleRatioChange} />
                                <label htmlFor="medium">medium</label>
                            </div>

                            <div>
                                <input type="radio" id="high"
                                        name="drone" value="high" 
                                        checked={this.state.priority === 'high'}
                                        onChange={this.handleRatioChange} />
                                <label htmlFor="high">high</label>
                            </div>
                    </form>

                    <div>
                        <button 
                            type="submit"
                            className="NewCardForm__btn add btn"
                            onClick={this.clicked.bind(this)}>+</button>
                        <a 
                            href="?"
                            className="NewCardForm__btn cancel"
                            onClick={this.resetForm.bind(this)}>cancel</a>
                    </div>
                </div>
        );
    }
}