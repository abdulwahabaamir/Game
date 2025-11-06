import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const SECRET_KEY = "my-very-secure-secret-key";
const COOKIE_NAME = "authToken";
const EXPIRY_MINUTES = 10;

export function logout() {
  Cookies.remove(COOKIE_NAME);
}

export function createAuthToken(mobile) {
  try {
    const data = {
      mobile,
      timestamp: Date.now()
    };

    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      SECRET_KEY
    ).toString();

    Cookies.set(COOKIE_NAME, encryptedToken, {
      expires: EXPIRY_MINUTES / (24 * 60),
      secure: false,
      sameSite: "strict",
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function validateToken() {
  try {
    const token = Cookies.get(COOKIE_NAME);
    if (!token) return false;

    const decrypted = CryptoJS.AES.decrypt(token, SECRET_KEY)
      .toString(CryptoJS.enc.Utf8);

    const data = JSON.parse(decrypted);

    const now = Date.now();
    if (now > data.timestamp + EXPIRY_MINUTES * 60_000) {
      logout();
      return false;
    }

    return data;
  } catch {
    logout();
    return false;
  }
}
