import React, { Component } from 'react';
import ColorButton from './color_button';
import PlayerName from './player_name';
import IconButton from '../icon_button';
import $ from '../../stylesheets/main';
import colors from '../../stylesheets/colors';
import {
  Alert,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import prettyMS from 'pretty-ms';

export default class PlayerRow extends Component {
  constructor(props){
    super(props);
    this.handleRemovePlayer = this.handleRemovePlayer.bind(this)
  }

  handleRemovePlayer(player){
    Alert.alert(
      `Delete ${ player.name.length > 0 ? player.name : 'Player' }`,
      'Are you sure you want to delete this player?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.props.removePlayer(player.id)},
      ]
    )
  }

  render() {
    let player = this.props.player;

    return (
      <View style={$.playerRow}>
        <ColorButton
        color={player.color}
        playerId={player.id}
        playerName={player.name}
        updatePlayerColor={this.props.updatePlayerColor}
        />

        <View style={{flex: 0.4}}>
          <PlayerName
            name={player.name}
            updatePlayerName={this.props.updatePlayerName}
            playerId={player.id}/>
        </View>

        <View style={$.playerTime}>
          <Text style={$.subtitle}>Total: {prettyMS(1234567)} </Text>
          <Text style={$.subtitle}>Average: {prettyMS(123456)} </Text>
        </View>

        {
          this.props.inProgress ?null:
          <IconButton
            action={() => this.handleRemovePlayer(player)} iconName="remove-circle" color={colors.pink}/>
        }
      </View>
    );
  }
}
