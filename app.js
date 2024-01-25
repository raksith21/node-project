const express = require('express')
const bodyParser = require('body-parser');
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

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req,res){
    res.render('app', { title: 'Express with EJS' });
});

app.get('/user/:id', (req, res) => {
    var idValue = req.params;
    res.write(users[idValue.id].name + '-');
    res.write(users[idValue.id].age + '(');
    res.write(users[idValue.id].location + ')');
    res.send()

})

app.post('/user', (req, res) => {
    console.log("In post...")
    var userId = req.body;
    console.log(userId);
    res.write(users[userId.id].name + '-');
    res.write(users[userId.id].age + '(');
    res.write(users[userId.id].location + ')');
    res.send()
})

app.get('/user', (req, res) => {
    console.log("In put....")
    var userId = req.query;
    res.write(users[userId.id].name + '-');
    res.write(users[userId.id].age + '(');
    res.write(users[userId.id].location + ')');
    res.send()
})




app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
})