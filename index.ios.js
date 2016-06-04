import React, { Component } from 'react';
import PlayerList from './components/player_list'
import BleConfig from './components/ble_config/ble_config'
import $ from './stylesheets/main'
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

class BoardGameTimer_App extends Component {
  constructor(props){
    super(props);

    this.state = {
      ble: null
    }
  }

  render() {
    if(!this.state.ble) {
      return (
        <View style={[$.bgColor, $.flex, {marginTop: 20}]}>
          <BleConfig />
        </View>
      )
    }

    return (
      <View style={[$.bgColor, $.flex, {marginTop: 20}]}>
        <PlayerList style={$.flex}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('BoardGameTimer_App', () => BoardGameTimer_App);
