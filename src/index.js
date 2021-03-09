const express = require('express')
const { v4: uuid } = require('uuid')

const app = express()

app.use(express.json())

const costumers = []

app.post('/account', (request, response) => {
    const { cpf, name } = request.body

    const customerAlreadyExists = costumers.some(
        customer => customer.cpf === cpf
    )

    if(customerAlreadyExists){
        return response.status(400).json({
            message: 'Customer already exists!'
        })
    }

    costumers.push({
        cpf,
        name,
        id: uuid(),
        statement: []
    })

    return response.status(201).send()
})

app.listen(3333, () => console.log('Server on!'))