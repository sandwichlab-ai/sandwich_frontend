/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // 扫描 React 文件
  ],
  theme: {
    extend: {
      colors: {
        primary: '8C68FF',
      },
    },
  },
  plugins: [],
};
