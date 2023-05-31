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

    it("validate", async () => {
        const validate = await get("/validate");
        expect(validate).toMatchObject({});
    });

    it("No fractions delivered", async () => {
        const calculation = await post("/handle-command", {
            history: [
                idCardRegistered('123'),
                idCardScannedAtEntranceGate("123"),
                idCardScannedAtExitGate("123")
            ],
            command: calculatePrice('123'),
        });
        expect(calculation).toMatchObject(priceWasCalculated("123", 0));
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

function idCardRegistered(cardId, personId = "person_1", address = "an address",
    street = "a street") {
    return {
        type: 'IdCardRegistered',
        payload: {
            card_id: cardId,
            person_id: personId,
            address: address,
            street: street,
        },
    };
}

function idCardScannedAtEntranceGate(cardId, date = "2023-01-01") {
    return {
        type: 'IdCardScannedAtEntranceGate',
        payload: {
            card_id: cardId,
            date: date
        },
    };
}

function idCardScannedAtExitGate(cardId) {
    return {
        type: 'IdCardScannedAtExitGate',
        payload: {card_id: cardId},
    };
}

function priceWasCalculated(cardId, price = 0) {
    return {
        type: "PriceWasCalculated",
        payload: {
            card_id: cardId,
            price_amount: price,
            price_currency: "EUR",
        },
    };
}
