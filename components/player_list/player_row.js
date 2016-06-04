import React, { Component } from 'react';
import ColorButton from './color_button';
import PlayerName from './player_name';
import ActionButton from '../action_button';
import $ from '../../stylesheets/main';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import prettyMS from 'pretty-ms';

export default class PlayerRow extends Component {
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
          <ActionButton
            action={() => this.props.removePlayer(player.id)} label={'X'} type={'danger'}/>
        }
      </View>
    );
  }
}
