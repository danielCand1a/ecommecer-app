const request = require('supertest')
const app = require('../app')
require('../models');
let token
let id
beforeAll(async()=>{
    const user={
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(user)
    token=res.body.token
})
test('GET/carts', async () => {
    const res = await request(app)
        .get('/carts')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test('POST/carts', async () => {
    const body ={
        quantity: 5,
    }
    const res = await request(app)
        .post('/carts')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(body.quantity);
    expect(res.body.id).toBeDefined();
});

test('DELETE/carts/:id', async () => {
    const res = await request(app)
        .delete(`/carts/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});