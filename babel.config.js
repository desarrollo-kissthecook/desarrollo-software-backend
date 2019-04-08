module.exports = function babelConfig(api) {
  const presets = [
    [
      '@babel/env',
      {
        targets: {
          ie: '9',
          browsers: ['>1%', 'last 3 versions'],
        },
        modules: false,
        useBuiltIns: 'usage',
      },
    ],
  ];

  return { presets };
};
