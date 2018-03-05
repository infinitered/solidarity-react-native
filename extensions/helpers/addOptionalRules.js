module.exports = (context, requirements) => {
  const { solidarity, filesystem } = context
  const { binaryExists } = solidarity
  // Rules we are considering adding
  const mobileCenter = [{rule: 'cli', binary: 'mobile-center', semver: '0.0.0'}]
  const codePush = [{rule: 'cli', binary: 'code-push', semver: '0.0.0'}]
  const npm = [{rule: 'cli', binary: 'npm', semver: '0.0.0'}]
  const yarn = [{rule: 'cli', binary: 'yarn', version: '--version', semver: '0.0.0'}]
  const typescript = [
    {rule: 'cli', binary: 'tsc', semver: '0.0.0'}
  ]
  const pod = [
    {rule: 'cli', binary: 'pod', platform: 'darwin', semver: '0.0.0'},
    {rule: 'dir', location: './ios/Pods'}
  ]
  const detox = [
    {rule: 'cli', binary: 'detox'},
    {rule: 'cli', binary: 'applesimutils', error: 'Try `brew install --HEAD applesimutils`', platform: 'darwin'}
  ]
  const android = [
    { rule: 'env', variable: 'ANDROID_HOME', error: 'The ANDROID_HOME environment variable must be set to your local SDK.  Refer to getting started docs for help.' },
    { rule: 'custom', plugin: 'React Native', name: 'androidVersion' }
  ]
  const xcode = [
    { rule: 'cli', binary: 'xcodebuild', semver: '0.0', platform: 'darwin' },
    { rule: 'cli', binary: 'xcrun', semver: '0', platform: 'darwin' }
  ]

  // Add if binary exists
  if (binaryExists('mobile-center', context)) {
    requirements['Mobile Center'] = mobileCenter
  }
  if (binaryExists('code-push', context)) {
    requirements['Code Push'] = codePush
  }
  if (binaryExists('npm', context)) {
    requirements['NPM'] = npm
  }

  if (binaryExists('tsc', context) && filesystem.exists('./tsconfig.json')) {
    requirements['TypeScript'] = typescript
  }

  // Add if binary AND yarn.lock exits
  if (binaryExists('yarn', context) && filesystem.exists('./yarn.lock') === 'file') {
    requirements['Yarn'] = yarn
  }

  // Add if binary AND ios/Podfile.lock exits
  if (binaryExists('pod', context) && filesystem.exists('./ios/Podfile.lock') === 'file') {
    requirements['CocoaPods'] = pod
  }

  if (binaryExists('detox', context)) {
    requirements['Detox'] = detox
  }

  if (filesystem.exists('./Android')) {
    requirements['Android'] = android
  }

  if (filesystem.exists('./ios')) {
    requirements['Xcode'] = xcode
  }
}
