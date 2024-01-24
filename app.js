const express = require('express')
const path = require('path');
const http = require('http')
const url = require('url')
var htmlDispay = require('./app.html')
const app = express()
const port = 3000
const users = {
    "1" : {
        "name" : "Raksith",
        "age" : "21",
        "location": "Nagercoil"
    },
    "2" : {
        "name" : "Aslin",
        "age" : "24",
        "location": "Chennai"
    },
    "3" : {
        "name" : "Abhay",
        "age" : "26",
        "location": "Punjab"
    }
}

// app.get('/', (req, res) => {
//     res.sendFile('./app.html', {root: __dirname })
//     // res.render(htmlDispay);
// })

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '/app.html'));
});

app.get('/user/:id', (req, res) => {
    var idValue = req.params;
    res.write(users[idValue.id].name + '-');
    res.write(users[idValue.id].age + '(');
    res.write(users[idValue.id].location + ')');
    res.send()

})

app.get('/user', (req, res) => {
    var userId = req.query;
    res.write(users[userId.id].name + '-');
    res.write(users[userId.id].age + '(');
    res.write(users[userId.id].location + ')');
    res.send()
})

function submitHandler(){
    console.log("IN submit.....")
}



app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
})