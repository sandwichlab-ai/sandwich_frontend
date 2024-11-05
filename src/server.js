const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

app.use(express.json())

console.log("node part111: ")

const apiUrl = 'https://sandwichlab.auth.ap-southeast-1.amazoncognito.com';

app.use('/api', createProxyMiddleware({
  target: apiUrl,
  changeOrigin: true,  
  pathRewrite: {
    '^/api': '',        
  },
}));

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