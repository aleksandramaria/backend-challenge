export const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'v1.0!'
      }),
  };
};

export const reservation = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'here is your reservation'
      }),
  };
};
