import React, { Component } from 'react';
import $ from '../stylesheets/main';
import {
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class ActionButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.action} underlayColor={'#EBF9FF'} style={$.actionButton}>
        <Text style={$.actionButtonText}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}
