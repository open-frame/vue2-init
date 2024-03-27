import CryptoJS from 'crypto-js'

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse("1234567890123456");
const IV = CryptoJS.enc.Utf8.parse('1234567890123456');


export default {
  /**
   * AES加密 ：字符串 key iv  返回base64
   */
  encrypt(word) {
    let key = KEY;
    let iv = IV;
    let src = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(src, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },


  /**
   * AES 解密 ：字符串 key iv  返回base64
   *
   * @return {string}
  */
  decrypt(word) {
    let key = KEY;
    let iv = IV;
    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);
    let decrypt = CryptoJS.AES.decrypt(src, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    console.log(CryptoJS.enc.Utf8.stringify(decrypt.words));
    return CryptoJS.enc.Utf8.stringify(decrypt.words).toString()
  }
}
