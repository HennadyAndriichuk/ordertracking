import axios from 'axios';

export const fetchApi = async (url, method, id, data = null) => {
  try {
    let response;
    switch (method) {
      case 'POST':
        response = await axios.post(url, data);
        break;
      case 'PATCH':
        response = await axios.patch(`${url}/${id}`, data);
        break;
      case 'DELETE':
        response = await axios.request({
          url: url,
          method: 'DELETE',
          data: data,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        break;
      default:
        throw new Error('Invalid method');
    }
    return response.data;
  } catch (error) {
    console.error(`Error with ${method} request:`, error);
    throw error;
  }
};
