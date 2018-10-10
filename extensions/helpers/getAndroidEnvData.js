const executeRegexOnFiles = (regex, files) => {
  for (let file of files) {
    try {
      return regex.exec(file)[1];
    } catch (e) {}
  }
};

module.exports = context => {
  const { envInfo, filesystem } = context;
  // Version specified by RN project settings
  const androidAppGradle = filesystem.read("./android/app/build.gradle");
  const androidGradle = filesystem.read("./android/build.gradle");
  const androidData = envInfo.getAllAndroidSDKs();

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
    };
  } else {
    return { androidAppGradle: null };
  }
};
