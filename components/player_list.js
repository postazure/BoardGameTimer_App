import React, { Component } from 'react';
import ColorButton from './color_button';
import PlayerName from './player_name';
import ActionButton from './action_button';
import $ from '../stylesheets/main';
import {
  AsyncStorage,
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

    let ds = new ListView.DataSource({
      // Constantly update when game has not started
      rowHasChanged: (r1, r2) => r1 !== r2 || !this.state.inProgress
    });

    this.state = {
      dataSource: ds,
      players: [],
      inProgress: false,
    };

    this.renderPlayer = this.renderPlayer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.updatePlayerColor = this.updatePlayerColor.bind(this);
    this.updatePlayerName = this.updatePlayerName.bind(this);
  }

  componentDidMount(){
    AsyncStorage.getItem('players', (err, res) => {
      let players;
      if (err !== null || res === null){
        players = [
          {name: 'UserNameA', color: [255,0,0], id: 1},
          {name: 'UserNameB', color: [0,255,0], id: 2},
          {name: 'UserNameC', color: [0,0,255], id: 3},
          {name: 'UserNameD', color: [75,165,0], id: 4},
        ];
      } else {
        players = JSON.parse(res)
      }

      if(err !== null) {
        throw err;
      }
      this.setState({
        players: players,
        dataSource: this.state.dataSource.cloneWithRows(players)
      });
    })

    AsyncStorage.getItem('inProgress', (err, res) => {
      let progress = false;
      if(res !== null) {
        progress = JSON.parse(res);
      }
      if(err !== null) {
        throw err;
      }
      this.setState({inProgress: progress});
    });
  }

  updatePlayerColor(id, color){
    let playerList = Object.assign([], this.state.players);
    let player = playerList.find(p => p.id === id);
    player.color = color;
    this.setState({
      players: playerList,
      dataSource: this.state.dataSource.cloneWithRows(playerList)
    });
  }

  updatePlayerName(id, name){
    let playerList = Object.assign([], this.state.players);
    let player = playerList.find(p => p.id === id);
    player.name = name;
    this.setState({
      players: playerList,
      dataSource: this.state.dataSource.cloneWithRows(playerList)
    });
  }

  removePlayer(id){
    let newPlayers = Object.assign([], this.state.players);

    let player = newPlayers.find(p => p.id == id)
    newPlayers.splice(newPlayers.indexOf(player), 1);
    this.setState({
      players: newPlayers,
      dataSource: this.state.dataSource.cloneWithRows(newPlayers)
    })
  }

  addPlayer(){
    let maxId = 0;
    if (this.state.players.length > 1) {
      let playerIds = this.state.players.map(p => p.id);
      maxId = Math.max.apply(null, playerIds);
    }

    let newPlayer = {
      name: 'new player',
      color: [255,255,255],
      id: maxId + 1
    };

    let newPlayers = Object.assign([], this.state.players);
    newPlayers.push(newPlayer);
    this.setState({
      players: newPlayers,
      dataSource: this.state.dataSource.cloneWithRows(newPlayers)
    })
  }

  startGame(){
    AsyncStorage.setItem('players', JSON.stringify(this.state.players),() => {
      console.log("Saved Players")
    });
    AsyncStorage.setItem('inProgress', JSON.stringify(true),() => {
      console.log("Saved Progress")
    });
    // Send to timer via bluetooth
    this.setState({inProgress: true});
  }

  stopGame(){
    AsyncStorage.setItem('inProgress', JSON.stringify(false));
    // Compute final data
    this.setState({inProgress: false});
  }

  render() {
    let actionButton;
    if (this.state.inProgress) {
      actionButton = <ActionButton action={this.stopGame} label={'Stop'}/>
    } else {
      actionButton = (
      <ActionButton action={this.startGame} label={'Start'}/>
      )
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
        {this.state.inProgress ?null: <ActionButton action={this.addPlayer} label={'+Player'} />}
      </View>

      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderPlayer}
      enableEmptySections={true}
      />

      <Text style={$.note}>
      Note: Times calculated when timer is paused.
      </Text>

      </View>
    );
  }

  renderPlayer(player) {
    return (
      <View style={[$.header, $.playerRow]} key={player.id}>
      {
        this.state.inProgress ?null:
        <ActionButton action={() => this.removePlayer(player.id)} label={'X'} />
      }


      <ColorButton
      color={player.color}
      playerId={player.id}
      playerName={player.name}
      updatePlayerColor={this.updatePlayerColor}
      style={$.colorButton}
      />

      <View style={$.playerName}>
      <PlayerName name={player.name} updatePlayerName={this.updatePlayerName} playerId={player.id} style={$.title}/>
      </View>

      <View style={$.playerTime}>
      <Text style={$.subtitle}>Total: {prettyMS(1234567)} </Text>
      <Text style={$.subtitle}>Average: {prettyMS(123456)} </Text>
      </View>
      </View>
    );
  }
}
