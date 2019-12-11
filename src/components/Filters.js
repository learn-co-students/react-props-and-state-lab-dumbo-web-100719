import React from 'react'

class Filters extends React.Component {


// event handler to get new state value set it equal to selection
  onFindPetsClick = (evt) => {
    const selection = evt.target.value
    //console.log(selection)
    return this.props.changeFilterType(selection)
  }
  
  
  render() {
    return (
      <div className="ui form" >
        <h3>Animal type</h3>
        <div className="field">
          <select name="type" id="type" onChange={this.onFindPetsClick}>
            <option value="all">All</option>
            <option value="cat">Cats</option>
            <option value="dog">Dogs</option>
            <option value="micropig">Micropigs</option>
          </select>
        </div>

        <div className="field">
          <button className="ui secondary button" onClick={this.props.handleFetch} >Find pets</button>
        </div>
      </div>
    )
  }
}

export default Filters
