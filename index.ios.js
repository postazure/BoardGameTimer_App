import React, { Component } from 'react';
import PlayerList from './components/player_list'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class BoardGameTimer_App extends Component {
  render() {
    return (
      <View style={[s.container, {marginTop: 20}]}>
        <PlayerList style={s.container}/>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3'
  }
});

AppRegistry.registerComponent('BoardGameTimer_App', () => BoardGameTimer_App);
