const express = require('express')
const fetch = require("node-fetch");
const path = require('path')
const app = express()

let COUNTRIES = []

PORT = 5000

let url = "https://restcountries.eu/rest/v2/all"
let settings = {
    headers:{
        accept:"application/json"
    }
}

app.use(express.static(path.resolve(__dirname, 'client')))

async function getData() {
    try {
        fetch(url, settings)
            .then(res => res.json())
            .then((json) => {
                COUNTRIES = json
                console.log(COUNTRIES)
            })
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'index.html'))
})

app.get('/api/countries', (req, res) => {
    res.status(200).json(COUNTRIES)
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})
