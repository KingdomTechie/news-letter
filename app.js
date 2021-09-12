const express = require("express")
const request = require("request")
const https = require("https")

const app = express();

app.use(express.urlencoded({extended: true}))

// This code allows the public folder to be accessed 
app.use(express.static(__dirname))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    let data = {

        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }, 
        ]
    }
    // This packages the data payload so that it can be sent to the API 
    let jsonData = JSON.stringify(data)

    let listID = "7fca9a448f"
    const url = `https://us5.api.mailchimp.com/3.0/lists/${listID}`

    const options = {
        method: "POST",
        auth: "kpowell:90b44a2f743cf508b64ee9421f841c29-us"
    }

    const request = https.request(url, options, function (response) {
        response.on("data", function(data) {
            
            let responseStatus = response.statusCode

            if(responseStatus >= 200 && responseStatus <= 299) {
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failure.html")
            }
            
        })
    })

    request.write(jsonData)
    request.end()
    
})

app.listen(3000, () => {
    console.log("Newsletter server is lisening on port 3000")
})

//API key -  95e3bef06388b5b83b8c64b81bee3aba-us5
// List ID - 7fca9a448f

