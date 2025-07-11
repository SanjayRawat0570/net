// backend/services/tmdb.service.js
import axios from "axios";

export async function fetchFromTMDB(endpoint) {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    const url = `${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("TMDB Fetch Error:", error.message);
    throw error;
  }
}




