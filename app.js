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
  htmlStr += `<table style="width:100%;border:1px solid #ccc">`;
  db.map(cd => {
    htmlStr += `<tr><th style="padding:10px;background-color:#eee"><a href="/cds/${cd.name}">${cd.name}</a></th></tr>`
  });
  htmlStr += `</table>`
  htmlStr += `<a href="/"><button style="width:100%">Go Home</button></a>`
  res.send(htmlStr);
});

//cd route
app.get('/cds/:handle', (req,res) => {
  const { handle } = req.params;
  const cd = db.find(person => person.name === handle);
  if(cd) {
    let htmlData = "";
    htmlData += `<h1 style="text-align:center;">${cd.name}</h1>`;
    htmlData += `<img src="/${cd.imgURL}" width="200" height="200" style="padding-left:43%"/>`;
    htmlData += `<table style="width:100%;border:1px solid #ccc">`
    htmlData += `<tr><th style="padding:10px;background-color:#eee">publish Date: ${cd.publishDate}</th></tr>`;
    htmlData += `<tr><th style="padding:10px;background-color:#eee">artist: ${cd.artist}</th></tr>`;
    htmlData += `<tr> 
                  <th style="padding:10px;background-color:#eee">
                    <ul style="list-style:none;">Songs: 
                      <li >${cd.songTitles[0]}</li>
                      <li>${cd.songTitles[1]}</li>
                      <li>${cd.songTitles[2]}</li>
                      <li>${cd.songTitles[3]}</li>
                    </ul>  
                  </th> 
                </tr>`
    htmlData += `</table>`
    htmlData += `<a href="/cds"><button style="width:100%">Go back</button></a>`;
    res.send(htmlData);

  }else {
    res.send(`sorry, no cd is found with the handle ${handle}`)
  }
});



app.listen(port, () => {
  console.log(`YO, Listening at http://localhost:${port}`)
});