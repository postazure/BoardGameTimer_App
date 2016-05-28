import React, { Component } from 'react';
import ColorPalette from './color_palette';
import $ from '../stylesheets/main';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
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
    this.props.updatePlayerColor(this.props.playerId, color);
    this.setState({
      paletteOpen: false,
      color: color
    })
  }

  render() {
    return(
      <View>
      <Modal visible={this.state.paletteOpen} transparent={true} animationType={'slide'}>
        <View style={$.flex}></View>
        <ColorPalette closePalette={this.closePalette} playerName={this.props.playerName}/>
      </Modal>

      <TouchableHighlight onPress={this.openPalette}>
        <View style={[selected(this.state.color), $.border]}></View>
      </TouchableHighlight>
      </View>
    )
  }
}

let selected = (color) => {
  let colorStr = color.join(',');
  return {
    width: 58,
    height: 58,
    margin: 3,
    backgroundColor: `rgb(${colorStr})`
  }
}
