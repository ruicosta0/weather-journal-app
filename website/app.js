/* Global Variables */

// Open weather URL/api
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = 'd756b048f0c16d349a0f970212259eb3'

// User input index.html
document.getElementById('generate').addEventListener('click', performAction);

// Initiate functions
function performAction(e){
    const zip = document.getElementById('zip').value;
    getWeather(baseURL, zip, apiKey)
}

// Async GET from Open Weather api
const getWeather = async (baseULR, zip, apiKey) => {
    const user_response = document.getElementById('feelings').value
    const res = await fetch(baseURL+zip+",us&appid="+apiKey+"&units=metric")
    try {
        // data returned from Openweather api
        const data = await res.json();
        // Chain postData & UI functions
        postGet(data, user_response)
        } catch(error) {
        console.log("error",error);
    }
}

// Async POST
const postData = async (url = '', data ={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
       const newData = await response.json();
    }catch(error) {
        console.log("error", error);
    }
}

// Chain async functions to post the weather then GET resulting data
function postGet(data, user_response){
    postData('http://localhost:3000/add', {temperature: data.main.temp, date: newDate, content: user_response})
      .then(
          updateUI()
      )
}

// Get data from server
const updateUI = async () => {
    const request = await fetch('http://localhost:3000/all');
    try{
        const returnedData = await request.json();
        document.getElementById('temp').innerHTML = "The termperature now is " + returnedData[0] + "℃";
        document.getElementById('date').innerHTML = "Today's date is the " + returnedData[1];
        document.getElementById('content').innerHTML = returnedData[2]
    }catch(error){
        console.log("error", error)
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
