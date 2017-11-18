import RNFetchBlob from 'react-native-fetch-blob';


export default uploadImage = (base64Img) => {

  let body = {
    requests: [
      {
        image: {
          content: base64Img
        },
        features: [
          {
            type: "TEXT_DETECTION"
          }
        ]
      }
    ]
  };
  return new Promise((resolve, reject) => {
    RNFetchBlob.fetch(
      'POST',
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`,
      { 'Content-Type': 'application/json' }, JSON.stringify(body)
      )
    .then( res => resolve(res))
    .catch( err => reject(res))
  })
}
