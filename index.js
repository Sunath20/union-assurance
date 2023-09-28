

const express = require("express")
const fs = require("fs")
const path = require("path")
const fileUpload = require("express-fileupload")


const csvFilePath='files/file.csv'
const csv = require('csvtojson')
const multer = require("multer")


const uploadFiles = multer({storage:multer.diskStorage({destination:"./files",filename: (req,file,cb) => {cb(null,"file.csv")}  })})



const app = express()





app.get("/data",async (req,res) => {
    const data = await csv().fromFile(csvFilePath)
    console.log(data)
    return res.status(200).send(data)
})

app.get("/upload",(req,res) => {
    res.status(200).sendFile("upload.html",{
        root:path.join(__dirname)
    })
})


app.post("/upload",uploadFiles.single("file.csv"),async (req,res) => {

    return res.status(200).sendFile("index.html",{
        root:path.join(__dirname)
    })
})


app.get("/",async (req,res) => {
    return res.status(200).sendFile("index.html",{
        root:path.join(__dirname)
    })
})





app.listen(8000,() => {
console.log("Server is on port 8000")
})
