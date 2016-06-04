import React, { Component } from 'react';
import PlayerList from './components/player_list/player_list'
import IconButton from './components/icon_button'
import $ from './stylesheets/main'
import colors from './stylesheets/colors'

import BleClient from './lib/ble_client'

import {
  Alert,
  AsyncStorage,
  AppRegistry,
  Text,
  View
} from 'react-native';

class BoardGameTimer_App extends Component {
  constructor(props){
    super(props);

    this.updateCurrentGame = this.updateCurrentGame.bind(this);
    this.handleBlePress = this.handleBlePress.bind(this);
    this.updateMessageFromBle = this.updateMessageFromBle.bind(this);

    let connect = () => this.setState({ble: true})
    let disconnect = () => this.setState({ble: false})
    this.bleClient = new BleClient(
      connect,
      disconnect,
      this.updateMessageFromBle
    );

    this.state = {
      ble: this.bleClient.isConnected(),
      currentGame: {
        players: [],
        inProgress: false
      },
      messageFromBle: null
    }

    if (!this.state.ble){
      this.bleClient.connect();
    }
  }

  componentDidMount(){
    this.getCurrentGameFromStorage()
  }

  updateMessageFromBle(message){
    console.log("Message from Arduino", message.length, message)
    this.setState({messageFromBle: message});
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

  handleBlePress(){
    if(this.state.ble){
      let disconnect = this.bleClient.disconnect
      Alert.alert(
        'Disconnect?',
        'Are you sure you want to diconnect from the timer?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: this.bleClient.disconnect},
        ]
      )
    } else {
      this.bleClient.connect();
    }
  }

  render() {
    return (
      <View style={$.appBg}>
        <View style={$.appBar}>
          <View style={{position: 'absolute', left: 10, top: 20}}>
            <IconButton iconName={this.state.ble ? "bluetooth" : "bluetooth-disabled"} action={this.handleBlePress} color={'white'}/>
          </View>
          <Text style={$.appHeaderText}>Game Timer</Text>
        </View>
        <PlayerList bleClient={this.bleClient} connected={this.state.ble} style={$.flex} currentGame={this.state.currentGame} updateCurrentGame={this.updateCurrentGame}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('BoardGameTimer_App', () => BoardGameTimer_App);
