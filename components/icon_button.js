import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import $ from '../stylesheets/main';
import {
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class IconButton extends Component {
  render() {
    let color = 'white';
    if (this.props.color.length > 0){
      color = this.props.color
    }

    return (
      <TouchableOpacity onPress={this.props.action} style={$.actionButton}>
        <Icon name={this.props.iconName} size={25} color={color}/>
      </TouchableOpacity>
    );
  }
}
