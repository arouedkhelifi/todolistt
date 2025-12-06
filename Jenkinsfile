pipeline {
    agent any

    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Determine Pipeline') {
            steps {
                script {
                    echo """
=========================================================
                MULTI-PIPELINE ROUTER (AUTO-DETECTION)
=========================================================
                    """

                    // Standard Jenkins env variable
                    env.BRANCH_NAME = env.BRANCH_NAME ?: env.GIT_BRANCH?.replace('origin/', '')

                    echo "Branch detected: ${env.BRANCH_NAME}"

                    // Security check
                    if (!env.BRANCH_NAME) {
                        error "BRANCH_NAME is undefined. Jenkins Multibranch Pipeline required."
                    }
                }
            }
        }

        stage('Load Correct Pipeline') {
            steps {
                script {
                    // Pipeline routing
                    if (env.BRANCH_NAME == "main") {
                        echo "Loading Production Pipeline (Jenkinsfile.release)"
                        load "jenkins/Jenkinsfile.release"

                    } else if (env.BRANCH_NAME == "dev") {
                        echo "Loading Development Pipeline (Jenkinsfile.dev)"
                        load "jenkins/Jenkinsfile.dev"

                    } else if (env.BRANCH_NAME.startsWith("feature/")) {
                        echo "Loading Pull Request Pipeline (Jenkinsfile.pr)"
                        load "jenkins/Jenkinsfile.pr"

                    } else {
                        echo "Branch '${env.BRANCH_NAME}' not recognized → Running default pipeline"
                        load "jenkins/Jenkinsfile.default"
                    }
                }
            }
        }
    }
}
