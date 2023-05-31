const axios = require('axios');
const uuid = require('uuid');
const express = require('express');
const {routes} = require('./routes');

function calculatePrice(cardId) {
    return {
        command_id: uuid.v3,
        payload: {card_id: cardId},
        type: 'CalculatePrice'
    };
}

function idCardRegistered(cardId, personId = "John Doe", address = "an address",
    street = "a street") {
    return {
        created_at: '2023-05-31T06:48:42.456824Z',
        event_id: '33815a89-4f84-4a55-bbc2-8fab235c7475',
        payload: {
            card_id: cardId,
            person_id: personId,
            address: address,
            street: street,
        },
        type: 'IdCardRegistered'
    };
}

function idCardScannedAtEntranceGate(cardId, date = "2023-01-01") {
    return {
        created_at: '2023-05-31T06:48:42.456837Z',
        event_id: '508a36e8-751e-4fd7-9887-6cf9be106f44',
        payload: {
            card_id: cardId,
            date: date
        },
        type: 'IdCardScannedAtEntranceGate'
    };
}

function idCardScannedAtExitGate(cardId) {
    return {
        created_at: '2023-05-31T06:48:42.456840Z',
        event_id: '25773bfe-cab0-4dde-af97-9923502b475d',
        payload: {card_id: cardId},
        type: 'IdCardScannedAtExitGate'
    };
}

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
                idCardRegistered('123'),
                idCardScannedAtEntranceGate("123"),
                idCardScannedAtExitGate("123")
            ],
            command: calculatePrice('123'),
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
