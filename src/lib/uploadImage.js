import RNFetchBlob from 'react-native-fetch-blob';


export default const uploadImage = (uri) => {
  /* https://async-redux-backend.herokuapp.com/ */

  return new Promise((resolve, reject) => {
    RNFetchBlob.fetch(
      'POST',
      'https://async-redux-backend.herokuapp.com/api/analyze',
      { 'Content-Type': 'multipart/form-data' },
      [{ name: 'imageToExtract', filename: 'imageToExtract.jpeg', data: uri }
    ])
    .then( res => resolve(res))
    .catch( err => reject(res))
  })
}
