const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/assets/static/education.json');
const content = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(content);

// Remove certifications from the first object in the array
if (data.length > 0 && data[0].certifications) {
    delete data[0].certifications;
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('Updated education.json');
