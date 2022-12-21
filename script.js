// Assignment code here
(function(global) {

// so we can use prompt, etc. like we're in global scope
var prompt         = global.prompt;
var confirm        = global.confirm;
var alert          = global.alert;

var upperCharSet   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerCharSet   = "abcdefghijklmnopqrstuvwxyz";
var numericCharSet = "0123456789";

// See https://owasp.org/www-community/password-special-characters
// " (quote), ' (single-quote), \ (backslash), & (ampersand) all need
// to be escaped with a single backslash
var specialCharSet = " !\"#$%\&\'()*+,-./:;<=>?@[\\]^_`{|}~";

var charSets = {
  upper: {
    isUsed: false,
    chars: upperCharSet
  },
  lower: {
    isUsed: false,
    chars: lowerCharSet
  },
  numeric: {
    isUsed: false,
    chars: numericCharSet
  },
  special: {
    isUsed: false,
    chars: specialCharSet
  }
};

// returns charSets after resetting each object's isUsed property to `false`
function resetCharSets(charSets) {
  for (var obj in charSets) {
    obj.isUsed = false;
  }
  return charSets;
}

function getPwdLength() {
  let pwdlength = prompt("please enter a password length between 8 and 128.");
  let result = parseInt(pwdlength, 10);
  if ((result < 8) || (result > 128) || Number.isNaN(result)) {
    alert("you must enter a number between 8 and 128.");
    return null;
  }
  return result;
}

function confirmCharSet(charSetStr) {
  return confirm("Use " + charSetStr + " characters in your password?");
}

// returns modified charSets object
function confirmCharSets(charSets) {
  charSets.upper.isUsed = confirmCharSet("uppercase");
  charSets.lower.isUsed = confirmCharSet("lowercase");
  charSets.numeric.isUsed = confirmCharSet("numeric");
  charSets.special.isUsed = confirmCharSet("special");

  return charSets;
}

// returns combined string from which password will be randomly generated
function buildCharacterSet(charSets) {
    var result = "";
    if (charSets.upper.isUsed) {
      result += charSets.upper.chars;
    }
    if (charSets.lower.isUsed) {
      result += charSets.lower.chars;
    }
    if (charSets.numeric.isUsed) {
      result += charSets.numeric.chars;
    }
    if (charSets.special.isUsed) {
      result += charSets.special.chars;
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

// global is window object
global.generatePassword = function() {
  var characterSets = resetCharSets(charSets);
  var length = getPwdLength();
  var confirmedCharSets = confirmCharSets(characterSets);
  var charSet = buildCharacterSet(confirmedCharSets);
  console.log("charSet = " + charSet);
  if (charSet === "") {
    alert("You must choose at least one character set.");
    // return empty string or `undefined` will display in DOM element
    return "";
  }
  return generateRandomString(length, charSet);
}

})(window);

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
