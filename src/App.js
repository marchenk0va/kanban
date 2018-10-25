import React, { Component } from 'react';

import KanbanApp from './components/KanbanApp';
import Particles from 'react-particles-js';


class App extends Component {
  render() {
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
        <KanbanApp />
        <Particles className="App" params={params} />
      </div>
    );
  }
}

export default App;
