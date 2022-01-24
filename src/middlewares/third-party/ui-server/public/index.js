fetch('http://localhost:5402/different-origin')
  .then((val) => val.json())
  .then((data) => {
    console.log('Response from http://localhost:5402');
    console.log(data);
  });
