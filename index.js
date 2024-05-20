const https = require('https');

const baseURL = 'https://jsonplaceholder.typicode.com/todos/';

function fetchTodo(id) {
    return new Promise((resolve, reject) => {
        https.get(`${baseURL}${id}`, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(`Error fetching TODO ${id}: ${err.message}`);
        });
    });
}

async function main() {
    const fetchPromises = [];
    for (let i = 2; i <= 40; i += 2) {
        fetchPromises.push(fetchTodo(i));
    }

    try {
        const todos = await Promise.all(fetchPromises);
        todos.forEach(todo => {
            console.log(`Title: ${todo.title}, Completed: ${todo.completed}`);
        });
    } catch (error) {
        console.error(error);
    }
}

main();
