var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/dashboard', function(req,res,next){
  console.log("DASSSS");
  res.render('dashboard');
});

router.get('/arbitration', function(req, res, next){
  console.log("Aribter");

  disputeContract.get_next_dispute.call({from:"0x3d2e15bb2e221da08fae9c60cd0b6d5c4dc0ce65", gas: 4700000}, function (error, result){
    if(error){
      console.log("XXXXXXERORROCCUREDXXXXXXXXX"+id);
      console.log(error);
    } else {
      console.log("Here at arbitration page, id: "+ result.toNumber());
      res.render("arbitration",{id:result});
    }
  });

})


module.exports = router;
