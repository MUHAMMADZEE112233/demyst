const https = require('https');
const { fetchTodo } = require('./index');

jest.mock('https');

describe('fetchTodo', () => {
    it('should fetch the correct TODO', async () => {
        const mockTodo = { title: 'Test TODO', completed: true };
        https.get.mockImplementation((url, callback) => {
            callback({
                on: (event, cb) => {
                    if (event === 'data') {
                        cb(JSON.stringify(mockTodo));
                    }
                    if (event === 'end') {
                        cb();
                    }
                }
            }).on = jest.fn();
            return {
                on: jest.fn(),
            };
        });

        const todo = await fetchTodo(2);
        expect(todo).toEqual(mockTodo);
    });
});
