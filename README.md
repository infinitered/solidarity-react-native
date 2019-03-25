<a href='https://infinitered.github.io/solidarity/'><img src='https://github.com/infinitered/solidarity/raw/master/_art/plugin.jpg' align='left' height="60"/></a>

# solidarity-react-native
### For quickly taking snapshots of environments for React Native projects
By using this plugin to solidarity, you can snapshot your environment to verify the project is in a similar environment on other machines.

# How to use this plugin

```bash
npm i -g solidarity-react-native
# or
yarn global add solidarity-react-native

# go to your react native project and run:
solidarity snapshot
```

this will check the dependencies you have installed and needed in that project and creates the `.solidarity` file.

# Requirements

This plugin snapshots these Solidarity requirements:
* Always Adds
  * Node
  * Watchman
  * React Native
  * Package.json
* If detected Adds
  * Mobile Center
  * Code Push
  * NPM
  * Yarn
  * CocoaPods
  * Detox
  * Android
  * TypeScript
  * Xcode

# What is Solidarity?
#### [:newspaper: Read More About Solidarity Here](https://github.com/infinitered/solidarity)
