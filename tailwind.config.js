module.exports = {
  content: [
    './src/javascripts/components/**/*.{html,js}',
    './src/javascripts/locations/**/*.{html,js}',
    './src/templates/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@zendeskgarden/tailwindcss')]
}
