const devBaseUrl = 'http://crm.metujia.com';
// const devProdUrl = 'http://crm.metujia.com';
const curBaseUrl = devBaseUrl || devProdUrl;

const loginBaseUrl = curBaseUrl;
const apiBaseUrl = curBaseUrl + '/api';

let userInfo = {}

export default {
  loginBaseUrl,
  apiBaseUrl,
  curBaseUrl,
  userInfo
}