import React, { Component } from 'react';

import KanbanBoard from './components/KanbanBoard';
import Particles from 'react-particles-js';
import 'babel-polyfill';


class App extends Component {
  render() {
    let cards = [ 
      {
        id: 1,
        cardTitle: 'Read',
        description: 'Read something',
        status: 'to-do',
        level: 'low',
        tasks: [
          {
            id: 1,
            taskTitle: 'First book',
            done: true
          },
          {
            id: 2,
            taskTitle: 'Second book',
            done: false
          }
        ]
      },

      {
        id: 2,
        cardTitle: 'Not die',
        description: 'Not die till the end of the year',
        status: 'in-progress',
        level: 'medium',
        tasks: [{}]
      },

      {
        id: 3,
        cardTitle: 'Cook',
        description: 'Make dinner',
        status: 'completed',
        level: 'high',
        tasks: [
          {
            id: 1,
            taskTitle: 'Buy chilli for sauce',
            done: true
          }
        ]
      }
      ]

    const params = {
      particles: {
        line_linked: {
          color: "#000000",
        },
        number: {
          value: 200,
        }
      }
    }

    return (
      <div className="KanbanBoard">
        <KanbanBoard cards={cards} />
        <Particles className="App" params={params} />
      </div>
    );
  }
}

export default App;
