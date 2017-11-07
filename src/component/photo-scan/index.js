
import React from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import { Button, StyleSheet, View, Text, Image } from 'react-native';

import pickImageProm from '../../lib/pickImage';

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
    })
    .catch(err => console.error('__ERROR__: ', err));
  }

  uploadImg() {
    if(!this.state.imgSource) {
      return console.error('no image selected!')
    } /* https://allscan-185022.appspot.com */
    RNFetchBlob.fetch('POST', 'https://allscan-185022.appspot.com/api/analyze', {
      'Content-Type': 'multipart/form-data'
    }, [
      { name: 'imageToExtract', filename: 'imageToExtract.jpeg', data: this.state.data }
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
