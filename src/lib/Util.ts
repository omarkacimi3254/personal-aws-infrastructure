export class Util {
    private static readonly projectName = 'personal-aws-infrastructure';
    private static readonly alarmingEmail = 'omar.kacimi.aws.live@gmail.com';
    private static readonly stages = [
        {
            name: "live",
            account: '813301723154',
            region: 'eu-central-1'
        }
    ];

    private static readonly GITHUB_PROJECT_OWNER = 'KacAmo';

    public static getAlarmingEmail() {
        return this.alarmingEmail
    }

    public static getGithubProjectOwner() {
        return this.GITHUB_PROJECT_OWNER
    }

    public static getProjectName() {
        return this.projectName
    }

    public static getStages() {
        return this.stages
    }

    public static getApplicationTags() {
        return {
            "project": Util.getProjectName()
        }
    }

    public static getPipelineTags() {
        return {
            "project": Util.getProjectName() + "-pipeline"
        }
    }
}