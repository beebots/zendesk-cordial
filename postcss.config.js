module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('postcss-import'),
    require('precss'),
    require('tailwindcss')({ config: './tailwind.config.js' }),
  ]
}
