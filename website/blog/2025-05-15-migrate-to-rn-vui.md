---
title: React Native Vikalp Elements 5.0 - A Fresh Start for Your UI

authors: [deepktp, rn-vui]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div align='center'>
<img src='/img/website/seo.png' alt="React Native Vikalp Elements Logo" />
</div>

<div className="admonition admonition-info alert alert--info">
  <div className="admonition-content">
    🚀 **React Native Vikalp Elements** is a reborn and actively maintained successor to the original [React Native Elements](https://github.com/react-native-elements/react-native-elements). Recognizing the challenges posed by the original library's lack of maintenance and unresolved issues, we've stepped in to provide a reliable, bug-fixed, and feature-enhanced component library for your React Native projects. Upgrade today for a smoother and more productive development experience!
  </div>
</div>

---

## Migration Guide - Embrace the Vikalp Way!

Moving to **React Native Vikalp Elements** is designed to be a seamless transition. Follow these straightforward steps to bring new life to your UI.

---

<!-- truncate -->

### Step 1: Say Goodbye to the Old, Hello to the New

Choose your preferred package manager to replace the legacy library with Vikalp Elements.

<Tabs>
  <TabItem value="npm" label="npm" default>

#### Purge the Old Guard

```bash
npm uninstall @rneui/base @rneui/themed
```

#### Welcome Vikalp Elements

```bash
npm install @rn-vui/base @rn-vui/themed
```

</TabItem>
<TabItem value="yarn" label="yarn">

#### Remove the Unmaintained Packages

```bash
yarn remove @rneui/base @rneui/themed
```

#### Install the Revitalized Library

```bash
yarn add @rn-vui/base @rn-vui/themed
```

</TabItem>
</Tabs>

---

### Step 2: Update Your Imports - Two Paths to Victory

You have two convenient options for updating your import statements to reflect the new library name.

<Tabs>
<TabItem value="manual" label="Option 1: The Manual Sweep" default>

This method involves a direct find and replace in your project files. Locate all instances of `@rneui` and replace them with `@rn-vui`. This ensures your application points to the newly installed library.

**Example with the `Button` Component:**

```diff
-// Before
-import { Button } from '@rneui/themed';

+// After
+import { Button } from '@rn-vui/themed';
```

Carefully review your entire codebase to ensure every import statement referencing components from the old library is updated.

</TabItem>
<TabItem value="build-tools" label="Option 2: Automate with Build Tools">

For a more automated approach, you can configure your build tools to handle the import replacement during the build process.

#### Install `babel-plugin-module-resolver`

Use the appropriate command for your package manager:

<Tabs>
<TabItem value="npm" label="npm" default>

```bash
npm install --save-dev babel-plugin-module-resolver
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add --dev babel-plugin-module-resolver
```

</TabItem>
</Tabs>

#### Configure Babel

Modify your `babel.config.js` file to include an alias that redirects `@rneui` imports to `@rn-vui`:

```diff
  module.exports = {
-   presets: ['module:@react-native/babel-preset'],

+   presets: ['module:@react-native/babel-preset'],
+   plugins: [
+     [
+       'module-resolver',
+       {
+         root: ['.'],
+         alias: {
+           '@rneui': '@rn-vui',
+         },
+       },
+     ],
+   ]
  };
```

#### Configure TypeScript

Update your `tsconfig.json` file to define a path alias for TypeScript to correctly resolve the new module path:

```diff
{
-   "extends": "@react-native/typescript-config/tsconfig.json"


+   "extends": "@react-native/typescript-config/tsconfig.json",
+   "compilerOptions": {
+     "baseUrl": ".",
+     "paths": {
+       "@rneui/*": ["node_modules/@rn-vui/*"]
+     }
+   }
}
```

> **Important**: After making these configuration changes, **restart your Metro server (`npx react-native start --reset-cache` or `yarn start --reset-cache`) and your code editor** to ensure the updates are applied correctly.

</TabItem>
</Tabs>

---

### Step 3: Test Drive Your Revitalized Application

With the new library in place and imports updated, it's crucial to thoroughly test your application to ensure a smooth transition. Pay close attention to the following components if they are part of your project:

- **Airbnb Ratings and Ratings Components**: We've made some updates to these components. Please test them to ensure they display and function as expected.
- **Bottom Sheet**: Minor adjustments have been made. Verify that it behaves as intended, including sliding actions and interactions.
- **Tabs and Tab Views**: Check that tab navigation and transitions work smoothly after the migration.

> **Note**: While this migration focuses on renaming and bug fixes without introducing major breaking changes, comprehensive testing of these key components will guarantee a stable and functional application.

---

### Troubleshooting Common Migration Hiccups

Here are a few common issues you might encounter during the migration and how to address them:

- **"Module not found: @rneui/themed" or "@rneui/base"**: This usually indicates that the old packages were not completely uninstalled, or the new `@rn-vui` packages were not installed correctly. Double-check your `package.json` and the `node_modules` directory. Rerun the installation commands if necessary.
- **Build errors after updating imports**: If you encounter build errors related to module resolution, try clearing your Metro cache (`npx react-native start --reset-cache` or `yarn start --reset-cache`) and restarting your development server and code editor. This forces Metro to re-evaluate the module dependencies.
- **TypeScript errors related to path aliases**: If you are using TypeScript and encounter errors after updating `tsconfig.json`, ensure that the file has been saved correctly and that your editor and TypeScript language server have picked up the changes. Restarting your editor can often resolve these issues.

> **Need Help?**: If you encounter any issues during the migration, visit our [GitHub Discussions](https://github.com/deepktp/react-native-vikalp-elements/discussions/4) for community support and troubleshooting tips.

---

### Welcome to the Future of Your UI\!

Congratulations\! You've successfully migrated your project to **React Native Vikalp Elements**. You can now benefit from a more stable, actively maintained, and reliable set of UI components.

**What's Next on Your Vikalp Journey?**

- **Explore the Documentation**: Dive deeper into the capabilities of each component in the comprehensive [React Native Vikalp Elements documentation](https://react-native-velements.thevikalp.com/docs).
- **Contribute and Collaborate**: If you encounter any issues or have suggestions for improvements, please don't hesitate to report them on our [GitHub repository](https://github.com/deepktp/react-native-vikalp-elements). We welcome contributions from the community\!
- **Stay Updated**: Keep an eye on our repository and community channels for future updates, new features, and announcements.

Thank you for choosing React Native Vikalp Elements\! We're excited to support you in building amazing React Native applications.
