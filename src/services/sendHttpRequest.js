const sendHttpRequest = async (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { sendHttpRequest };
