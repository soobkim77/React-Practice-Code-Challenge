import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushiList: [],
    current: 0,
    eatenPlates: [],
    bankAcc: 200
  
  }

  findIsEaten(){
    let eaten = this.state.sushiList.filter(sushi => sushi.isEaten == true)
    this.setState({eatenPlates: eaten})
  }

  fourSushi = () => {
    return this.state.sushiList.slice(this.state.current, this.state.current+4)  
  }

  moreSushi = () => {
    this.setState({current: this.state.current+4})
  }

  eatSushi = (sushiID) => {
    if(this.state.bankAcc >= 0){
    let newSushi = this.state.sushiList.map(sushi => {
      if(sushi.id == sushiID.id){
       return {...sushi, isEaten: true}
      } else {
        return sushi
      }
    })
    let eaten = this.state.sushiList.filter(sushi => sushi.isEaten == true)
    this.setState({sushiList: newSushi, eatenPlates: [...eaten, 1], bankAcc: this.state.bankAcc-sushiID.price})
    } else {
      console.log("broke")
    }
  }

  getSushi(){
    fetch(API)
    .then(r => r.json())
    .then(sushis => {
      this.setState({sushiList: sushis})
    })
  }

  componentDidMount(){
    this.getSushi()
  }

  render() {

    return (
      <div className="app">
        <SushiContainer eat={this.eatSushi} sushi={this.fourSushi()} moreSushi={this.moreSushi}/>
        <Table isEaten={this.state.eatenPlates} money={this.state.bankAcc}/>
      </div>
    );
  }
}
// sushi={this.state.sushiList}
export default App;