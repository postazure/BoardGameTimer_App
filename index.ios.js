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
    let disconnect = () => {
      this.setState({ble: false});
      this.status('b');
    };

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
    this.status();
    this.getCurrentGameFromStorage();
  }

  updateMessageFromBle(message){
    console.log("message", message)
    if (message === "c" || message === "p" || message === "w"){
      this.status(message);
    } else {
      this.assignTimesToPlayers(message);
    }
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

  assignTimesToPlayers(message){
    let playerTimeInfoList = message.split(':').map(info => info.split(','));
    let players = Object.assign([], this.state.currentGame.players)
    players.forEach((player) => {
      let playerInfo = playerTimeInfoList.find(info => parseInt(info[0]) === player.id); // id, turns, time
      player.totalTurns = parseInt(playerInfo[1]);
      player.totalTime = parseInt(playerInfo[2]);
    });

    this.updateCurrentGame({players: players});
  }

  status(status){
    const noStatus = "Add players, then turn on your timer to play.";
    const noBluetooth = "Cannot find timer. Ensure the timer is on, and press the 'B' icon."
    const ready = "Press play when ready.";
    const calibrating = "The timer is calibrating. Make sure the lid is up."
    const working = "Flip the lid up to pause. Press stop to end the game."

    let newStatus;
    switch (status) {
      case 'c':
        newStatus = calibrating;
        break;
      case 'p':
        newStatus = ready;
        break;
      case 'w':
        newStatus = working;
        break;
      case 'b':
        newStatus = noBluetooth;
        break;
      default:
        newStatus = noStatus;
    }

    this.setState({message: newStatus});
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
      <PlayerList bleClient={this.bleClient}
      connected={this.state.ble}
      style={$.flex}
      currentGame={this.state.currentGame}
      updateCurrentGame={this.updateCurrentGame}
      stopGame={() => {this.status()}}/>
      <Text style={[$.note, {flex: .1}]}>
      Note: {this.state.message}
      </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('BoardGameTimer_App', () => BoardGameTimer_App);
