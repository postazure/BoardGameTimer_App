import React, { Component } from 'react';
import $ from '../../stylesheets/main';
import {
  Text,
  View
} from 'react-native';

let noble = require('noble');

export default class BleConfig extends Component {
  constructor(props){
    super(props)

    this._onStateChange = this._onStateChange.bind(this);
    this._onPeripheralFound = this._onPeripheralFound.bind(this);
  }

  componentWillMount(){
    noble.on('stateChange', this._onStateChange);
    noble.on('discover', this._onPeripheralFound);
  }

  _onStateChange(state){
    if (state === 'poweredOn') {
     noble.startScanning(["180d"]);
    } else {
     noble.stopScanning();
    }
 }

  _onPeripheralFound(peripheral){
    // this._printPeripheral(peripheral);
    // this._connectHeartRate(peripheral);
  }


  render() {
    return (
      <View>
        <Text>No BLE</Text>
      </View>
    );
  }
}
