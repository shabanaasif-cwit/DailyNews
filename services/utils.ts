// services/utils.ts
//maximum number of times the function will try to fetch the data before finally reporting an error
export async function fetchWithRetry(url: string, options = {}, retries = 3) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}
