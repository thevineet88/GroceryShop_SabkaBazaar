export const fetchStaticData = async (url, method = 'GET') => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
  