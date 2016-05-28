import React, { Component } from 'react';
import ColorPalette from './color_palette';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';

export default class ColorButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      paletteOpen: false,
      color: props.color
    };

    this.closePalette = this.closePalette.bind(this);
    this.openPalette = this.openPalette.bind(this);
  }

  openPalette(){
    this.setState({
      paletteOpen: true
    })
  }

  closePalette(color){
    this.setState({
      paletteOpen: false,
      color: color
    })
  }

  render() {
    return(
      <View>
      <Modal visible={this.state.paletteOpen}>
        <ColorPalette closePalette={this.closePalette}/>
      </Modal>

      <TouchableHighlight onPress={this.openPalette}>
        <View style={[selected(this.state.color), s.border]}></View>
      </TouchableHighlight>
      </View>
    )
  }
}

let selected = (color) => {
  let colorStr = color.join(',');
  return {
    width: 60,
    height: 60,
    backgroundColor: `rgb(${colorStr})`
  }
}

var s = StyleSheet.create({
  border: {
    borderWidth: 2,
    borderColor: 'black'
  }
});
