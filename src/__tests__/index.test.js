const request = require('supertest')

const app = require('../app')

describe('Post Account', () => {
    it('Create account', async () => {
        const response = await request(app)
            .post('/account')
            .send({
                cpf:'33333333333',
                name: 'Jorge Alegretti'
            })
            .set('Accept', 'application/json')
    
        expect(response.status).toBe(201)
    })

    it('Customer Already Exists', async () => {
        const response = await request(app)
            .post('/account')
            .send({
                cpf:'33333333333',
                name: 'Jorge Alegretti'
            })
            .set('Accept', 'application/json')
    
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Customer already exists!')
    })

})

