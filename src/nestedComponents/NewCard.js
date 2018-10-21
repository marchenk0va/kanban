import React, { Component } from 'react';

export default class NewCard extends Component {
    render() {
        
        const getLevelClass = (level) => {
            if(level === 'low') {
                return 'level--low'
            } else if(level === 'medium') {
                return 'level--medium'
            } else return 'level--high'
        }

        const levelClass = getLevelClass(this.props.level);

        return (
            <div className={`Card ${levelClass}`} >
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
                <span className="level">{this.props.level}</span>
            </div>
        )
    }
}