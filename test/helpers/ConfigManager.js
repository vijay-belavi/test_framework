const globalConfig = require('../../resources/globalConfig');

class ConfigManager {
    constructor(overrides = {}) {
        this.overrides = overrides;

        // Create a Proxy to handle variable access dynamically
        return new Proxy(this, {
            get: (target, prop) => {
                if (prop in target.overrides) return target.overrides[prop];
                if (prop in globalConfig) return globalConfig[prop];
                return undefined; // variable not found
            },
            set: (target, prop, value) => {
                // Set local override
                target.overrides[prop] = value;
                return true;
            }
        });
    }
}

module.exports = ConfigManager;