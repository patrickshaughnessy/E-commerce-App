const lorem = require('lorem-ipsum');
const _ = require('lodash');

const { formatPrice } = require('../../lib/utils');

const products = {
  electronics: [
    'HDMI Cable',
    'Speakers',
    'Mouse',
    'Mouse Pad',
    'Power Cord',
    'Monitor Stand',
  ],
  home: [
    'Broom',
    'Mop',
    'Dish soap',
    'Sponges',
    'Laundry detergent',
    'Iron',
    'Towels',
  ],
};

// https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
function padZero(str, len) {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r = parseInt(hex.slice(0, 2), 16);

  let g = parseInt(hex.slice(2, 4), 16);

  let b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '000000' : 'FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return `${padZero(r)}${padZero(g)}${padZero(b)}`;
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generate = ({ category, name }) => {
  const price = formatPrice(
    `${Math.ceil(Math.random() * 100)}.${Math.ceil(Math.random() * 100)}`
  );

  const shortDescription = lorem({
    count: Math.ceil(Math.random() * 2),
    units: 'sentences',
  });

  const longDescription = Array(Math.ceil(Math.random() * 4))
    .fill(1)
    .map(() =>
      lorem({
        count: 1,
        units: 'paragraphs',
      })
    );

  const images = Array(Math.ceil(Math.random() * 2) + 3)
    .fill(1)
    .map(() => {
      const backgroundColor = getRandomColor();
      const textColor = invertColor(backgroundColor, true);
      return {
        src: `https://via.placeholder.com/200/${backgroundColor}/${textColor}/?text=${name
          .split(' ')
          .join('+')}`,
        alt: name,
      };
    });

  const product = {
    price,
    salePrice: price > 10 ? Number((price - price * 0.1).toFixed(2)) : null,
    category,
    name: name.slice(0, 1).toUpperCase() + name.slice(1),
    shortDescription,
    longDescription,
    images,
  };
  return product;
};

const generateAll = () =>
  _.flatten(
    Object.keys(products).map(category =>
      products[category].map(name => generate({ category, name }))
    )
  );

module.exports = {
  products,
  generate,
  generateAll,
};
