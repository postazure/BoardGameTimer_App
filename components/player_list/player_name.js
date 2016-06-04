import React, { Component } from 'react';
import $ from '../../stylesheets/main';
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
        style={$.playerNameInput}
        autoCorrect={false}
        multiline={false}
        clearButtonMode={'while-editing'} //iOS only
        onChangeText={(name) => this.updateState(name)}
        value={this.state.name}
      />
      </View>
    );
  }
}
