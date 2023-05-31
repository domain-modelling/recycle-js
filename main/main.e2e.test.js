const axios = require('axios');
const express = require('express');
const {routes} = require('./routes');

describe('E2E happy flow', () => {
    let server;
    let client;

    beforeAll(() => {
        server = express().use(routes).listen();
        client = axios.create({
            baseURL: `http://localhost:${(server.address()).port}/`,
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    it('validate', async () => {
        const validate = await get('/validate');
        expect(validate).toMatchObject({});
    });

    it('No fractions delivered', async () => {
        const calculation = await post('/handle-command', {
            history: [],
            command: calculatePrice('123'),
        });
        expect(calculation).toMatchObject(priceWasCalculated('123', 0));
    });

    const get = async (url) => {
        const result = await client.get(url);
        return await result.data
    };

    const post = async (url, data = {}) => {
        const result = await client.post(url, data);
        return await result.data
    };

});

function calculatePrice(cardId) {
    return {
        type: 'CalculatePrice',
        payload: {card_id: cardId},
    };
}
function priceWasCalculated(cardId, price = 0) {
    return {
        type: 'PriceWasCalculated',
        payload: {
            card_id: cardId,
            price_amount: price,
            price_currency: 'EUR',
        },
    };
}
