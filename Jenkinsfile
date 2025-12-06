pipeline {
    agent any

    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('🔀 Select Pipeline') {
            steps {
                script {
                    echo "======================================"
                    echo "🔀 Multi-Branch Pipeline Router"
                    echo "======================================"

                    echo "Jenkins BRANCH_NAME: ${env.BRANCH_NAME}"

                    switch(env.BRANCH_NAME) {

                        case "dev":
                            echo "➡️ Running DEV pipeline"
                            load "Jenkinsfile.dev"
                            break

                        case "main":
                            echo "➡️ Running RELEASE pipeline"
                            load "Jenkinsfile.release"
                            break

                        default:
                            if (env.BRANCH_NAME.startsWith("feature/") || 
                                env.BRANCH_NAME.startsWith("pr/")) {

                                echo "➡️ Running PR pipeline"
                                load "Jenkinsfile.pr"
                            } else {
                                error "❌ No pipeline matched for branch: ${env.BRANCH_NAME}"
                            }
                    }
                }
            }
        }
    }
}
