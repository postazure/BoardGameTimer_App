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
    // Send to timer via bluetooth
    // this.props.bleClient.write("on");
    this.props.bleClient.write("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor faucibus velit. Integer maximus volutpat ante non rutrum. Aliquam ut elit eu enim aliquam pulvinar in ac justo. Aenean condimentum euismod neque eu maximus. Curabitur vel felis aliquet, iaculis sapien nec, facilisis arcu. Donec mauris metus, suscipit accumsan velit a, congue auctor nisi. Vestibulum vel sodales nisl.");
    this.updateInProgress(true)
  }

  stopGame(){
    // Compute final data
    this.props.bleClient.write("off");
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
