const axios = require('axios');
const express = require('express');
const {routes} = require('./routes');

describe("E2E happy flow", () => {
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

    it("GET /validate returns an empty object", async () => {
        const validate = await get("/validate");
        expect(validate).toMatchObject({});
    });

    it("POST /calculate without history", async () => {
        const calculation = await post("/handle-command", {
            history: [
                // there should be something here
            ],
            command: {
                // there should be something here too
            }
        });
        expect(calculation).toMatchObject(priceWasCalculated("123", 0));
    });

    function priceWasCalculated(card_id, price_amount) {
        return {
            type: "PriceWasCalculated",
            payload: {
                card_id,
                price_amount,
                price_currency: "EUR",
            },
        };
    }

    const get = async (url) => {
        const result = await client.get(url);
        return await result.data
    };

    const post = async (url, data = {}) => {
        const result = await client.post(url, data);
        return await result.data
    };

});
