module.exports = (context) => {
  const { envInfo, filesystem } = context
  // Version specified by RN project settings
  const androidGradle = filesystem.read('./android/app/build.gradle')
  const androidData = envInfo.getAllAndroidSDKs()

  if (androidGradle) {
    return {
      androidGradle,
      availableApiVersions: androidData['API Levels'],
      availableBuildToolsVersions: androidData['Build Tools'],
      projectApiVersion: /compileSdkVersion\s(\d+)/.exec(androidGradle)[1],
      projectBuildToolsVersion: /buildToolsVersion\s\"([\d|.]+)\"/.exec(androidGradle)[1]
    }
  } else {
    return { androidGradle: null }
  }
}
