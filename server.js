//access to our database file and our configuration directory.




const app = require('express')();
const port = 4500;

require('./src/backend/config/database')

const UserRouter = require('./api/api/User')

const BodyParser = require('express').json;
app.use(BodyParser());


app.use('/user', UserRouter)


app.listen(port, () => {

    console.log(`Server running on port, ${port}`);

})

