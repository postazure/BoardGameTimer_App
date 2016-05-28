import {StyleSheet} from 'react-native';
import typography from './typography'
import item_grid from './item_grid'

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
    borderRadius: 5
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

  playerList: {

  }
};

export default StyleSheet.create(Object.assign({}, main, typography, item_grid));
