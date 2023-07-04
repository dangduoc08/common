module.exports = {
  '*.{js,ts,jsx,tsx}': (filenames) => [
    `eslint --cache --fix --max-warnings=0 ${filenames
      .filter((filename) => !filename.includes('packages/common/dist'))
      .join(' ')}`
  ]
};
