function App() {
  return <div></div>;
}

function uploadImage(image) {
  const url = "localhost:8000/image/uploaddesktop/";
  fetch(url, {
    method: 'POST',
    body: file,
    headers: {
      'content-type': image.type,
      'content-length': `${image.size}`
    }
  })
  .then(res => res.json())
  .then(data => console.log(`Successfully uploaded image: ${data}`))
  .catch(err => console.error(err));
}

export default App;
