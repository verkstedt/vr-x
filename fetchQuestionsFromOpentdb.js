const axios = require('axios')

/**
 * Fetch questions from opentdb.com
 * @param amount - 1-50
 * @param type - 'multiple' or 'boolean'
 * @param options - https://opentdb.com/api_config.php
 * @returns {Promise<Object[]>}
 */
export const fetchQuestionsFromOpentdb = async (amount = 10, type = 'multiple', options = {}) => {
  const url = new URL('https://opentdb.com/api.php');

  url.searchParams.append('amount', amount);
  url.searchParams.append('type', type);

  for (const key in options) {
    url.searchParams.append(key, options[key]);
  }

  let response

  try {
    response = await axios.get(url);
  } catch (error) {
    console.error(error);
    return []
  }

  const result = response.data

  return result
}