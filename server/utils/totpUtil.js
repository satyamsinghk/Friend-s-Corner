const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const generateQRcode = async () => {
  const { base32: secret, otpauth_url } = speakeasy.generateSecret({
    name: "SecretCode",
  });

  const data = await qrcode.toDataURL(otpauth_url);
  return { secret, data };
};

const verifyOTP = (token, secret) => {
  return speakeasy.totp.verify({
    encoding: "base32",
    secret,
    token,
  });
};

module.exports = { generateQRcode, verifyOTP };
