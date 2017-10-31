import React from 'react';
import Camera from 'react-native-camera';

import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';

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

    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    let camOps = {};

    this.camera.capture({metadata: camOps})
    .then( img => {

    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureQuality='low'
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
        </Camera>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
