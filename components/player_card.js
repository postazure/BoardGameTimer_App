import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

export default class PlayerList extends Component {
  constructor(props){
    super(props);

    sampleData = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    players = [
      {name: 'UserNameA', color: '255,0,0'},
      {name: 'UserNameB', color: '0,255,0'},
      {name: 'UserNameC', color: '0,0,255'},
      {name: 'UserNameD', color: '75,165,0'},
    ];

    this.state = {
      dataSource: sampleData.cloneWithRows(players)
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>
          Player List
        </Text>

        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPlayer}
        />

        <Text style={{color: 'white', marginTop: 10, textAlign: 'center'}}>
          Note: Times calculated when timer is paused.
          </Text>
      </View>
    );
  }

  renderPlayer(player) {
    return (
      <View style={styles.playerRow}>
        <View style={colorPicker(player)}>
          <Text style={styles.subtitle}>{player.color}</Text>
        </View>

        <View style={styles.rightContainer}>
          <Text style={styles.title}>{player.name}</Text>

        </View>

        <View style={styles.rightContainer}>
        <Text style={styles.subtitle}>Total: 00h 00m 00s </Text>
        <Text style={styles.subtitle}>Average: 00m 00s </Text>
        </View>
      </View>
    );
  }
}

let colorPicker = (player) => {
  return {
    width: 60,
    height: 60,
    marginRight: 20,
    backgroundColor: `rgb(${player.color})`
  }
}

var styles = StyleSheet.create({
  playerRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#bbb',
    borderWidth: 1,
    borderColor: '#ff6600'
  },

  rightContainer: {
    flex: 1,
  },

  h1: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white'
  },

  title: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'left',
    color: 'black'
  },

  subtitle: {
    textAlign: 'left',
    color: 'black'
  },
});
