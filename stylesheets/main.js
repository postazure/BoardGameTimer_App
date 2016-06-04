import {StyleSheet} from 'react-native';
import typography from './typography'
import item_grid from './item_grid'
import buttons from './buttons'
import player_list from './player_list'

import colors from './colors'

const main = {
  debug: {
    borderWidth: 2,
    borderColor: 'red'
  },

  appBg: {
    backgroundColor: colors.white,
    flex: 1
  },

  flex: {
    flex: 1,
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  appBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    marginBottom: 3,
    paddingTop: 30,
    paddingBottom: 15,

    backgroundColor: colors.lightBlue,

    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowColor: 'rgb(0,0,0)',
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },

  appHeaderText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.white
  },

  border: {
    borderWidth: 1,
    borderColor: colors.lightGrey
  },

  modal: {
    backgroundColor: colors.darkBlue,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowColor: 'rgb(0,0,0)',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  playerTimes: {
    flex: 0.40
  },

  flexRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  flexColumn: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },

};

export default StyleSheet.create(Object.assign({}, main, typography, item_grid, buttons, player_list));
