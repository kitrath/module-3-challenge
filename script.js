// Use an Immediatly Invoked Function Expression (IIFE)
// to protect the global scope.
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

// resets each object's isUsed property to false
function resetCharSets(charSets) {
  for (var obj in charSets) {
    obj.isUsed = false;
  }
  return charSets;
}

function getPwdLength() {
  var pwdlength = prompt("please enter a password length between 8 and 128.");
  var result = parseInt(pwdlength, 10);
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

// Returns combined string of character sets
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

function buildArrayOfInts(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getValueAtRandomIndex(arr) {
  return arr[getRandomInt(arr.length)];
}

// returns a number (int)
function spliceToRandomInt(arr) {
  // modifies arr, arr.length = arr.length - 1 after call
  return arr.splice(getRandomInt(arr.length), 1)[0];
}

// returns array 
// call after confirmCharSets()
function getChosenCharSetNames(charSet) {
  var arr = [];
  for (var obj in charSet) {
    if (charSet[obj]['isUsed']) {
      arr.push(obj)
    }
  }
  return arr;
}

// chosenLength - chosen password length
// charSetNameList - list of chosen character sets
// returns a Map of int to string
function buildIntToCharSetMap(chosenLength, charSetNameList) {
  var resultMap = new Map();
  var indexArray = buildArrayOfInts(chosenLength);
  for (var charSetName of charSetNameList) {
    // Doing this twice, for now, on purpose.
    // indexArray decreases length by 1 with each call
    resultMap.set(spliceToRandomInt(indexArray), charSetName);
    resultMap.set(spliceToRandomInt(indexArray), charSetName);
  }
  return resultMap
}
 
function generateRandomString(length, combinedSet, charSets, configMap) {
  let result = '';
  for (let i = 0; i < length; i++) {
    // `configMap` maps random indices to particular character sets
    // to ensure that (especially smaller) generated passwords contain
    // characters from all chosen sets. see `buildIntToCharSetMap()`
    if (configMap.has(i)) {
      var singleSet = charSets[configMap.get(i)].chars;
      result += getValueAtRandomIndex(singleSet);
    } else {
      result += getValueAtRandomIndex(combinedSet);
    }
  }
  // TODO: Don't allow generated strings to begin or end with space character.
  return result;
}

// global is window object
global.generatePassword = function() {
  var characterSets = resetCharSets(charSets);
  var length = getPwdLength();
  var confirmedCharSets = confirmCharSets(characterSets);
  var combinedString = buildCharacterSet(confirmedCharSets);

  if (combinedString === "") {
    alert("You must choose at least one character set.");
    // return empty string or `undefined` will display in DOM element
    return "";
  }

  var chosenCharSets = getChosenCharSetNames(confirmedCharSets);
  var charSetMap = buildIntToCharSetMap(length, chosenCharSets);
  return generateRandomString(length, combinedString, 
                                      confirmedCharSets, charSetMap);
}

// END IIFE
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
