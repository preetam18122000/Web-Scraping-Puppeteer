const express = require('express');
const app = express();
const getRoutes = require('./routes/getRoutes');
const PORT = 3001;

//Middlewares
app.use(express.json());
app.use(express.static("public")); // for any html file
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', getRoutes);

app.listen(PORT, () => {
    console.log('Server is running');
});