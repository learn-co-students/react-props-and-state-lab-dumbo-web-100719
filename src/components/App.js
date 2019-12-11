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

  // updates the state based on change of dropdown

  changeFilterType = (selection) => {
    this.setState({
      filters: {
        type: selection
      }
    })
  }

  // update pet array state

  updatePetArray =(allPetsObj) =>{
    this.setState({
    pets: allPetsObj
  })
  }
  

  handleFetch = () => {
    
    if(this.state.filters.type === 'all'){
      fetch('/api/pets')
      .then(r => r.json())
      .then((allPetsObj) => {
        this.updatePetArray(allPetsObj)
      })
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(r => r.json())
      .then((allPetsObj) => {
        this.updatePetArray(allPetsObj)
        
      })
    }
   
  }
  //Finish the adopt function 
  onAdoptPet = (petId) => {
   const allPets = this.state
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
              <Filters changeFilterType={this.changeFilterType} handleFetch={this.handleFetch} />
            </div>
            <div className="twelve wide column">
              <PetBrowser allPets = {this.state.pets} onAdoptPet = {this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
