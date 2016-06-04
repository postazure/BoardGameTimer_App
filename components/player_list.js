import React, { Component } from 'react';
import ColorButton from './color_button';
import PlayerName from './player_name';
import PlayerRow from './player_row'
import ActionButton from './action_button';
import $ from '../stylesheets/main';
import {
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  ListView
} from 'react-native';
import prettyMS from 'pretty-ms';

export default class PlayerList extends Component {
  constructor(props){
    super(props);

    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.updatePlayerColor = this.updatePlayerColor.bind(this);
    this.updatePlayerName = this.updatePlayerName.bind(this);
  }

  players(){
    return this.props.currentGame.players;
  }

  updatePlayerColor(id, color){
    let players = Object.assign([], this.players());
    let player = players.find(p => p.id === id);
    player.color = color;

    this.updatePlayers(players);
  }

  updatePlayerName(id, name){
    let players = Object.assign([], this.players());
    let player = players.find(p => p.id === id);
    player.name = name;

    this.updatePlayers(players);
  }

  removePlayer(id){
    let players = Object.assign([], this.players());
    let player = players.find(p => p.id == id);

    players.splice(players.indexOf(player), 1);
    this.updatePlayers(players)
  }

  addPlayer(){
    let maxId = 0;

    if (this.players().length > 1) {
      let playerIds = this.players().map(p => p.id);
      maxId = Math.max.apply(null, playerIds);
    }

    let newPlayer = {name: 'new player', color: [255,255,255], id: maxId + 1};

    let players = Object.assign([], this.players());
    players.push(newPlayer);

    this.updatePlayers(players)
  }

  updatePlayers(newPlayersState){
    this.props.updateCurrentGame({players: newPlayersState})
  }

  updateInProgress(newInProgressState){
    this.props.updateCurrentGame({inProgress: newInProgressState})
  }

  startGame(){
    // Send to timer via bluetooth
    this.updateInProgress(true)
  }

  stopGame(){
    // Compute final data
    this.updateInProgress(false)
  }

  render() {
    let actionButton;
    if (this.props.currentGame.inProgress) {
      actionButton = <ActionButton action={this.stopGame} label={'Stop'}/>
    } else {
      actionButton = (
      <ActionButton action={this.startGame} label={'Start'}/>
      )
    }

    let playerRows = this.players().map((player) => {
      return <PlayerRow
        key={player.id}
        player={player}
        inProgress={this.props.currentGame.inProgress}
        removePlayer={this.removePlayer}
        updatePlayerColor={this.updatePlayerColor}
        updatePlayerName={this.updatePlayerName}/>
    })

    return (
      <View style={$.playerList}>

      <View style={$.header}>
        <Text style={$.h1White}>
          Player List
        </Text>
      </View>

      <View style={[$.flexRow, {marginBottom: 10}]}>
        {actionButton}
        {this.props.currentGame.inProgress ?null: <ActionButton action={this.addPlayer} label={'+Player'} />}
      </View>

      {playerRows}

      <Text style={$.note}>
      Note: Times calculated when timer is paused.
      </Text>

      </View>
    );
  }
}
