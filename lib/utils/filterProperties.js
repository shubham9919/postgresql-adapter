"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterProps = void 0;
class FilterProps {
    constructor() {
    }
    filterProjectDDBProps(combined_properties, project, environment) {
        try {
            return combined_properties[project][environment];
        }
        catch (error) {
            throw error;
        }
    }
    filterProjectSMProps(smConfigs, project_key) {
        try {
            console.log('************(((((()))))');
            console.log(smConfigs[project_key]);
            console.log(typeof (smConfigs[project_key]));
            console.log(JSON.parse(smConfigs[project_key]));
            console.log('************(((((()))))');
            return JSON.parse(smConfigs[project_key]);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.FilterProps = FilterProps;
