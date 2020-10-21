const express = require('express');
const bodyParser = require('body-parser');
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
const app = module.exports = express();
app.use((req,res,next) => {
    console.log('[%s] %s -- %s', new Date(), req.method, req.url);
    next();
});

app.use(bodyParser.json());

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
}); 

//MONGO_URI="mongodb+srv://allaramo:8462795130.@bugtracker.ieri8.mongodb.net/?retryWrites=true&w=majority" npm run start

