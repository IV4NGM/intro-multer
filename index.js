const express = require('express');
const app = express();

const fs = require('fs');

const uploadDir = 'uploads';

// Create the 'uploads' folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const fileuploadRouter = require('./routes/fileupload');
const getImagesRouter = require('./routes/images');
const deleteImagesRouter = require('./routes/delete')

app.use('/fileupload', fileuploadRouter);
app.use('/images', getImagesRouter);
app.use('/delete', deleteImagesRouter);

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hola');
})

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
  console.log(`http://localhost:${port}`)
});