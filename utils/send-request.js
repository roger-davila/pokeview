// All requests for this API are GET requests
// No other headers required
export default async function sendRequest(url) {
  const res = await fetch(url);
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}