//your JS code here. If required.
let clickCount = 0;

document.getElementById('fetchButton').addEventListener('click', () => {
    clickCount++;

    // Display click count for 10 seconds
    document.getElementById('clickCount').textContent = `Click Count: ${clickCount}`;
    setTimeout(() => {
        document.getElementById('clickCount').textContent = '';
    }, 10000);

    // Implement a rate limiter
    rateLimit(() => fetchData());
});

function rateLimit(callback) {
    const maxRequests = 5;
    const windowSize = 1000;
    const startTime = new Date().getTime();
    let requestCount = 0;

    function checkLimit() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;

        if (elapsedTime < windowSize) {
            if (requestCount < maxRequests) {
                // If within the time window and under the request limit, make the API call
                callback();
                requestCount++;
            } else {
                // If over the request limit, delay the API call until the next window
                setTimeout(() => {
                    callback();
                    requestCount = 1;
                }, windowSize - elapsedTime);
            }
        } else {
            // If the time window has passed, reset the counters
            startTime = currentTime;
            requestCount = 1;
            callback();
        }
    }

    checkLimit();
}

function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayData(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>ID: ${data.id}</p><p>Title: ${data.title}</p><p>Completed: ${data.completed}</p>`;
}