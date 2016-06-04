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
<<<<<<< HEAD
    this._printPeripheral = this._printPeripheral.bind(this);
    this._onPeripheralFound = this._onPeripheralFound.bind(this);
    this._writeToPeripheral = this._writeToPeripheral.bind(this);
    this._connectToBLE = this._connectToBLE.bind(this);
=======

    this._onStateChange = this._onStateChange.bind(this);
    this._onPeripheralFound = this._onPeripheralFound.bind(this);
>>>>>>> 9a359ea0858294c06a9d94d6c5b7b84228fd5ca8
  }

  componentWillMount(){
    noble.on('stateChange', this._onStateChange);
    noble.on('discover', this._onPeripheralFound);
  }

<<<<<<< HEAD
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
      // this._connectToBLE(peripheral);
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
        characteristics[0].write("on", true);
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

  _connectToBLE(peripheral){

    // const HEART_RATE_VALUE_FORMAT = 1;
    // function parseHR (bytes) {
    //   //Check for data
    //   if (bytes.length == 0)
    //   {
    //       return 0;
    //   }
    //
    //   //Get the first byte that contains flags
    //   var flag = bytes[0];
    //
    //   //Check if u8 or u16 and get heart rate
    //   var hr;
    //   if ((flag & 0x01) == 1)
    //   {
    //       var u16bytes = bytes.buffer.slice(1, 3);
    //       var u16 = new Uint16Array(u16bytes)[0];
    //       hr = u16;
    //   }
    //   else
    //   {
    //       var u8bytes = bytes.buffer.slice(1, 2);
    //       var u8 = new Uint8Array(u8bytes)[0];
    //       hr = u8;
    //   }
    //   return hr;
    // }
    //
    var self = this;
    // function print(data, notification){
    //   var heartRate = parseHR(data)
    //   console.log(heartRate);
    //   self.setState({
    //     heartRate:heartRate
    //   });
    // }

    var characteristic;
    function notify(error, services, characteristics){
      console.log("discovered characteristics", services[0].uuid, characteristics[0].uuid);
      self.characteristic = characteristics[0];
      console.log(self.characteristic)
      // self.characteristic.write("on", true)
      // self.characteristic.notify(true);
      // self.characteristic.on("data", print);
    };

    function disconnected(){
      console.log("disconnected");
      self.characteristic.removeListener('data', print);
      self._connectHeartRate(peripheral);
      self.setState({
        heartRate:0
      });
    };

    function discover(error){
      peripheral.once('disconnect', disconnected);
      console.log("connect", error);
      peripheral.discoverAllServicesAndCharacteristics(notify);
    }
    peripheral.connect(discover);
=======
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
>>>>>>> 9a359ea0858294c06a9d94d6c5b7b84228fd5ca8
  }


  render() {
    return (
      <View>
        <Text>No BLE</Text>
      </View>
    );
  }
}
