import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3001; 

const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE3ZWFmZTEwLWQwODYtNDI5NS1iNTY2LWU4ZGFiODFkYzAzNCIsImlhdCI6MTc0NjM5MzQ1Niwic3ViIjoiZGV2ZWxvcGVyLzVkYTZlMmYyLTZjZmUtYzA2Yy1hZWE3LWU4YTRlZGYzNmQ0NSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ0LjIyNi4xMjIuMyIsIjYyLjQ1LjEwOS40MCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.19JX6kjgD9SSIl0uzTfMBJUTUSnSogLRRJ8k_EdYl-h7qhV2eCLXoc4RrRWkrpZdz5A4s7ZaToqq0IuuuYfu_Q'; 

app.use(cors());

app.get('/api/clashofclans/war', async (req, res) => {
  const { clanTag } = req.query;

  if (!clanTag) {
    return res.status(400).json({ error: 'Missing clanTag query parameter' });
  }

  try {
    console.log(`Requesting war data for clanTag: ${clanTag}`);

    const response = await axios.get(`https://api.clashofclans.com/v1/clans/${encodeURIComponent(clanTag)}/currentwar`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log('Clash of Clans API response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Clash of Clans API:", error);

    if (error.response) {
      console.error('API error response:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    if (error.response && error.response.status === 403) {
      return res.status(403).json({ error: 'Forbidden: Check API key or permissions' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});