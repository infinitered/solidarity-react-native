module.exports = (context, requirements) => {
  const { solidarity, filesystem } = context
  const { binaryExists } = solidarity
  // Rules we are considering adding
  const mobileCenter = [{rule: 'cli', binary: 'mobile-center', semver: '0.0.0'}]
  const codePush = [{rule: 'cli', binary: 'code-push', semver: '0.0.0'}]
  const npm = [{rule: 'cli', binary: 'npm', semver: '0.0.0'}]
  const yarn = [{rule: 'cli', binary: 'yarn', version: '--version', semver: '0.0.0'}]
  const pod = [{rule: 'cli', binary: 'pod', platform: 'darwin', semver: '0.0.0'}]
  const detox = [
    {rule: 'cli', binary: 'detox'},
    {rule: 'cli', binary: 'applesimutils', error: 'Try `brew install --HEAD applesimutils`', platform: 'darwin'}
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
}
