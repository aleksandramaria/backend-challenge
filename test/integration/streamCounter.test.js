import got from 'got';
import random from 'random';

const testUserId = 'test_user_1987';
const randomTestUserId = random.int(0, 1000000);

describe('Test streamService endpoints', () => {
    afterEach(async () => {
        got.post(`http://localhost:3000/stream/removeReservation/${testUserId}`);
        got.post(`http://localhost:3000/stream/removeReservation/${testUserId}`);
        got.post(`http://localhost:3000/stream/removeReservation/${testUserId}`);
    });

    it('First time request for a stream should return 200 response', async () => {
        const response = await got.post(`http://localhost:3000/stream/reservation/${testUserId}`);
        expect(response.statusCode).toBe(200);
    });

    it('Exceeding the number of streams should result in 400 being returned', async () => {
        await got.post(`http://localhost:3000/stream/reservation/${testUserId}`);
        await got.post(`http://localhost:3000/stream/reservation/${testUserId}`);
        await got.post(`http://localhost:3000/stream/reservation/${testUserId}`);
        let statusCode;
        try {
            await got.post(`http://localhost:3000/stream/reservation/${testUserId}`);
        } catch(e) {
            statusCode = e.response.statusCode;
        }
        expect(statusCode).toBe(400);
    });

    it('Requesting stream 3 times and then one request to remove one stream should result in 200 being returned', async () => {
        await got.post(`http://localhost:3000/stream/reservation/${testUserId}`);
        await got.post(`http://localhost:3000/stream/reservation/${testUserId}`);
        await got.post(`http://localhost:3000/stream/reservation/${testUserId}`);
        const response = await got.post(`http://localhost:3000/stream/removeReservation/${testUserId}`);
        expect(response.statusCode).toBe(200);
    });

    it('One request for a stream, then a request to remove a stream, and then again a request to remove a stream should result in 200 being returned', async () => {
        await got.post(`http://localhost:3000/stream/reservation/${testUserId}`);
        await got.post(`http://localhost:3000/stream/removeReservation/${testUserId}`);
        const response = await got.post(`http://localhost:3000/stream/removeReservation/${testUserId}`);
        expect(response.statusCode).toBe(200);
    });

    it('One time request to remove a stream with userId which has not been in database should result in 200 being returned', async () => {
        const response = await got.post(`http://localhost:3000/stream/removeReservation/${randomTestUserId}`);
        expect(response.statusCode).toBe(200);
    });
});
