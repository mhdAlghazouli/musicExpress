const express = require('express');
const app = new express();
const port = 3333;
const path = require('path');
const db = require('./data');
console.log(db)

app.use(express.static(path.join(__dirname,'public')))
//home route
app.get('/', (req,res) => {
  res.send(`
  <h1>${db[0].artist}</h1>
  <img src="/images/LIL_WAYNE_BY_CHRIS_ALLMEID.jpeg" width="200" height="200"/>
  <p>Dwayne Michael Carter Jr. (born September 27, 1982), known professionally as Lil Wayne, is an American rapper, singer, songwriter and record executive.</p>
  <img src="/images/Lil_Wayne.webp" width="200" height="200"/>
  <p>He is commonly regarded as one of the most influential hip hop artists of his generation,and often cited as one of the greatest rappers of all time.</p>
  <a href="/cds"><button>Go CDS</button></a>
  `);
});
//albums route
app.get('/cds',(req,res) => {
  let htmlStr = '';
  htmlStr += `<ul>`;
  db.map(cd => {
    htmlStr += `<li><a href="/cds/${cd.name}">${cd.name}</a></li>`
  });
  htmlStr += `</ul>`
  htmlStr += `<a href="/"><button>Go Home</button></a>`
  res.send(htmlStr);
});
//cd route
app.get('/cds/:handle', (req,res) => {
  const { handle } = req.params;
  const cd = db.find(person => person.name === handle);
  if(cd) {
    let htmlData = "";
    htmlData += `<h1>${cd.name}</h1>`;
    htmlData += `<img src="/${cd.imgURL}" width="200" height="200"/>`;
    htmlData += `<h3>publish Date: ${cd.publishDate}</h3>`;
    htmlData += `<h3>artist: ${cd.artist}</h3>`;
    htmlData += `<h3>Songs:</h3>
                <ul>  
                  <li>${cd.songTitles[0]}</li>
                  <li>${cd.songTitles[1]}</li>
                  <li>${cd.songTitles[2]}</li>
                  <li>${cd.songTitles[3]}</li>
                </ul>`
    htmlData += `<a href="/cds"><button>Go back</button></a>`;
    res.send(htmlData);

  }else {
    res.send(`sorry, no cd is found with the handle ${handle}`)
  }
});



app.listen(port, () => {
  console.log(`YO, Listening at http://localhost:${port}`)
});