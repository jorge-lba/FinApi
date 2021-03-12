const request = require('supertest')

const app = require('../app')

const accountDefault = {
    cpf:'33333333333',
    name: 'Jorge Alegretti'
} 

describe('Erro Customer', () => {
    it('Customer not Exists', async () => {
        const response = await request(app)
            .get('/statement')
            .set('cpf', '00000000000')

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Customer not found')
    })
})

describe('Post /account', () => {
    it('Create account', async () => {
        const response = await request(app)
            .post('/account')
            .send(accountDefault)
            .set('Accept', 'application/json')
    
        expect(response.status).toBe(201)
    })

    it('Customer Already Exists', async () => {
        const response = await request(app)
            .post('/account')
            .send(accountDefault)
            .set('Accept', 'application/json')
    
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Customer already exists!')
    })

})

describe('Get /statement', () => {
    it('Return statements', async () => {
        const response = await request(app)
            .get('/statement')
            .set('cpf', accountDefault.cpf)
    
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })
})

describe('Post /deposit', () => {
    it('Make a deposit', async () => {
        const response = await request(app)
            .post('/deposit')
            .send({
                description: 'Test deposit',
                amount:1500
            })
            .set('Accept', 'application/json')
            .set('cpf', accountDefault.cpf)

        expect(response.status).toBe(201)
    })
})

describe('Post /withdraw', () => {
    it('Insufficient funds', async () => {
        const response = await request(app)
            .post('/withdraw')
            .send({
                amount:99999
            })
            .set('Accept', 'application/json')
            .set('cpf', accountDefault.cpf)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Insufficient funds!')
    })

    it('Make a withdraw', async () => {
        const response = await request(app)
            .post('/withdraw')
            .send({
                amount:500
            })
            .set('Accept', 'application/json')
            .set('cpf', accountDefault.cpf)

        expect(response.status).toBe(201)
    })
})

describe('Get /statement/date', () => {
    it('Get statement filtered by date', async () => {
        const date = new Date()
        const dateFormate = date.toISOString().split('T')[0]

        const response = await request(app)
            .get(`/statement/date`)
            .query({date: dateFormate})
            .set('cpf', accountDefault.cpf)

        console.log(dateFormate)

        expect(response.status).toBe(200)
        expect(response.body[0].description).toBe('Test deposit')
    })

    it('Get statement filtered by date return []', async () => {
        const date = new Date(2020,3,1)
        const dateFormate = date.toISOString().split('T')[0]

        const response = await request(app)
            .get(`/statement/date`)
            .query({date: dateFormate})
            .set('cpf', accountDefault.cpf)

        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })
})

const updateAccount = {
    ...accountDefault,
    name:'Rahmai'
}

describe('Put /account', () => {
    it('Should update', async () => {
        const response = await request(app)
            .put('/account')
            .send({
                name: updateAccount.name
            })
            .set('Accept', 'application/json')
            .set('cpf', accountDefault.cpf)
    
        expect(response.status).toBe(201)

    })
})

describe('Get /account', () => {
    it('Return account', async () => {
        const response = await request(app)
            .get('/account')
            .set('cpf', accountDefault.cpf)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(updateAccount.name)
    } )
})

describe('Delete /account', () => {
    it('Delete account', async () => {
        await request(app)
            .post('/account')
            .send({
                name:'Test Account 2',
                cpf:'32132132132'
            })
            .set('Accept', 'application/json')

        await request(app)
            .post('/account')
            .send({
                name:'Test Account 2',
                cpf:'32132132133'
            })
            .set('Accept', 'application/json')

        const response = await request(app)
            .delete('/account')
            .set('cpf', '32132132132')
        
        expect(response.status).toBe(200)
    })

    it('Check if the account has been deleted', async () => {
        const response = await request(app)
            .get('/account')
            .set('cpf', '32132132132')

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Customer not found')
    })
})
