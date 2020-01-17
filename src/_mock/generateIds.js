function generateRandomString(length, options) {
  var result = '';
  var characters = options || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateOrderId() {
  const characters = '0123456789';
  return (
    generateRandomString(3, characters) +
    '-' +
    generateRandomString(7, characters) +
    '-' +
    generateRandomString(7, characters)
  );
}

export function generateUserId() {
  return 'A' + generateRandomString(13);
}

export function generateMerchantId() {
  // TODO: differentiate between merchants and users
  return 'A' + generateRandomString(13);
}

export function generateProductId() {
  return 'B' + generateRandomString(9);
}

export function generateItemId() {
  const characters = '0123456789';
  return generateRandomString(5, characters);
}

export function generateRouteId() {
  const characters = '0123456789';
  return generateRandomString(3, characters);
}

export function generateMessageId() {
  return generateRandomString(16);
}
