export class FilterProps{

    constructor(){

    }

    public filterProjectDDBProps(combined_properties: any, project: string, environment: string) {
        try {
            return combined_properties[project][environment]
        } catch (error) {
            throw error
        }
    }

    public filterProjectSMProps(smConfigs: any, project_key: string){
        try {
            console.log('************(((((()))))')
            console.log(smConfigs[project_key])
            console.log(typeof(smConfigs[project_key]))
            console.log(JSON.parse(smConfigs[project_key]))
            console.log('************(((((()))))')
            return JSON.parse(smConfigs[project_key])
        } catch (error) {
            throw error
        }
    }
}