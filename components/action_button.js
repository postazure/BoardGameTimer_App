import React, { Component } from 'react';
import $ from '../stylesheets/main';
import {
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class ActionButton extends Component {
  render() {
    let textForType = $.actionButtonText;
    if (this.props.type) {
      textForType = {
        danger: $.actionButtonTextDanger,
        success: $.actionButtonTextSuccess
      }[this.props.type]
    }

    return (
      <TouchableOpacity onPress={this.props.action} style={$.actionButton}>
        <Text style={textForType}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}
