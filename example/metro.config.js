const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro handle the monorepo packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Custom resolver to point to src instead of dist
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Handle @rn-vui packages - redirect to src instead of dist
  if (moduleName.startsWith('@rn-vui/base')) {
    const packagePath = path.resolve(workspaceRoot, 'packages/base');
    
    // Remove the package name prefix
    let subpath = moduleName.replace('@rn-vui/base', '').replace(/^\//, '');
    
    // Remove 'dist/' if it's in the path (e.g., '@rn-vui/base/dist/Badge/Badge')
    subpath = subpath.replace(/^dist\//, '');
    
    // Build the base path
    const basePath = subpath 
      ? path.join(packagePath, 'src', subpath)
      : path.join(packagePath, 'src', 'index');
    
    // Try different extensions for files
    const extensions = ['.tsx', '.ts', '.native.tsx', '.native.ts', '.js', '.jsx'];
    for (const ext of extensions) {
      const filePath = basePath + ext;
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return {
          type: 'sourceFile',
          filePath: filePath,
        };
      }
    }
    
    // If no file found, try as directory with /index
    if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
      for (const ext of extensions) {
        const filePath = path.join(basePath, 'index' + ext);
        if (fs.existsSync(filePath)) {
          return {
            type: 'sourceFile',
            filePath: filePath,
          };
        }
      }
    }
  }
  
  if (moduleName.startsWith('@rn-vui/themed')) {
    const packagePath = path.resolve(workspaceRoot, 'packages/themed');
    
    // Remove the package name prefix
    let subpath = moduleName.replace('@rn-vui/themed', '').replace(/^\//, '');
    
    // Remove 'dist/' if it's in the path
    subpath = subpath.replace(/^dist\//, '');
    
    // Build the base path
    const basePath = subpath
      ? path.join(packagePath, 'src', subpath)
      : path.join(packagePath, 'src', 'index');
    
    // Try different extensions for files
    const extensions = ['.tsx', '.ts', '.native.tsx', '.native.ts', '.js', '.jsx'];
    for (const ext of extensions) {
      const filePath = basePath + ext;
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return {
          type: 'sourceFile',
          filePath: filePath,
        };
      }
    }
    
    // If no file found, try as directory with /index
    if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
      for (const ext of extensions) {
        const filePath = path.join(basePath, 'index' + ext);
        if (fs.existsSync(filePath)) {
          return {
            type: 'sourceFile',
            filePath: filePath,
          };
        }
      }
    }
  }
  
  // Let the default resolver handle everything else
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
