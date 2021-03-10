const express = require('express')
const { v4: uuid } = require('uuid')

const app = express()

app.use(express.json())

const customers = []

function verifyExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers
    
    const customer = customers.find(customer => customer.cpf === cpf)

    if(!customer) {
        return response.status(400).json({error: "Customer not found"})
    }
    request.customer = customer

    next()
}

function getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
        return operation.type === 'credit'
            ? acc + operation.amount
            : acc - operation.amount
    }, 0)

    return balance
}

app.post('/account', (request, response) => {
    const { cpf, name } = request.body

    const customerAlreadyExists = customers.some(
        customer => customer.cpf === cpf
    )

    if(customerAlreadyExists){
        return response.status(400).json({
            message: 'Customer already exists!'
        })
    }

    customers.push({
        cpf,
        name,
        id: uuid(),
        statement: []
    })

    return response.status(201).send()
})

app.get('/statement', verifyExistsAccountCPF, (request, response) => {   
    const { customer } = request
    return response.json(customer.statement)
})

app.post('/deposit', verifyExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body

    const { customer } = request

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

app.post('/withdraw', verifyExistsAccountCPF, (request, response) => {
    const { amount } = request.body
    const { customer } = request

    const balance = getBalance(customer.statement)

    if(balance < amount){
        return response.status(400).json({error: 'Insufficient funds!'})
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: 'debit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

app.listen(3333, () => console.log('Server on!'))