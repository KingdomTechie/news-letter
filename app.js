const express = require("express")

const app = express();

app.use(express.urlencoded({extended: true}))

app.listen(3000, () => {
    console.log("Newsletter server is lisening on port 3000")
})