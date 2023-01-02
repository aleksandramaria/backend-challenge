import express from 'express';
export const router = express.Router();

class ServerError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const counters = new Map();
const increaseCounter = (userId) => {
    if (counters.has(userId)) {
        const value = counters.get(userId);
        if (value === 3) {
            throw new ServerError(400, 'You have reached the maximum number of streams allowed');
        }
        counters.set(userId, value + 1);
    } else {
        counters.set(userId, 1);
    }
};

const decreaseCounter = (userId) => {
    if (counters.has(userId)) {
        const value = counters.get(userId);
        if (value !== 0) {
            counters.set(userId, value - 1);
        }
    }
};

router.post('/reservation/:userId', (req, res) => {
    try {
        increaseCounter(req.params.userId);
        return res.status(200).send({ message: 'OK' });
    } catch (err) {
        return res.status(err.statusCode).json(err.message);
    }
});

router.post('/removeReservation/:userId', (req, res) => {
    decreaseCounter(req.params.userId);
    return res.status(200).send({ message: 'OK' });
});
