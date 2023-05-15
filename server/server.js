const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Received a webhook notification:', req.body);
  res.sendStatus(200);
});

app.get('/subscribe', async (req, res) => {
  try {
    const response = await axios.post('https://api.twitch.tv/helix/webhooks/hub', {
      'hub.callback': 'https://your-server.com/webhook',
      'hub.mode': 'subscribe',
      'hub.topic': 'https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=YOUR_BROADCASTER_ID',
      'hub.lease_seconds': 864000,
      'hub.secret': 'YOUR_SECRET'
    }, {
      headers: {
        'Client-ID': 'YOUR_TWITCH_CLIENT_ID',
        'Authorization': 'Bearer YOUR_TWITCH_ACCESS_TOKEN'
      }
    });

    console.log('Subscription response:', response.data);
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to subscribe to webhook:', error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
