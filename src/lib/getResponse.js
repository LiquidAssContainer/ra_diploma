// retry на уровне fetch (наверное, не самый изящный)

export async function getResponse({ url, method, data, retryCount = 5 }) {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(+response.status);
    }
    if (response.status === 204) {
      return;
    }
    return await response.json();
  } catch (e) {
    if (!retryCount) {
      throw new Error(e.message);
    } else {
      return await getResponse({
        url,
        method,
        data,
        retryCount: retryCount - 1,
      });
    }
  }
}
