// script.js
const axios = require('axios'); // Import axios
const fs = require('fs'); // Import the file system module

const fetchTeamsData = async () => {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
    params: {
      league: '140', // Use the league ID you are interested in
      season: '2024', // Specify the season
    },
    headers: {
      'x-rapidapi-key': '7b2465fd5dmsh536849b37f8efcfp1ee7c2jsnef1a77ff04b1',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const teams = response.data.response.map((team) => ({
      id: team.team.id,
      name: team.team.name,
    }));

    // Write the teams data to a JSON file
    fs.writeFileSync('teams.json', JSON.stringify(teams, null, 2));
    console.log('Teams data saved to teams.json');
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
  }
};

// Execute the function
fetchTeamsData();