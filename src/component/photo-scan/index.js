import React from 'react';

import { Button, StyleSheet, View, Text } from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';


//add react-native-image-resizer.

//Component will:
// - allow for photos to be taken then sent to the server.
// - the 'Camera' component will be nested inside of this one, 'PhotoScan'
// - Once the photo is taken, it should be compressed and sent to my api via the file uploader.
// - The server will then analyze the file for text, and send back the extracted text.
// - Either the client side app will make use of the extracted text, or the server, not sure yet.

export default class PhotoScan extends React.Component {
  constructor(props){
    super(props);

    this.state = {};

    this.testFunc = this.testFunc.bind(this);
  }

  testFunc() {
    console.log('I was clicked');
  }

  render() {
    return(
      <View style={styles.container}>
        <Button
          onPress={this.testFunc}
          accessabilityLabel="Press to take a picture"
          title="Scan Photo"
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  touchable: {
    color: 'blue',
    width: 50,
    height: 50,
  }
});
