const addOptionalRules = require('./helpers/addOptionalRules')
const getAndroidEnvData = require('./helpers/getAndroidEnvData')

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
    },
    rules: {
      androidVersion: {
        check: async (rule, context) => {
          const {
            androidGradle,
            availableApiVersions,
            availableBuildToolsVersions,
            projectApiVersion,
            projectBuildToolsVersion
          } = getAndroidEnvData(context)

          if (androidGradle) {
            const buildGood = availableBuildToolsVersions.includes(projectBuildToolsVersion)
            const apiGood = availableApiVersions.includes(projectApiVersion)
            if (buildGood && apiGood) {
              return {
                pass: true,
                message: `Android API ${projectApiVersion} & Build Tools ${projectBuildToolsVersion}`
              }
            } else {
              let failMessages = []
              if (!buildGood) failMessages.push(`Build Tool ${projectBuildToolsVersion} Not Found`)
              if (!apiGood) failMessage.push(`API ${projectApiVersion} Not Found`)
              return {
                pass: false,
                message: failMessages.join(' & ')
              }
            }
          } else {
            return {
              pass: false,
              message: './android/app/build.gradle not found'
            }
          }
        },
        report: async (rule, context, report) => {
          const { print } = context
          const { colors } = print
          const {
            androidGradle,
            availableApiVersions,
            availableBuildToolsVersions,
            projectApiVersion,
            projectBuildToolsVersion
          } = getAndroidEnvData(context)

          const projectAPIMessage = availableApiVersions.includes(projectApiVersion)
            ? colors.green(`API ${projectApiVersion} Available`)
            : colors.red(`API ${projectApiVersion} Unavailable`)

          const projectBuildToolsMessage = availableBuildToolsVersions.includes(projectBuildToolsVersion)
            ? colors.green(`Build Tools ${projectBuildToolsVersion} Available`)
            : colors.red(`Build Tools ${projectBuildToolsVersion} Unavailable`)

          report.customRules.push({
            title: 'Android SDK',
            table: [
              ['Project API Version', 'Project Build Tools'],
              [projectAPIMessage, projectBuildToolsMessage],
            ]
          })
        }
      }
  })
}
