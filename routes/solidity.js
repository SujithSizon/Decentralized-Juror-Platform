var express = require('express');
var router = express.Router();
var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var service_provider = "0x68e04a9b2f8a08a72053753895674229ce1d65df";
var client = "0xBaAE84d17F4427Def09590c64BaF2F0b5c4E912A";
var arbitrater_one = "0x18b2bfc0df54f015c925e50123c148a03ea5a61f";
var arbitrater_two = "0x3d2e15bb2e221da08fae9c60cd0b6d5c4dc0ce65";

var mycontract = web3.eth.contract(
[
{
  "constant": false,
  "inputs": [
    {
      "name": "_id",
      "type": "uint256"
    }
  ],
  "name": "accept_agreement",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_service_provider",
      "type": "address"
    },
    {
      "name": "_name",
      "type": "string"
    },
    {
      "name": "_max_time",
      "type": "uint256"
    }
  ],
  "name": "add_agreement",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_id",
      "type": "uint256"
    },
    {
      "name": "_for",
      "type": "uint256"
    }
  ],
  "name": "arbitration",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_id",
      "type": "uint256"
    }
  ],
  "name": "claim_completition",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [],
  "name": "get_next_dispute",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_id",
      "type": "uint256"
    }
  ],
  "name": "go_for_disagreement",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_id",
      "type": "uint256"
    }
  ],
  "name": "payout",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "_id",
      "type": "uint256"
    }
  ],
  "name": "get_agreement",
  "outputs": [
    {
      "name": "",
      "type": "string"
    },
    {
      "name": "",
      "type": "uint256"
    },
    {
      "name": "",
      "type": "uint256"
    },
    {
      "name": "",
      "type": "uint256"
    },
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "_id",
      "type": "uint256"
    }
  ],
  "name": "result_out",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}
]
);

disputeContract = mycontract.at("0x53359b46b4927620535513a43a9b57608336c1ec");


router.post('/addAgreement', function(req, res, next) {
    var address = req.body.address;
    var name = req.body.name;
    var time = parseInt(req.body.time);
    var value = parseInt(req.body.value);
    console.log(address," ",name," ",time," ",value);


    disputeContract.add_agreement(address, name, time, {from:client, value: value, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX");
        console.log(error);
      } else {
        var e = disputeContract.add_agreement.call(address, name, time, {from:service_provider, value: value, gas: 4700000});
        console.log(e-2);
        res.render("pageCreated",{data:e-2});
      }
    });


 })

router.post('/getAgreement', function(req, res, next){

    var id = parseInt(req.body.ident);
    disputeContract.get_agreement.call(id, {from:service_provider, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX"+id);
        console.log(error);
      } else {
        console.log("agreement data"+result);
        res.render("result",{id:id,data:result});
      }
    });

})

router.post('/getclientAgreement', function(req, res, next){

    var id = parseInt(req.body.ident);
    disputeContract.get_agreement.call(id, {from:client, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX"+id);
        console.log(error);
      } else {
        console.log("agreement data"+result);
        res.render("result",{id:id,data:result});
      }
    });

})


router.get('/getmyAgreement', function(req, res, next){
    // disputeContract.methods.get_agreement(0).call({from:client, gas: 4700000})
    // .then((e) => {
    //     console.log(e);
    //     res.render("result",{id:id,data:e});
    // })
    // .catch((e) => {
    //     console.log(e);
    // })
    disputeContract.get_agreement.call(0, {from:client, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX"+id);
        console.log(error);
      } else {
        var e = disputeContract.get_agreement.call(0, {from:client, gas: 4700000});
        console.log(e);
        res.render("result",{id:id,data:e});
      }
    });
})

// web3.eth.getCoinbase((err,account)=>{
// });

// disputeContract.methods.add_agreement("0xf5c49b11334A022b076a800fbb55B04De1fA421B","testing",3000, 100).send({from: "0xa43b3b1fc3820cf5802ddbfff0246d324dd659d9"})
// .then(function(reciept){
//   console.log(reciept);

