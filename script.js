// Assignment code here

// TODO: Generate a simple password of given length and test it

// Passwords will be generated from user-chosen combinations
// of charSets properties.
const charSets = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numeric: "0123456789",
  // List of special characters obtained
  // from https://owasp.org/www-community/password-special-characters
  //
  // " (quote), ' (single-quote), \ (backslash), & (ampersand) all need
  // to be escaped with a single backslash
  special: " !\"#$%\&\'()*+,-./:;<=>?@[\\]^_`{|}~"
};

const comboSet = charSets.upper + charSets.lower + charSets.numeric + charSets.special;

function generateRandomString(length, config = null) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += comboSet[Math.floor(Math.random() * comboSet.length)];  
  }
  return result;
}

// TODO: Remove -- Just for intial tests
const generatePassword = function() {
  return generateRandomString(50);
};

/**************** Preserve code below ***************************/

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
