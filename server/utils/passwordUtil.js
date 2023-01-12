// const { genSalt, compare, hash } = require("bcrypt");

// const genratePasswordHash = async (password) => {
//   const salt = await genSalt();
//   const hashedPwd = await hash(password, salt);
//   return hashedPwd;
// };

// const verifyPasswordhash = (password, PasswordHash) => {
//   compare(password, PasswordHash);
// };

// module.exports = { genratePasswordHash, verifyPasswordhash };

const { genSalt, compare, hash } = require("bcrypt");

const genratePasswordHash = async (password) => {
  const salt = await genSalt();
  // console.log(salt);
  const hashedPwd = await hash(password, salt);
  return hashedPwd;
};

const verifyPasswordhash = (password, passwordHash) => {
  return compare(password, passwordHash);
};

// const k = "$2b$10$0gkXHXXKpqmhnvpG9xND5efmGZKWw3bcHsmZ8b2fK4dCna/JCMkj.";
// const l = "Qwert@345";

// console.log(verifyPasswordhash(l, k));

module.exports = { genratePasswordHash, verifyPasswordhash };
