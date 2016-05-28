import React, { Component } from 'react';
import ColorButton from './color_button';
import PlayerName from './player_name';
import ActionButton from './action_button';
import $ from '../stylesheets/main';
import {
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  ListView
} from 'react-native';

export default class PlayerList extends Component {
  constructor(props){
    super(props);

    sampleData = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    players = [
      {name: 'UserNameA', color: [255,0,0], id: 1},
      {name: 'UserNameB', color: [0,255,0], id: 2},
      {name: 'UserNameC', color: [0,0,255], id: 3},
      {name: 'UserNameD', color: [75,165,0], id: 4},
    ];

    this.state = {
      dataSource: sampleData.cloneWithRows(players),
      players: players,
      inProgress: false
    };

    this.renderPlayer = this.renderPlayer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.updatePlayerColor = this.updatePlayerColor.bind(this);
    this.updatePlayerName = this.updatePlayerName.bind(this);
  }

  updatePlayerColor(id, color){
    let playerList = Object.assign([], this.state.players);
    let player = playerList.find(p => p.id == id);
    player.color = color;
    this.setState({
      players: playerList,
      dataSource: sampleData.cloneWithRows(playerList)
    });
  }

  updatePlayerName(id, name){
    let playerList = Object.assign([], this.state.players);
    let player = playerList.find(p => p.id == id);
    player.name = name;
    this.setState({
      players: playerList,
      dataSource: sampleData.cloneWithRows(playerList)
    });
  }

  addPlayer(){
    let playerIds = this.state.players.map(p => p.id);
    let maxId = Math.max.apply(null, playerIds);

    let newPlayer = {
      name: 'new player',
      color: [255,255,255],
      id: maxId + 1
    };

    let newPlayers = Object.assign([], this.state.players);
    newPlayers.push(newPlayer);
    this.setState({
      players: newPlayers,
      dataSource: sampleData.cloneWithRows(newPlayers)
    })
  }

  startGame(){
    // Send to timer via bluetooth
    this.setState({inProgress: true});
    console.log(this.state.players);
  }

  stopGame(){
    // Compute final data
    this.setState({inProgress: false});
  }

  render() {
    let actionButton;
    if (this.state.inProgress) {
      actionButton = <ActionButton action={this.stopGame} label={'Stop'}/>
    } else {
      actionButton = <ActionButton action={this.startGame} label={'Start'}/>
    }

    return (
      <View style={$.playerList}>

      <View style={$.header}>
        <Text style={$.h1White}>
          Player List
        </Text>
      </View>

      <View style={[$.flexRow, {marginBottom: 10}]}>
        {actionButton}
        <ActionButton action={this.addPlayer} label={'+Player'} />
      </View>

      <ScrollView horizontal={false}>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderPlayer}
      />
      </ScrollView>

      <Text style={$.note}>
      Note: Times calculated when timer is paused.
      </Text>

      </View>
    );
  }

  renderPlayer(player) {
    return (
      <View style={[$.header, $.playerRow]}>
      <ColorButton
      color={player.color}
      playerId={player.id}
      updatePlayerColor={this.updatePlayerColor}
      style={$.colorButton}
      />

      <View style={$.playerName}>
      <PlayerName name={player.name} updatePlayerName={this.updatePlayerName} playerId={player.id} style={$.title}/>
      </View>

      <View style={$.playerTime}>
      <Text style={$.subtitle}>Total: 00h 00m 00s </Text>
      <Text style={$.subtitle}>Average: 00m 00s </Text>
      </View>
      </View>
    );
  }
}
