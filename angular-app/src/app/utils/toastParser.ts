export function successToast(data: any) {
  return data.message;
}

export function errorToast(data: any) {
  const error = data.response.data;
  let message = '';
  if (error.errors) {
    const keys = Object.keys(error.errors);
    keys.forEach((key) => {
      message = error.errors[key][0]
    })
  }

  if (error.error) {
    message = error.error.message;
  }

  return message;
}
