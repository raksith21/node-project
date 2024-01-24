const express = require('express')
const http = require('http')
const url = require('url')
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

app.get('/', (req, res) => {
  res.send('Hello User')
})

app.get('/user/:id', (req, res) => {
    var idValue = req.params;
    // console.log(req.params)
    // var currentUrl = req.url;
    // var q = url.parse(currentUrl, true);
    // var path = q.pathname;
    // var lastValue = path.split('/');
    // lastValue = lastValue[lastValue.length-1];
    // console.log(q.pathname);
    // res.write(users[t[t.length-1]].name);
    // res.write(users[t[t.length-1]].age);
    // res.write(users[t[t.length-1]].location);
    res.write(users[idValue.id].name + '-');
    res.write(users[idValue.id].age + '(');
    res.write(users[idValue.id].location + ')');
    res.send()

})

app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
})