// module.exports = (context) => {
//   // Register this plugin
//   context.pluginsList.push({
//     name: 'React Native',
//     description: 'Snapshot solidarity rules for React Native projects',
//     snapshot: `${__dirname}/../templates/react-native-template.ejs`
//   })
// }

module.exports = (context) => {
  // Register this plugin
  context.addPlugin({
    name: 'React Native',
    description: 'Snapshot solidarity rules for React Native projects',
    snapshot: `react-native-template.json`
  })
}
