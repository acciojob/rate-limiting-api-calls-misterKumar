const btn = document.getElementById("fetch-button");
const results = document.getElementById("results");
const countDisplay = document.getElementById("count");

let clickCount = 0; 
let apiCallsMade = 0; 
let lastCallTime = 0; 

const fetchData = () => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => response.json())
	.then(data => {
	  results.innerHTML = `<p>ID: ${data.id}</p><p>Title: ${data.title}</p><p>Completed: ${data.completed}</p>`;
	})
	.catch(error => {
	  console.error('Error:', error);
	});
};

const throttleFetch = () => {
  const now = Date.now();
  
  if (now - lastCallTime >= 10000) {
	apiCallsMade = 0; 
  }
  
  if (apiCallsMade < 5) {
	apiCallsMade++; 
	fetchData(); 
	lastCallTime = now; 
  }else {
	  window.alert("Too many API calls. Please wait and try again.")
  }
  countDisplay.textContent = ++clickCount;
  
  setTimeout(() => {
	countDisplay.textContent = 0;
	clickCount = 0;
  }, 10000);
};

btn.addEventListener('click', throttleFetch);