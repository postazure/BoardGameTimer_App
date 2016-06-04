import React, { Component } from 'react';
import PlayerList from './components/player_list/player_list'
import BleConfig from './components/ble_config/ble_config'
import IconButton from './components/icon_button'
import $ from './stylesheets/main'
import colors from './stylesheets/colors'

import {
  AsyncStorage,
  AppRegistry,
  Text,
  View
} from 'react-native';

class BoardGameTimer_App extends Component {
  constructor(props){
    super(props);

    this.state = {
      ble: true, //view
      currentGame: {
        players: [],
        inProgress: false
      }
    }

    this.updateCurrentGame = this.updateCurrentGame.bind(this);
  }

  componentDidMount(){
    this.getCurrentGameFromStorage()

  }

  updateCurrentGame(currentGame){
    let newCurrentGameState = Object.assign({}, this.state.currentGame, currentGame);
    this.setState({currentGame: newCurrentGameState},
      this.setCurrentGameInStorage
    );
  }

  getCurrentGameFromStorage(){
    AsyncStorage.getItem('players', (err, res) => {
      let players = JSON.parse(res);
      this.updateCurrentGame({players: players});
    });

    AsyncStorage.getItem('inProgress', (err, res) => {
      let inProgress = JSON.parse(res);
      this.updateCurrentGame({inProgress: inProgress});
    });
  }

  setCurrentGameInStorage(){
    let currentGame = this.state.currentGame;
    AsyncStorage.setItem('players', JSON.stringify(currentGame.players));
    AsyncStorage.setItem('inProgress', JSON.stringify(currentGame.inProgress));
  }

  render() {
    if(!this.state.ble) {
      return (
        <View style={[$.appBg, $.flex, {marginTop: 20}]}>
          <BleConfig />
        </View>
      )
    }

    return (
      <View style={$.appBg}>
        <View style={$.appBar}>
          <View style={{position: 'absolute', left: 10, top: 20}}>
            <IconButton iconName={this.state.ble ? "bluetooth" : "bluetooth-disabled"} action={this.setupBluetooth} color={'white'}/>
          </View>
          <Text style={$.appHeaderText}>Game Timer</Text>
        </View>
        <PlayerList style={$.flex} currentGame={this.state.currentGame} updateCurrentGame={this.updateCurrentGame}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('BoardGameTimer_App', () => BoardGameTimer_App);
