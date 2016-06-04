const noble = require('noble');
import {Buffer} from 'buffer';
const TARGE_BLE_DEVICE_NAME = 'zeus';

export default class BleClient {
  constructor(callWhenConnected, callWhenDisconnected, callWhenNotified){
    this.callWhenNotified = callWhenNotified.bind(this); // probably want to pass method to set state
    this.callWhenConnected = callWhenConnected.bind(this);
    this.callWhenDisconnected = callWhenDisconnected.bind(this);

    this.peripheral;
    this.characteristic;
    this.lastMessageReceived;

    this._onPeripheralFound = this._onPeripheralFound.bind(this);
    this._getCharacteristic = this._getCharacteristic.bind(this);
    this._readFromBle = this._readFromBle.bind(this);

    this.disconnect = this.disconnect.bind(this);

    noble.on('discover', this._onPeripheralFound);
  }

  isConnected(){
    return this.peripheral && this.characteristic;
  }

  connect(){
    noble.stopScanning();
    noble.startScanning();
  }

  disconnect(){
    this.peripheral.disconnect();
  }

  write(str){
    let buf = Buffer.from(str);
    this.characteristic.write(buf, true);
  }

  scan(){
    noble.startScanning()
  }

  scanStop(){
    noble.stopScanning();
  }

  _readFromBle(buf){
    console.log("reading buffer", buf);
    this.lastMessageReceived = buf.toString();
    this.callWhenNotified(buf.toString());
  }

  _onPeripheralFound(peripheral) {
    if (peripheral.advertisement.localName === TARGE_BLE_DEVICE_NAME){
      this._getCharacteristic(peripheral);
    }
  }

  _getCharacteristic(peripheral){
    peripheral.connect((err) => {
      this.peripheral = peripheral;
      this.callWhenConnected()

      peripheral.once('disconnect', () => {
        this.peripheral = null;
        this.characteristic = null;
        this.callWhenDisconnected()
        console.log('disconnected')
      });

      peripheral.discoverAllServicesAndCharacteristics((err, services, characteristics) => {
        characteristics[0].notify(true);
        characteristics[0].on('data', this._readFromBle);
        this.characteristic = characteristics[0]
      })
    });
  }

}
