import ImagePicker from 'react-native-image-picker';

export default pickImageProm = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker( response => {
      if (response.didCancel) {
        return reject(console.log('User cancelled image picker'));
      }
      else if (response.error) {
        return reject(console.log('ImagePicker Error: ', response.error));
      }
      else if (response.customButton) {
        return reject(console.log('User tapped custom button: ', response.customButton));
      }
      else {
        let result = {
          source: { uri: response.uri },
          data: response.data,
        };
        return resolve(result);
      }
    });
  })
}
