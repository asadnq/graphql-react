const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolvers/index');
const auth = require('./middleware/auth');
const app = express();

app.use(bodyParser.json());

app.use(auth);

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}));    

mongoose.connect('mongodb+srv://asad:mmYgs0oqMYA0RCzV@cluster0-nr7jz.mongodb.net/react-graphql?retryWrites=true')
            .then(() => {
                app.listen(3000);
            })
            .catch(err => {
                console.log(err)
            });
