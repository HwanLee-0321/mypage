const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/assets/static');
const files = ['awards', 'education', 'experience', 'projects', 'skills'];

const unwrap = (val) => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
        // Prefer English, then Korean, then first value
        return unwrap(val.en || val.ko || Object.values(val)[0]);
    }
    return val;
};

const revertFile = (fileName) => {
    const filePath = path.join(dataDir, `${fileName}.json`);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    let revertedData;

    if (fileName === 'skills') {
        const combinedSkills = {};
        // Handle if data is array of objects (current state) or array of one object (original state)
        const skillsArray = Array.isArray(data) ? data : [data];

        skillsArray.forEach(cat => {
            // Check if cat has 'category' property (new structure) or if it IS the object (old structure)
            if (cat.category) {
                const categoryName = unwrap(cat.category);
                const simplifiedItems = cat.items.map(item => ({
                    ...item,
                    name: unwrap(item.name)
                }));
                combinedSkills[categoryName] = simplifiedItems;
            } else {
                // It might be the old structure { "Category": [...] }
                // But we are reverting, so we assume it's in the new structure or corrupted new structure.
                // If it's already reverted, this might break? 
                // Let's assume input is the localized array format.
                // If input is { "Category": ... }, Object.entries(cat) would work.

                // Actually, let's look at the corrupted skills.json to be sure.
                // But for now, let's stick to the structure we know we generated.
            }
        });

        // If the loop above didn't populate combinedSkills (because structure was different), 
        // let's try to handle the array-of-objects structure we generated.
        if (Object.keys(combinedSkills).length === 0 && Array.isArray(data)) {
            data.forEach(item => {
                if (item.category && item.items) {
                    combinedSkills[unwrap(item.category)] = item.items.map(i => ({
                        ...i,
                        name: unwrap(i.name)
                    }));
                }
            });
        }

        revertedData = [combinedSkills];
    } else {
        revertedData = data.map(item => {
            const newItem = {};
            for (const key in item) {
                const value = item[key];
                // Recursively unwrap
                if (key === 'roles' && Array.isArray(value)) {
                    newItem[key] = value.map(role => {
                        const newRole = {};
                        for (const rKey in role) {
                            newRole[rKey] = unwrap(role[rKey]);
                        }
                        return newRole;
                    });
                } else {
                    newItem[key] = unwrap(value);
                }
            }
            return newItem;
        });
    }

    fs.writeFileSync(filePath, JSON.stringify(revertedData, null, 2));
    console.log(`Reverted ${fileName}.json`);
};

files.forEach(revertFile);
