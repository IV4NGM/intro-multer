const { Router } = require('express');
const fs = require('fs');

const router = Router();

router.get('/', (req, res) => {
  const imageNames = [];
  const imagesFolder = './uploads';
  try {
    fs.readdirSync(imagesFolder).forEach(file => {
      imageNames.push(file)
    });
    const imageNamesRelative = imageNames.map(filename => '/uploads/' + filename)
    res.status(200).send(JSON.stringify(imageNamesRelative))
  } catch (error) {
    res.status(500).send('Something went wrong. Please try again. Error: ', error)
  }

})

module.exports = router;