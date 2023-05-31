class PriceCalculator {
    constructor(history = []) {
        for (const event of history) this.#handle(event);
    }

    #handle(event) {
        const payload = event.payload;
        switch (event.type) {
            case "IdCardRegistered":
                console.log(`registered card ${payload.card_id}`);
                break;
            case "IdCardScannedAtEntranceGate":
                console.log(`card ${payload.card_id} scanned at entrance gate`);
                break;
            case "FractionWasDropped":
                console.log(`card ${payload.card_id} dropped some waste`)
                break;
            case "IdCardScannedAtExitGate":
                console.log(`card ${payload.card_id} scanned at exit gate`)
                break;
        }
    }

    calculatePrice(cardId) {
        console.log(`calculating price for card ${cardId}`);
        return 0;
    }
}

module.exports = PriceCalculator
