import React, { Component } from 'react';
import $ from '../../stylesheets/main';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

export default class ColorPalette extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSelecting: false,
      color: props.color,
      paletteColors: this.buildPalette()
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(rgb){
    this.props.closePalette(rgb);
  }

  render() {
    let palette = this.state.paletteColors.map((rgb) => {
      return(
        <TouchableHighlight key={rgb} onPress={() => {this.handlePress(rgb)}}>
          <View style={[bg(rgb), $.border, $.item]}></View>
        </TouchableHighlight>
      )
    });

    return(
      <View style={$.modal}>
      <Text style={$.title}>
      Select Color
      </Text>
      <View style={$.list}>
      {palette}
      </View>
      </View>
    )
  }

  buildPalette(){
    return [
      [255,0,0],
      [0,255,0],
      [0,0,255],
      [255,255,0],
      [0,255,255],
      [255,0,255],
      [255,135,0],
    ]
  }
}

let bg = (color) => {
  let colorStr = color.join(',');
  return {
    backgroundColor: `rgb(${colorStr})`
  }
}
