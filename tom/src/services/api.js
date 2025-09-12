import axios from 'axios'

// export const baseURL = 'https://api.kkmartonline.com/'
export const baseURL = 'http://192.168.0.108:1436/'
// export const baseURL = 'http://46.202.162.17:1436/'

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json', },
})

// login API
export const loginUser = (data) =>
  api.post('login-user', data);

// fetch API's
export const getFetchAccountTypes = () =>
  api.get('fetch-account-types');

export const getFetchGroups = () =>
  api.get('fetch-groups');

export const getFetchSubCompanies = () =>
  api.get('get-sub-companies');

export const getFetchCompanyTypes = () =>
  api.get('fetch-company-types');

export const getFetchRoles = () =>
  api.get('fetch-roles');

export const getFetchPaymentTerms = () =>
  api.get('fetch-payment-terms');

export const getFetchAllAccounts = (params) =>
  api.get('fetch-all-chart-of-accounts', { params });

export const getFetchAllCompanies = (params) =>
  api.get('get-all-companies', { params });

export const getFetchAllUsers = (params) =>
  api.get('get-all-users', { params });

// create API's
export const createChartAccount = (data) =>
  api.post('create-chart-of-account', data)

export const createCompany = (data) =>
  api.post('create-company', data)

export const createUser = (data) =>
  api.post('create-user', data)

export const createPaymentTerms = (data) =>
  api.post('create-payment-term', data)

// Update API's
export const updateAccountDetails = (id, data) =>
  api.put(`update-account-details/${id}`, data)



export default api;