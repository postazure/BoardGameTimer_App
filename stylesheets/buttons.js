import colors from './colors'

export default {
  actionBar: {
    borderColor: colors.lightGrey,
    borderBottomWidth: 1,
    marginBottom: 3,
  },

  actionButton: {
    padding: 10,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },

  actionButtonText: {
    fontSize: 16,
    color: colors.darkBlue
  },

  actionButtonTextDanger: {
    fontSize: 16,
    color: colors.pink
  },

  actionButtonTextSuccess: {
    fontSize: 16,
    color: colors.teal
  }
}
