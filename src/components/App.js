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

  findPets = () => {

    if (this.state.filters.type === 'all') {
      fetch("/api/pets")
      .then(r => r.json())
      .then((pets) => {
        this.setState({
          pets: pets
        }, console.log(this.state))
      }
      )
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(r => r.json())
      .then((pets) => {
        this.setState({
          pets: pets
        }, console.log(this.state))
      }
      )
    }
  }

  changeType = (newType) => {
    this.setState({
      filters: {...this.state.filters, type: newType}
    })
  }

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet 
    })
    this.setState({
      pets: pets
    }, console.log(this.state.pets))
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
              <Filters onChangeType={this.changeType} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
