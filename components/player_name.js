import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

export default class PlayerName extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.name
    }
  }

  updateState(name){
    this.setState({name: name})
    this.props.updatePlayerName(this.props.playerId, name)
  }

  render() {
    return (
      <View>
      <TextInput
        style={{height: 30, marginLeft: 5}}
        autoCorrect={false}
        onChangeText={(name) => this.updateState(name)}
        value={this.state.name}
      />
      </View>
    );
  }
}
