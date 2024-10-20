// fetchTeamsData.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define the API options
const fixtures = ['1208582', '1208583', '1212920', '1208591', '1208589', '1208592']; // Add more fixture IDs as needed
const apiKey = '7b2465fd5dmsh536849b37f8efcfp1ee7c2jsnef1a77ff04b1'; // Replace with your actual API key

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAndSaveTeamsData(fixture) {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/predictions',
    params: { fixture: fixture }, // Use the current fixture ID
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    // Make the API call
    const response = await axios.request(options);
    
    // Extract the comparison data from the response
    const comparisonData = response.data.response[0].comparison; // Access the comparison part
    const teamsData = response.data.response[0].teams; // Access the teams part

    // Prepare the data to match the structure of teamsCharts.json
    const newEntry = {
      gameId: fixture, // Use the fixture ID as gameId
      leagueName: response.data.response[0].league.name, // Get league name
      radarData: [
        { category: "Form", home: parseInt(comparisonData.form.home), away: parseInt(comparisonData.form.away) },
        { category: "Attack", home: parseInt(comparisonData.att.home), away: parseInt(comparisonData.att.away) },
        { category: "Defense", home: parseInt(comparisonData.def.home), away: parseInt(comparisonData.def.away) },
        { category: "Poisson", home: parseInt(comparisonData.poisson_distribution.home), away: parseInt(comparisonData.poisson_distribution.away) },
        { category: "H2H", home: parseInt(comparisonData.h2h.home), away: parseInt(comparisonData.h2h.away) },
        { category: "Goals", home: parseInt(comparisonData.goals.home), away: parseInt(comparisonData.goals.away) }
      ],
      totalData: [
        { category: "Total", home: parseFloat(comparisonData.total.home), away: parseFloat(comparisonData.total.away) }
      ]
    };

    // Define the path to the JSON file
    const filePath = path.join(__dirname, 'teamsCharts.json');

    // Read the existing data from the JSON file
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      existingData = JSON.parse(fileContents);
    }

    // Append the new entry to the existing data
    existingData.push(newEntry);

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');

    console.log(`Data for fixture ${fixture} successfully fetched and appended to teamsCharts.json`);
  } catch (error) {
    console.error(`Error fetching data for fixture ${fixture}:`, error);
  }
}

async function fetchAllFixtures() {
  for (const fixture of fixtures) {
    await fetchAndSaveTeamsData(fixture);
    await delay(1000); // Wait for 1 second before the next call
  }
}

// Execute the function to fetch all fixtures
fetchAllFixtures();
