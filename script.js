  function fetchData() {
            return fetch("https://jsonplaceholder.typicode.com/todos/1")
                .then(response => response.json());
        }

        // Rate limiter using JavaScript promises
        function rateLimitedFetch(limit, time) {
            let counter = 0;

            function executeFetch() {
                if (counter < limit) {
                    counter++;
                    return fetchData();
                } else {
                    return new Promise(resolve => setTimeout(resolve, time))
                        .then(() => {
                            counter = 0;
                            return executeFetch();
                        });
                }
            }

            return executeFetch;
        }

        const fetchWithRateLimit = rateLimitedFetch(5, 1000); // 5 requests per second (1000ms)

        // Update click count and reset after 10 seconds
        function updateClickCount() {
            const clickCountElement = document.getElementById("clickCount");
            let count = 0;

            return function () {
                count++;
                clickCountElement.textContent = count;

                setTimeout(() => {
                    clickCountElement.textContent = "0";
                    count = 0;
                }, 10000); // 10 seconds
            };
        }

        const updateCount = updateClickCount();

        // Event listener for the Fetch Data button
        document.getElementById("fetchButton").addEventListener("click", () => {
            updateCount();

            fetchWithRateLimit()
                .then(data => {
                    // Display fetched data in the results div
                    const resultsElement = document.getElementById("results");
                    resultsElement.innerHTML += `<p>ID: ${data.id}, Title: ${data.title}, Completed: ${data.completed}</p>`;
                })
                .catch(error => console.error("Error fetching data:", error));
        });