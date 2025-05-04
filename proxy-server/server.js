import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3001; // Proxy server port

// Your Clash of Clans API Key
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI4M2UxNmQ2LTMxMTctNDA3Yy04MzQ4LWE3YmVjYjE2ZDg4MiIsImlhdCI6MTc0NjM4ODUzMSwic3ViIjoiZGV2ZWxvcGVyLzVkYTZlMmYyLTZjZmUtYzA2Yy1hZWE3LWU4YTRlZGYzNmQ0NSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjYyLjQ1LjEwOS40MCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.UfN7bztqfjvn1JJ8Jp5MAI4JKKNqx9pogfOK1HH97eARx_tRSt8giFCAjrRwInUd9F9UVb5OqQegbq18IFCV1w'; 

// Enable CORS for all domains
app.use(cors());

// Proxy route to fetch data from Clash of Clans API
app.get('/api/clashofclans/war', async (req, res) => {
  const { clanTag } = req.query;

  // Ensure the clanTag parameter is provided
  if (!clanTag) {
    return res.status(400).json({ error: 'Missing clanTag query parameter' });
  }

  try {
    // Log the request details
    console.log(`Requesting war data for clanTag: ${clanTag}`);

    // Make the request to Clash of Clans API
    const response = await axios.get(`https://api.clashofclans.com/v1/clans/${encodeURIComponent(clanTag)}/currentwar`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // Log the response from the Clash of Clans API
    console.log('Clash of Clans API response:', response.data);

    // Return the response data to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Clash of Clans API:", error);

    // Log detailed error info for debugging
    if (error.response) {
      console.error('API error response:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }

    // Handle 403 specifically
    if (error.response && error.response.status === 403) {
      return res.status(403).json({ error: 'Forbidden: Check API key or permissions' });
    }

    // Handle other errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});