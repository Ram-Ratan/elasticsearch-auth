const express = require("express");
const fs = require('fs');


const { Client } = require('@elastic/elasticsearch');
const client = new Client({ 
  node: 'https://elastic:wUxGBqpO68DFmYNoKwXP@localhost:9200',
  
  ssl: {
    // ca: fs.readFileSync('./cacert.pem'),
    rejectUnauthorized: false
  }
});

module.exports = client;


