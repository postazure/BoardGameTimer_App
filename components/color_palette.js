import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
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
          <View style={[bg(rgb), s.border, s.item]}></View>
        </TouchableHighlight>
      )
    });

    return(
      <ScrollView horizontal={false} style={{marginVertical: 20}}>
      <Text style={s.h1}>
      Select Color
      </Text>
      <View style={s.list}>
      {palette}
      </View>
      </ScrollView>
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

var s = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'black'
  },

  list: {
    marginVertical: 10,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  item: {
    margin: 2,
    width: 30,
    height: 30
  },

  h1: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
});
