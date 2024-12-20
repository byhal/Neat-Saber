import { Song } from '../types/song';

const API_BASE = 'https://api.beatsaver.com';

export async function searchMaps(query: string, page = 0) {
  const response = await fetch(
    `${API_BASE}/search/text/${page}?q=${encodeURIComponent(query)}`
  );
  return response.json();
}

export async function getLatestMaps(page = 0) {
  const response = await fetch(`${API_BASE}/maps/latest/${page}`);
  return response.json();
}

export async function getMapById(id: string) {
  const response = await fetch(`${API_BASE}/maps/id/${id}`);
  return response.json();
}