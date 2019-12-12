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
  onChangeType= (select) => {
    this.setState({
      filters: {...this.state.filters,
      type: select}
    })
  }

  onFindPetsClick= (petsArr) => {
    this.setState({
      pets: petsArr
    })
  }

  onAdoptPet=(petId) => {
    let adoptedPets = this.state.pets.map(pet=>
     pet.id === petId ? { ...pet, isAdopted: true } : pet
    );
    this.setState({
      pets: adoptedPets
    })
  }
  
  
  componentDidMount(){
  if(this.state.filters.type === 'all') {
    fetch(`/api/pets`)
    .then(resp => resp.json())
    .then(petsArr => this.onFindPetsClick(petsArr))}
  else{
    fetch(`/api/pets?type=${this.state.filters.type}`)
    .then(resp => resp.json())
    .then(petsArr => this.onFindPetsClick(petsArr))
  }
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
              onFindPetsClick={this.findPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
