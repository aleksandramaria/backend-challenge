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

export const reservation = async (event, context) => {
    try {
        increaseCounter(event.pathParameters.userId);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'OK',
            }),
        };
    } catch (err) {
        return {
            statusCode: err.statusCode,
            body: JSON.stringify(err),
        };
    }
};

export const removeReservation = async (event, context) => {
    decreaseCounter(event.pathParameters.userId);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'OK',
        }),
    };
};
