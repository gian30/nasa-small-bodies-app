require('dotenv').config({ path: __dirname+'/../../.env' });
export const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
export const API_KEY = process.env.API_KEY;
export const WHITELIST_URLS = process.env?.WHITELIST_URLS.split(',') || [];
export const SERVER_PORT = process.env?.SERVER_PORT || 4000;