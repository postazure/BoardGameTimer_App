import React, { Component } from 'react';
import PlayerRow from './player_row'
import IconButton from '../icon_button';
import $ from '../../stylesheets/main';
import colors from '../../stylesheets/colors';
import {
  Text,
  View
} from 'react-native';

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

    if (this.players().length > 0) {
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
    let leadingZeros = (num) => {
      let str = num.toString();
      switch (str.length) {
        case 1:
          return `00${str}`;
        case 2:
          return `0${str}`;
        default:
          return str;
      }
    };

    let players = this.players();
    let playersInfoString = '';
    for(let i = 0; i < players.length; i++){
      //id |r |g |b
      // 01255255255
      let id = players[i].id;
      let r = leadingZeros(players[i].color[0])
      let g = leadingZeros(players[i].color[1])
      let b = leadingZeros(players[i].color[2])

      playersInfoString += id < 10 ? `0${id}` : id;
      playersInfoString += r + g + b;
    }

    this.props.bleClient.write(playersInfoString);
    this.updateInProgress(true)
  }

  stopGame(){
    this.updateInProgress(false)
  }

  render() {
    let actionButton;
    if (this.props.currentGame.inProgress) {
      actionButton = <IconButton action={this.stopGame} iconName='stop' color={colors.darkBlue}/>
    } else {
      actionButton = (
      <IconButton action={this.startGame} iconName='play-arrow' color={colors.darkBlue}/>
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
      <View style={$.flex}>
      <View style={[$.actionBar, $.flexRow]}>
        {this.props.connected ? actionButton : null}
        {this.props.connected && !this.props.currentGame.inProgress ? <IconButton color={colors.darkBlue} action={this.addPlayer} iconName="person-add" /> : null}
      </View>

      <View style={[$.playerList, {flex: .9}]}>
      {playerRows}
      </View>

      <Text style={[$.note, {flex: .1}]}>
      Note: Add players.
      </Text>

      </View>
    );
  }
}
