import React, {Component} from 'react'
import {StyleSheet} from 'react-native'

const LINE_HEIGHT = 50;

const Styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    height: LINE_HEIGHT,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderBottomColor: Skin.lightBlue,
  },
  rowInner: {
    flex: 1,
  },
  rows: {
    flexDirection: 'row',
    flex: 1,
  },
  textWrapper: {
    flex: 1,
    marginTop: 5,

  },
  mainText: {
    fontSize: 20
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeText: {
    fontSize: 8,
    color: '#aaa'
  },
  resultWrapper: {
    marginTop: 5
  },
  resultText: {
    color: 'gray',
    fontSize: 12
  },
  operWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  operBtn: {
    position: 'relative',
    top: -1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    marginRight: 8
  },
  lastOperBtn: {
    marginRight: 0
  }
});

export default Styles;
