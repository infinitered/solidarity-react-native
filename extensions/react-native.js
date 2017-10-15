const addOptionalRules = require('./helpers/addOptionalRules')

module.exports = (context) => {
  // Register this plugin
  context.addPlugin({
    name: 'React Native',
    description: 'Snapshot solidarity rules for React Native projects',
    snapshot: async (context) => {
      // start with template
      let requirements = require('../templates/react-native-template.json')
      // add optional rules
      addOptionalRules(context, requirements)
      // write out .solidarity file
      context.solidarity.setSolidaritySettings(requirements, context)
      // update file with local versions
      await context.system.run('solidarity snapshot')
    }
  })
}
