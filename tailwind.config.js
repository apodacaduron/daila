module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    colors: {
      'background-primary': '#FAFAFA',
      'background-secondary': '#F4F4F4',
      'background-tertiary': '#EAECF2',
      'text-primary': '#202027',
      'text-secondary': '#A0A6B1',
      'blue-secondary': '#22BCFD',
      'blue-primary': '#0660FD',
      'blue-tertiary': '#1400FE',
    },
  },
  plugins: [],
}
