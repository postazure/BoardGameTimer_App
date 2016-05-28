import React, { Component } from 'react';
import $ from '../stylesheets/main';
import {
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

export default class ActionButton extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.action} style={$.actionButton}>
        <Text style={$.title}>{this.props.label}</Text>
      </TouchableHighlight>
    );
  }
}
