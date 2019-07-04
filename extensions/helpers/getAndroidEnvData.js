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
  const androidSDKInfo = await envinfo.getAndroidSDKInfo();
  // to get the object - the first item is the string 'Android SDK'
  const androidData = androidSDKInfo[1];

  if (androidAppGradle) {
    return {
      androidAppGradle,
      availableApiVersions: androidData["API Levels"],
      availableBuildToolsVersions: androidData["Build Tools"],
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
