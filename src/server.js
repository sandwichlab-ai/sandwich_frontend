const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000', // 替换为您的前端地址
}));

app.use(express.json())

console.log("node part111: ")

// const apiUrl = "https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=6cc58a4esgfbhngiq8437afip1&redirect_uri=https%3A%2F%2Fopenidconnect.net%2Fcallback" 
const apiUrl = 'https://sandwichlab.auth.ap-southeast-1.amazoncognito.com';
const COGNITO_DOMAIN = 'sandwichlab.auth.ap-southeast-1.amazoncognito.com';

app.use('/api', createProxyMiddleware({
  target: apiUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(24, res.body)
  },
}));

app.get("/api/token", async (req, res) => {
  console.log(32, req.body)
  // res.json({ message: 'Contact form submitted successfully' });
  try {
    const tokenResponse = await axios.post(    // sandwichlab.auth.ap-southeast-1.amazoncognito.com
      `URL_ADDRESS      `https://${COGNITO_DOMAIN}/oauth2/token`,URL_ADDRESS  URL_ADDRESS  URL_ADDRESS
    )
  }
  catch (error) {
    console.error('Error in authentication:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}
)

app.post('/api/login', async (req, res) => {
  console.log(32, req.body)
  // res.json({ message: 'Contact form submitted successfully' });
  try {
    const tokenResponse = await axios.post(    // sandwichlab.auth.ap-southeast-1.amazoncognito.com
      `https://${COGNITO_DOMAIN}/oauth2/token`,
      qs.stringify({
        grant_type: 'authorization_code',
        client_id: "6cc58a4esgfbhngiq8437afip1",
        redirect_uri: req.body.redirect_uri,
        code: req.body.response_type,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`6cc58a4esgfbhngiq8437afip1:`).toString('base64')}`,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // replace FACEBOOK_GRAPH_API with the appropriate Facebook Graph API endpoint
    const FACEBOOK_GRAPH_API = 'URL_ADDRESS';
    const userResponse = await axios.get(`${FACEBOOK_GRAPH_API}?fields=id,name,email`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userData = userResponse.data;

    res.json({ user: userData, token: access_token });
  } catch (error) {
    console.error('Error in authentication:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

const contactUrl = "https://api.sandwichlab.ai/submit";

app.use('/api/contact', createProxyMiddleware({
  target: contactUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api/contact': '',
  },
  onProxyReq: (proxyReq, req, res) => {

  },
}))



const port = 5000;
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});

// test use, to avoid cors error when calling aws api 