const formatPrice = price => Number(price).toFixed(2);

const maskEmail = email => {
  if (!email) return null;

  const maskChar = '*';
  const fillWithMask = num =>
    Array(num)
      .fill(maskChar)
      .join('');

  let masked;
  try {
    const emailRegex = /(.*)@(.*)(\.\w{1,}$)/g;
    const leftSideRegex = /(.{1})(.*)/g;
    masked = email.replace(
      emailRegex,
      (match, address, domain, tld) =>
        `${address.replace(
          leftSideRegex,
          (m, p1, p2) => `${p1}${fillWithMask(p2.length)}`
        )}@${fillWithMask(domain.length)}${tld}`
    );
  } catch (e) {
    console.log('error masking email', e);
  }
  return masked || '';
};

module.exports = {
  formatPrice,
  maskEmail,
};
