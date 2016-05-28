import React, { Component } from 'react';
import PlayerList from './components/player_list'
import $ from './stylesheets/main'
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

class BoardGameTimer_App extends Component {
  render() {
    return (
      <View style={[$.bgColor, $.flex, {marginTop: 20}]}>
        <PlayerList style={$.flex}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('BoardGameTimer_App', () => BoardGameTimer_App);
