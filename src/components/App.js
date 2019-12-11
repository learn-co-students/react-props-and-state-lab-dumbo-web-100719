import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  };

  fetchPets = () => {
    let url = `/api/pets`
    // console.log("hi")
    if (this.state.filters.type !== "all"){
      url = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(resp => resp.json())
    .then(petsArr => this.setState({pets: petsArr}, console.log(this.state.pets)))
  }

  onAdoptPet = (petId) => {
    let updatedPets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: updatedPets });
  }
  

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
