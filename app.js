const express = require('express');
const app = new express();
const port = 3333;
const es6Renderer = require('express-es6-template-engine');
const path = require('path');
const rootController = require('./routes/index');



app.use(express.static(path.join(__dirname,'public')))
//home route
app.engine('html',es6Renderer);
app.set('views','views');
app.set('view engine', 'html');

app.use('/', rootController);

app.use('/cds', require('./routes/cds'));


app.listen(port, () => {
  console.log(`YO, Listening at http://localhost:${port}`)
});