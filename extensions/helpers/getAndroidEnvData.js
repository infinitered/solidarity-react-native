const path = require('path')

const executeRegexOnFiles = (regex, files) => {
  for (let file of files) {
    try {
      return regex.exec(file)[1];
    } catch (e) {}
  }
};

module.exports = async context => {
  const { envinfo, filesystem } = context;
  // Version specified by RN project settings
  const appGradlePath = path.join(process.cwd(), "android", "app", "build.gradle")
  const gradlePath = path.join(process.cwd(), "android", "build.gradle")

  const androidAppGradle = await filesystem.readAsync(appGradlePath)
  const androidGradle = await filesystem.readAsync(gradlePath)
  const androidData = await envinfo.getAndroidSDKInfo()

  if (androidAppGradle) {
    return {
      androidAppGradle,
      availableApiVersions: androidData[1]["API Levels"],
      availableBuildToolsVersions: androidData[1]["Build Tools"],
      projectApiVersion: executeRegexOnFiles(/compileSdkVersion\s=?\s?(\d+)/, [
        androidAppGradle,
        androidGradle
      ]),
      projectBuildToolsVersion: executeRegexOnFiles(
        /buildToolsVersion\s=?\s?["|']([\d|.]+)["|']/,
        [androidAppGradle, androidGradle]
      )
    }
  } else {
    return { androidAppGradle: null };
  }
};
