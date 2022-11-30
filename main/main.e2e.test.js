const axios = require('axios');
const express = require('express');
const { routes } = require('./routes');

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
        expect(validate).toEqual({});
    });

    it("POST /calculate returns a calculation", async () => {
        const calculation = await post("/calculate", {events: [], command: {}});
        expect(calculation).toEqual({
            priceWasCalculated: {
                id: 1,
                price: {
                    amount: 0,
                    currency: "euro"
                }
            }
        });
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
