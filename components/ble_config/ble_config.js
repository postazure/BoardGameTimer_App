import React, { Component } from 'react';
import $ from '../../stylesheets/main';
import {Buffer} from 'buffer';
import ActionButton from '../action_button'
import {
  Text,
  View
} from 'react-native';

let noble = require('noble');

const TARGE_BLE_DEVICE_NAME = 'zeus'

export default class BleConfig extends Component {
  constructor(props){
    super(props);

    this.onPeripheralFound = this.onPeripheralFound.bind(this);
    this.getCharacteristic = this.getCharacteristic.bind(this);
    this.writeToBle = this.writeToBle.bind(this);

    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.disconnect = this.disconnect.bind(this);

    this.state = {
      btCharacteristic: null,
      peripheral: null
    }
  }

  componentWillMount(){
    noble.on('stateChange', this.onStateChange);
    noble.on('discover', this.onPeripheralFound);
  }

  componentWillUnMount(){
    noble.stopScannning();
  }

  onStateChange(state) {
    if (state === 'poweredOn') {
      noble.startScanning();
    } else {
      noble.stopScanning();
    }
  }

  onPeripheralFound(peripheral) {
    if (peripheral.advertisement.localName === TARGE_BLE_DEVICE_NAME){
      this.getCharacteristic(peripheral);
    }
  }

  getCharacteristic(peripheral){
    peripheral.connect((err) => {
      this.setState({peripheral: peripheral})
      peripheral.once('disconnect', () => {
        this.setState({peripheral: null, btCharacteristic: null})
        console.log('disconnected')
      });

      peripheral.discoverAllServicesAndCharacteristics((err, services, characteristics) => {
        this.setState({btCharacteristic: characteristics[0]})
      })
    });
  }

  writeToBle(str){
    let buf = Buffer.from(str);
    this.state.btCharacteristic.write(buf, true);
  }

  turnOn(){
    this.writeToBle("on");
  }

  turnOff(){
    this.writeToBle("off");
  }

  disconnect(){
    this.state.peripheral.disconnect();
  }

  connect(){
    noble.stopScanning();
    noble.startScanning();
  }

  render() {
    if(!this.state.btCharacteristic){
      return (
        <View>
          <Text style={$.h1White}>Not Connected</Text>
          <ActionButton label={"Connect"} action={this.connect} />
        </View>
      )
    }

    return (
      <View>
        <Text style={$.h1White}>Connected</Text>
        <ActionButton label={"On"} action={this.turnOn} />
        <ActionButton label={"Off"} action={this.turnOff} />
        <ActionButton label={"Disconnect"} action={this.disconnect} />
      </View>
    );
  }
}
