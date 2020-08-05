import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {

  state = {
      pets: [],
      filters: {
        type: 'all'
      }
  }

  handleFilterType = (filteredType) => {
    this.setState({
      filters: {
        type: filteredType
      }
    })
  }

  updatePetArray = (response) => {
    this.setState({
      pets: response
    })
  }

  handleFetch = () => {
    if (this.state.filters.type === 'all'){
      fetch(`/api/pets`)
      .then(resp => resp.json())
      .then(json_resp => this.updatePetArray(json_resp))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(json_resp => this.updatePetArray(json_resp))
    }
  }

  onAdoptPet = (petId) => {
    let updatedPets = this.state.pets.map(pet => {
      return (pet.id === petId ? {...pet, isAdopted: true} : pet)
    })
     this.setState({
       pets: updatedPets
     })
         
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
              <Filters onChangeType={this.handleFilterType} onFindPetsClick={this.handleFetch} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
