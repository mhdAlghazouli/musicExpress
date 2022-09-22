const express = require('express'),
router = express.Router();
const db = require('../models/data');


router.get('/',(req,res) => {
  res.render('template', {
    locals: {
      title: 'CDS of Lil Wayne',
      data: db
    },
    partials: {
      index : 'partial-CDS'
    }
  })
});

router.get('/:handle', (req,res) => {
  const { handle } = req.params;
  const cd = db.find(person => person.name === handle);
  if(cd) {
    res.render('template', {
      locals: {
        title : 'Detail CD',
        data : cd
      },
      partials: {
        index : 'partial-CD-details'
      }
    })
  }
});

module.exports = router;