import React from 'react';

import { Button, StyleSheet, View, Text, Image } from 'react-native';

// import Uploader from 'base64-image-uploader';
import pickImageProm from '../../lib/pickImage';
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
    this.selectImg = this.selectImg.bind(this);
  }

  selectImg() {
    pickImageProm()
    .then( res => {
      this.setState({imgSource: res.source, data: res.data})
      console.log('this.state:', this.state);
    })
    .catch(err => console.error('__ERROR__: ', err));
  }

  uploadImg() {
    if(!this.state.imgSource) {
      return console.error('no image selected!')
    }
    RNFetchBlob.fetch('POST', 'http://localhost:3000/api/analyze', {
      'Content-Type': 'multipart/form-data'
    }, [
      { name: 'info', data: 'test'},
      { name: 'image', filename: 'test2.jpeg', data: this.state.data}
    ])
    .then( res => {
      console.log('success:', res);
    })
    .catch( err => {
      console.log('error:', err);
    })
  }


  render() {
    let img = this.state.imgSource == null ? null :
    <Image
    source={this.state.imgSource}
    style={{height:200, width: 200}}
    />
    return(
      <View style={styles.container}>
        {img}
        <Button
          onPress={this.selectImg}
          accessabilityLabel="Press to take a picture"
          title="Choose an Image"
        />
        <Button
          onPress={this.uploadImg}
          accessabilityLabel="Press to upload the image"
          title="Upload Image"
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
