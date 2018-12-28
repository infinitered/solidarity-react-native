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
  const androidAppGradle = await filesystem.readAsync(
    "./android/app/build.gradle"
  );
  const androidGradle = await filesystem.readAsync("./android/build.gradle");
  const androidData = await envinfo.getAndroidSDKInfo();

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
    };
  } else {
    return { androidAppGradle: null };
  }
};
