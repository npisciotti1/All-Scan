import RNFetchBlob from 'react-native-fetch-blob';


export default uploadImage = (base64Img) => {
  /* https://async-redux-backend.herokuapp.com/ */

  return new Promise((resolve, reject) => {
    RNFetchBlob.fetch(
      'POST',
      'https://async-redux-backend.herokuapp.com/api/analyze',
      { 'Content-Type': 'multipart/form-data' },
      [{ name: 'imageToExtract', filename: 'imageToExtract.jpeg', data: base64Img }
    ])
    .then( res => resolve(res))
    .catch( err => reject(res))
  })
}
