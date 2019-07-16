const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('../schema/schema');


const app = express();
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).send('This is a test from the server');
});

app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(8081, () => {
    console.log('server started....');
});
