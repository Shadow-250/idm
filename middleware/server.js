const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

const config = require('./config');

// Disabled header
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(cors());
// Parse request
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/userIdm', require('./routes/auth'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});
