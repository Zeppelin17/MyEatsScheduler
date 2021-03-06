/**
 * Postcss main config file
 *
 * @summary Postcss main config file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-06 06:17:51 
 * Last modified  : 2020-05-08 06:43:17
 */
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
  variants: {
    appearance: ['responsive', 'hover', 'focus']
  }
}
