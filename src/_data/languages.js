const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function() {
  const languages = {};
  const languagesDir = path.join(__dirname, 'languages');
  
  // Get all language directories
  const langDirs = fs.readdirSync(languagesDir).filter(file => {
    return fs.statSync(path.join(languagesDir, file)).isDirectory();
  });
  
  // Load data for each language
  langDirs.forEach(lang => {
    languages[lang] = {};
    const langPath = path.join(languagesDir, lang);
    
    // Load all YAML files in the language directory
    const files = fs.readdirSync(langPath).filter(file => file.endsWith('.yaml'));
    
    files.forEach(file => {
      const filePath = path.join(langPath, file);
      const fileName = path.basename(file, '.yaml');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      try {
        languages[lang][fileName] = yaml.load(fileContent);
      } catch (e) {
        console.error(`Error loading ${filePath}:`, e);
      }
    });
  });
  
  return languages;
};