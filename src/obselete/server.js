const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;
module.exports = (app) => {

app.use(cors());

app.get('/random-image', (req, res) => {
  const imageFolder = path.join(__dirname, 'images');
  fs.readdir(imageFolder, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading image directory');
      return;
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    const randomImage = files[randomIndex];
    const imagePath = path.join(imageFolder, randomImage);
    res.sendFile(imagePath);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
};