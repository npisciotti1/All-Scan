import React from 'react';

import { Button, StyleSheet, View, Text } from 'react-native';

import ImagePicker from 'react-native-image-picker';
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

    this.uploadImg = this.uploadImg.bind(this)
    this.selectImgAndUpload = this.selectImgAndUpload.bind(this);
  }

  uploadImg() {
    let data = RNFetchBlob.fs.readFile('/Users/nikko/Documents/all-scan/assets/test2.jpeg', 'base64')
    .then( data => {
      console.log('data?', data);

      RNFetchBlob.fetch('POST', 'http://localhost:3000/api/analyze', {
        'content-type': 'octet-stream',
      }, data)
      .uploadProgress((written, total) => {
        console.log('uploaded', written / total)
      })
      .then( res => {
        console.log('success:', res);
      })
      .catch( err => {
        console.log('error:', err);
      })
    })

  }

  selectImgAndUpload() {

    ImagePicker.showImagePicker( response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      // else if (response.error) {
      //   console.log('ImagePicker Error: ', response.error);
      // }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ imgSource: source });
        this.uploadImg();
      }
    });
  }


  render() {
    return(
      <View style={styles.container}>
        <Button
          onPress={this.selectImgAndUpload}
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
