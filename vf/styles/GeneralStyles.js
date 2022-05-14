import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  safeArea: {
    flex: 1,
  },
  safeAreaTop: {
    flex: 0,
    backgroundColor: '#fff'
},
  safeAreaGreen: {
    flex: 1,
    backgroundColor:'#869764'
  },
  whiteBackground: {
    zIndex: 1,
    flex: 1,
    backgroundColor: '#fff'
  },
  centerAlignView:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultFlex: {
    flex: 1
  },
  rowDirection: {
    flexDirection: 'row',
    zIndex: 1,
  },
  scrollFlex: {
    flexGrow: 1
  },
  viewAll: {
    color: '#969696',
    fontSize: 13
},
})