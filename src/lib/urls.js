exports.is_url_valid = (url) => {
  const url_match = url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
  
  if (url_match === null)
    throw 'Invalid URL <{url}> provided.'.replace('{url}', url);
  else 
    return true;
}