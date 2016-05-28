import {StyleSheet} from 'react-native';
import typography from './typography'
import item_grid from './item_grid'
import buttons from './buttons'

const main = {
  bgColor: {
    backgroundColor: 'rgb(70,70,70)',
  },

  flex: {
    flex: 1,
  },

  playerRow: {
    backgroundColor: '#bbb',
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 5,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  rightContainer: {
    flex: 1,
  },

  border: {
    borderWidth: 2,
    borderColor: 'black'
  },

  modal: {
    backgroundColor: 'rgba(80,80,80,0.8)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white'
  },

  colorButton: {
    flex: 0.20
  },

  playerName: {
    flex: 0.40
  },

  playerTimes: {
    flex: 0.40
  },

  flexRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  }
};

export default StyleSheet.create(Object.assign({}, main, typography, item_grid, buttons));
