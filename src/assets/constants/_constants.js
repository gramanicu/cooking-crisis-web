// A regex string used to validate email addresses
export const email_regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

// A regex string used to validate a password
// The password must contain at least 8 (maximum 32) characters, including
// a number, uppercase, lowercase and one special character
export const password_regexp =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#!$%&'*+,-./:;<=>?@^_`~])(?=.{8,32})"

// A regex string used to validate the IGN (alphanumeric + some special chars). Between
// 1 and 16 chars
export const username_regexp = /^[ A-Za-z0-9_.#&-]{1,16}$/

// A "enum" that has the definitions for the different status numbers
export const user_status = Object.freeze({
    undefined: 0,
    offline: 1,
    online: 2,
    afk: 3,
    playing: 4,
})

// The base route for the api calls
export const http_root = "https://cooking-crisis-api-dev.herokuapp.com/api/v1/"
export const socket_root = "https://cooking-crisis-api-dev.herokuapp.com"
