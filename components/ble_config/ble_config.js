import React, { Component } from 'react';
import $ from '../../stylesheets/main';
import {Buffer} from 'buffer';
import {
  Text,
  View
} from 'react-native';

let noble = require('noble');

export default class BleConfig extends Component {
  constructor(props){
    super(props);
    this._printPeripheral = this._printPeripheral.bind(this);
    this._onPeripheralFound = this._onPeripheralFound.bind(this);
    this._writeToPeripheral = this._writeToPeripheral.bind(this);
    this._connectToBLE = this._connectToBLE.bind(this);
  }

  componentWillMount(){
    noble.on('stateChange', this._onStateChange);
    noble.on('discover', this._onPeripheralFound);
  }

  componentWillUnMount(){
    noble.stopScannning();
  }

  _onStateChange(state) {
    if (state === 'poweredOn') {
      noble.startScanning();
    } else {
      noble.stopScanning();
    }
  }

  _onPeripheralFound(peripheral) {
    if (peripheral.advertisement.localName === "zeus"){
      this._printPeripheral(peripheral);
      this._writeToPeripheral(peripheral);
    }
  }

  _writeToPeripheral(peripheral){
    peripheral.connect((err) => {
      peripheral.once('disconnect', () => {
        console.log('disconnected')
      });

      console.log('connect', err)

      peripheral.discoverAllServicesAndCharacteristics((err, services, characteristics) => {
        console.log("discovered characteristics", services[0].uuid, characteristics[0].uuid);

        let buf = Buffer.from("on")
        characteristics[0].write(buf, true);
      })
    });
  }

  _printPeripheral(peripheral) {
    console.log('peripheral discovered (' + peripheral.id +
                ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
                ' connectable ' + peripheral.connectable + ',' +
                ' RSSI ' + peripheral.rssi + ':');
    console.log('\thello my local name is:');
    console.log('\t\t' + peripheral.advertisement.localName);
    console.log('\tcan I interest you in any of the following advertised services:');
    console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

    var serviceData = peripheral.advertisement.serviceData;
    if (serviceData && serviceData.length) {
      console.log('\there is my service data:');
      for (var i in serviceData) {
        console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
      }
    }
    if (peripheral.advertisement.manufacturerData) {
      console.log('\there is my manufacturer data:');
      console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
    }
    if (peripheral.advertisement.txPowerLevel !== undefined) {
      console.log('\tmy TX power level is:');
      console.log('\t\t' + peripheral.advertisement.txPowerLevel);
    }

    console.log();
  }

  render() {
    return (
      <View>
        <Text>No BLE</Text>
      </View>
    );
  }
}
