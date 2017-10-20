const addOptionalRules = require('./helpers/addOptionalRules')

module.exports = (context) => {
  // Register this plugin
  context.addPlugin({
    name: 'React Native',
    description: 'Snapshot solidarity rules for React Native projects',
    snapshot: async (context) => {
      // start with template
      let solidarity = require('../templates/react-native-template.json')
      // add optional rules
      addOptionalRules(context, solidarity.requirements)
      // write out .solidarity file
      context.solidarity.setSolidaritySettings(solidarity, context)
      // update file with local versions
      await context.system.run('solidarity snapshot')
    }
  })
}
