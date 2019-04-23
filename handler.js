'use strict';

// top of handler.js
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Wine = require('./models/Wine');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Wine.create(JSON.parse(event.body))
        .then(wine => callback(null, {
          statusCode: 200,
          body: JSON.stringify(wine)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the wine.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Wine.findById(event.pathParameters.id)
        .then(wine => callback(null, {
          statusCode: 200,
          body: JSON.stringify(wine)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the wine.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Wine.find()
        .then(wines => callback(null, {
          statusCode: 200,
          body: JSON.stringify(wines)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the wines.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Wine.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(wine => callback(null, {
          statusCode: 200,
          body: JSON.stringify(wine)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the wines.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Wine.findByIdAndRemove(event.pathParameters.id)
        .then(wine => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed wine with id: ' + wine._id, wine: wine })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the wines.'
        }));
    });
};
