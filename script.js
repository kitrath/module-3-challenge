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


function getPwdLength() {
  let pwdlength = prompt("please enter a password length between 8 and 128.");
  let result = parseInt(pwdlength, 10);
  if ((result < 8) || (result > 128) || Number.isNaN(result)) {
    alert("you must enter a number between 8 and 128.");
    return null;
  }
  return result;
}

 
function generateRandomString(length, characterSet) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characterSet[Math.floor(Math.random() * characterSet.length)];  
  }
  return result;
}

// TODO: Remove -- Just for intial tests
const generatePassword = function() {
  let length = getPwdLength();
  var upper = false;
  var lower = false;
  var numeric = false;
  var special = false;
  upper = confirm("use uppercase letters in your password?");
  lower = confirm("use lowercase letters in your password?");
  numeric = confirm("use numerals in your password?");
  special = confirm("use special characters in your password?");

  function buildCharacterSet() {
    var result = "";
    if (upper) {
      result += charSets.upper;
    }
    if (lower) {
      result += charSets.lower;
    }
    if (numeric) {
      result += charSets.numeric;
    }
    if (special) {
      result += charSets.special;
    }
    return result;
  }

  var charSet = buildCharacterSet();
  console.log("charSet = " + charSet);
  if (charSet === "") {
    alert("You must choose at least one character set.");
    return;
  }
  return generateRandomString(length, charSet);
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
