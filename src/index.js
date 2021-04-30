const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
    res.send('<html><head></head><body><p> Hello ! </p></body></html>')
});

app.listen(3001, () => {
    console.log("Listening on port 3000");
});



