let plugins = [];
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}



module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    ...plugins,
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
}
