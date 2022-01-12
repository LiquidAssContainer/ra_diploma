export async function getResponse({ url, method, data }) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  if (response.status !== 204) {
    return await response.json();
  }
}
