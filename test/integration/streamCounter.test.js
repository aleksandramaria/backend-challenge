// 1. the first time request for a stream - response returns statusCode 200.
// 2. the fourth time request for a stream - response returns statusCode 400.

// 3. request for a stream made 3 times and NOW request to remove a stream - response returns statusCode 200
// 4. request for a stream made 1 time and request to remove a stream made 1 time AND then request to remove a stream - response returns statusCode 200
// 5. kiedy usera nie bylo

import got from 'got';

const testUserId = 'test_user_1987';

describe('Test streamService endpoints', () => {
    afterAll(async () => {
        
    });

    it('Should always return 200 response', async () => {
        const response = await got(`localhost:3000/stream/reservation/${testUserId}`);
        console.log(response);
        expect(response.body.StatusCode).toBe(200);
    });
});