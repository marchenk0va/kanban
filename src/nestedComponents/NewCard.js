import React, { Component } from 'react';

import NewCardForm from './NewCardForm';

export default class NewCard extends Component {
    render() {
        const getLevelClass = (level) => 'level--' + level;

        const levelClass = getLevelClass(this.props.level);

        return (
            <div className={`Card ${levelClass}`}>
                <div>
                    <h3 className={"Card__title"}>
                        {this.props.title}
                        <button 
                            className="Card__title--delete btn"
                            onClick={() => this.props.deleteCard(this.props.key)}> delete
                        </button>
                    </h3>
                </div>
                <div className="Card__description">{this.props.description}</div>
                <span className="level">{this.props.level}</span>
            </div>
        )
    }
}