// ACCEPT AGREEMENT -
router.get("/acceptAgreement/:id", function(req,res,next){
    var id = parseInt(req.params.id);

    disputeContract.accept_agreement(id, {from:service_provider, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX"+id);
        console.log(error);
      } else {
        console.log(result);
        res.redirect("/dashboard");
      }
    });

})

// CLAIM COMPLETION
router.get("/claimCompletion/:id", function(req, res, next){
    var id = parseInt(req.params.id);

    disputeContract.claim_completition(id, {from:service_provider, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX"+id);
        console.log(error);
      } else {
        console.log(result);
        res.redirect("/dashboard");
      }
    });

})


// GO FOR DISAGREEMENT
router.get("/disagreement/:id", function(req,res,next){
    var id = parseInt(req.params.id);

    disputeContract.go_for_disagreement(id, {from:client, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX"+id);
        console.log(error);
      } else {
        console.log(result);
        res.redirect("/dashboard");
      }
    });



})

// PAYOUT
router.get("/payout/:id", function(req,res,next){
    var id = parseInt(req.params.id);

    // disputeContract.methods.payout(id).send({from:client, gas: 4700000})
    // .then((e)=>{
    //   console.log(e);
    //   res.redirect("/dashboard");
    // })
    // .catch((e)=>{
    //   console.log(e);
    // })

    disputeContract.payout(id, {from:client, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX"+id);
        console.log(error);
      } else {
        console.log(result);
        res.redirect("/dashboard");
      }
    });

})


router.get("/vote/:id/:pos", function(req, res, next){
    var id = parseInt(req.params.id);
    var decision = parseInt(req.params.pos);

    console.log(id);
    console.log(decision);

    // disputeContract.arbitration(id,decision, {from:arbitrater_two, gas: 4700000})
    // .then((e)=>{
    //   console.log(e);
    //   console.log("#############");
    //   res.redirect("/solidity/result/"+id);
    // })
    // .catch((e)=>{
    //   console.log(e);
    // })

    disputeContract.arbitration(id,decision, {from:arbitrater_two, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX");
        console.log(error);
      } else {
        console.log("on vote is placed return: "+ result);
        console.log("#############");
        res.redirect("/solidity/result/"+id);
      }
    });



})

// router.get('/arbitration', function(req, res, next){
//     console.log("Aribter down hrer");
//     disputeContract.methods.get_next_dispute().call({from:arbitrater_two, gas: 4700000})
//     .then((e)=>{
//       console.log(e);
//       res.render("arbitration",{id:e});
//     })
//     .catch((e)=>{
//       console.log(e);
//     })
// })

router.get('/result/:id', function(req, res, next){
    //console.log("Aribter");
    var id = parseInt(req.params.id);
    console.log("+++++++++++",id);


    // disputeContract.methods.result_out(id).call({from:arbitrater_two, gas: 4700000})
    // .then((e)=>{
    //   console.log(e);
    //   if(e==0)
    //   res.render("arbitrated",{id:'decision in progress'});
    //   else if(e==1)
    //   res.render("arbitrated",{id:'Jury declares client as winner'});
    //   else
    //   res.render("arbitrated",{id:'Jury declares service-provider as winner'});
    // })
    // .catch((e)=>{
    //   console.log(e);
    // })

    disputeContract.result_out.call(id, {from:arbitrater_two, gas: 4700000}, function (error, result){
      if(error){
        console.log("XXXXXXERORROCCUREDXXXXXXXXX"+id);
        console.log(error);
      } else {
        console.log("result_out returned this "+result);
        if(result==0)
        res.render("arbitrated",{id:'decision in progress'});
        else if(result==1)
        res.render("arbitrated",{id:'Jury declares client as winner'});
        else
        res.render("arbitrated",{id:'Jury declares service-provider as winner'});
      }
    });





})



module.exports = router;
