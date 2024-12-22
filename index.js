const { response } = require('express')

app = require ('express')


app.get('/', {
    response.json('this is it')
})