import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewCard from './NewCard';

const addNewCard = (props) => {
    return props.cardCallback.addNewCard(props.id, props.status);
};

export default class NewCardForm extends Component {
    constructor() {
        super();

        this.state = {
            inputValue: "",
            descriptionValue: "",
            level: 'low'
        };

        this.updateInputValue = this.updateInputValue.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
    };

    updateInputValue = (e) => {
        let updatedInput = e.target.value;
        this.setState({inputValue: updatedInput});
    };

    updateDescription = (e) => {
        let updatedDescr = e.target.value;
        this.setState({descriptionValue: updatedDescr});
    };

    handleSubmit = (e) => e.preventDefault();

    handleRatioChange = (e) => this.setState({level: e.target.value});

    static contextTypes = {
        router: PropTypes.object
    };

    cancelHandler = () => this.context.router.push('/');

    render() {
            return (
                <div className="NewCardForm" onSubmit={this.handleSubmit}>

                    <label htmlFor="card-title" className="NewCardForm__label">Title</label>
                    <input 
                        type="text" 
                        id="card-title"
                        value={this.state.inputValue}
                        className="NewCardForm__title"
                        onChange={e => this.updateInputValue(e)}
                        cardtitle={this.state.inputValue} />

                    <label htmlFor="card-description" className="NewCardForm__label">Description</label>
                    <textarea 
                        type="text"
                        id="card-descriprtion"
                        value={this.state.descriptionValue}
                        className="NewCardForm__description"
                        onChange={e => this.updateDescription(e)}
                        description={this.state.descriptionValue} />

                    <form>
                        <legend>Select priority level</legend>
                            <div>
                                <input type="radio" id="low"
                                        name="drone" value="low" 
                                        checked={this.state.level === 'low'}
                                        onChange={this.handleRatioChange} />
                                <label htmlFor="low">low</label>
                            </div>

                            <div>
                                <input type="radio" id="medium"
                                        name="drone" value="medium" 
                                        checked={this.state.level === 'medium'}
                                        onChange={this.handleRatioChange} />
                                <label htmlFor="medium">medium</label>
                            </div>

                            <div>
                                <input type="radio" id="high"
                                        name="drone" value="high" 
                                        checked={this.state.level === 'high'}
                                        onChange={this.handleRatioChange} />
                                <label htmlFor="high">high</label>
                            </div>
                    </form>

                    <div>
                        <button 
                            type="submit"
                            className="NewCardForm__btn add btn">+</button>
                        <a 
                            href="/"
                            className="NewCardForm__btn cancel"
                            onClick={this.cancelHandler}>cancel</a>
                    </div>

                </div>
        );
    }
}