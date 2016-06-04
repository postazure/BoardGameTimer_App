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
      <Text style={$.h1White}>
      Select Color
      </Text>
      <View style={$.list}>
      {palette}
      </View>
      </View>
    )
  }

  buildPalette(){
    palette = [];
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        for(let k = 0; k < 3; k++){
          palette.push([i*85, j*85, k*85]);
        };
      };
    };
    return palette;
  }
}

let bg = (color) => {
  let colorStr = color.join(',');
  return {
    backgroundColor: `rgb(${colorStr})`
  }
}
