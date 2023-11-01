module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'Nicolas2Moreau',
            name: 'keep-me-cool'
          },
          // repository: "nicolas2moreau/keep-me-cool",
          // authToken: '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',
          authToken:'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',
          prerelease: true,
          draft: true
        },
      }
    ]
  
};
