const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function() {
  const config = {};
  const configDir = path.join(__dirname, 'config');
  
  // Load all YAML files in the config directory
  const files = fs.readdirSync(configDir).filter(file => file.endsWith('.yaml'));
  
  files.forEach(file => {
    const filePath = path.join(configDir, file);
    const fileName = path.basename(file, '.yaml');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    try {
      config[fileName] = yaml.load(fileContent);
    } catch (e) {
      console.error(`Error loading ${filePath}:`, e);
    }
  });
  
  return config;
};