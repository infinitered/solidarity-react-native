module.exports = (context) => {
  // Register this plugin
  context.pluginsList.push({
    name: 'React Native',
    description: 'Snapshot solidarity rules for React Native projects',
    snapshot: async (context) => {
      const { filesystem, system } = context
      // Copy template
      filesystem.copy(
        `${__dirname}/../templates/react-native-template.ejs`,
        '.solidarity'
      )
      // Update versions to local
      await system.run('solidarity snapshot')
    }
  })
}
