import got from 'got';
import { v4 as uuidv4 } from 'uuid';
import { ENDPOINT_URL } from '../constants';

const testUserId = 'test_user_1987';
const randomTestUserId = uuidv4();
const maxStreams = 3;

describe('Test streamService endpoints', () => {
    afterEach(async () => {
        for (let i = 0; i < maxStreams; i++) {
            await got.post(`${ENDPOINT_URL}/removeReservation/${testUserId}`);
        }
    });

    it('First time request for a stream should return 200 response', async () => {
        const response = await got.post(`${ENDPOINT_URL}/reservation/${testUserId}`);
        expect(response.statusCode).toBe(200);
    });

    it('Exceeding the number of streams should result in 400 being returned', async () => {
        for (let i = 0; i < maxStreams; i++) {
            await got.post(`${ENDPOINT_URL}/reservation/${testUserId}`);
        }
        let statusCode;
        try {
            await got.post(`${ENDPOINT_URL}/reservation/${testUserId}`);
        } catch (e) {
            statusCode = e.response.statusCode;
        }
        expect(statusCode).toBe(400);
    });

    it('Requesting a stream 3 times, removing one reservation and then requesting a stream again should result in 200 being returned', async () => {
        for (let i = 0; i < maxStreams; i++) {
            await got.post(`${ENDPOINT_URL}/reservation/${testUserId}`);
        }
        await got.post(`${ENDPOINT_URL}/removeReservation/${testUserId}`);
        const response = await got.post(`${ENDPOINT_URL}/reservation/${testUserId}`);
        expect(response.statusCode).toBe(200);
    });

    it('Removing a reservation for a user with 0 current reservations should result in a 200 response', async () => {
        await got.post(`${ENDPOINT_URL}/reservation/${testUserId}`);
        await got.post(`${ENDPOINT_URL}/removeReservation/${testUserId}`);
        const response = await got.post(`${ENDPOINT_URL}/removeReservation/${testUserId}`);
        expect(response.statusCode).toBe(200);
    });

    it('One time request to remove a stream with userId which has not been in database should result in 200 being returned', async () => {
        const response = await got.post(`${ENDPOINT_URL}/removeReservation/${randomTestUserId}`);
        expect(response.statusCode).toBe(200);
    });
});
