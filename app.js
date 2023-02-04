const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/",function (req,res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function (req,res) {
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  }

  var jsonData = JSON.stringify(data)

  const url = 'https://us12.api.mailchimp.com/3.0/lists/08a9a24c11'

  const options = {
    method:"POST",
    auth: "amey1:78453cdbb44a89a78d6bd94d9a0e560b-us12"
  }

  const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname + "/failure.html")
    }
      response.on("data",function (data) {
        console.log(JSON.parse(data));
      })
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure",function (req,res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function () {
  console.log('server is running at port 3000');
});

//API key
//78453cdbb44a89a78d6bd94d9a0e560b-us12

//audience id: 08a9a24c11.
