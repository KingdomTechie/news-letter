const express = require("express")
const request = require("request")

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.listen(3000, () => {
    console.log("Newsletter server is lisening on port 3000")
})

