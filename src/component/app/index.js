//@flow

import React from 'react';
import Provider from 'react-redux';

// import { NativeRouter, Route, Link } from 'react-router-native';
import { StyleSheet, View, Text } from 'react-native';

import Dashboard from '../dashboard';

export default class App extends React.Component {
  render() {
    return (
      <Dashboard />
    );
  }
}
