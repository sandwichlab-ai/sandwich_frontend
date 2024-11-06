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