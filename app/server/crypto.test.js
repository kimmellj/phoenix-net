const Crypto = require('./crypto')

test('Should create a encrypt / decrypt a string', () => {
  const source = 'This is a test of some string to encrypt using the Crypto class!'
  const encrypted = Crypto.encrypt(source)
  const encryptedTwo = Crypto.encrypt(source)

  expect(encrypted).not.toBe(source)
  expect(encryptedTwo).not.toBe(encrypted)

  const decrypted = Crypto.decrypt(encrypted)
  const decryptedTwo = Crypto.decrypt(encryptedTwo)

  expect(decrypted).toBe(source)
  expect(decryptedTwo).toBe(source)
})
