//access to our database file and our configuration directory.

require('./config/db');



const app = require('express')();
const port = 3000;

const UserRouter = require('./api/User')

const BodyParser = require('express').json;
app.use(BodyParser());


app.use('/user', UserRouter)


app.listen(port, () => {

    console.log(`Server running on port, ${port}`);

})

