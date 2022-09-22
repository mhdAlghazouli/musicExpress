const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  
  res.render('template', {
    locals: {
      title: "Lil Wayne"
    },
    partials: {
      index : `index`
    }
  })
});

module.exports = router;