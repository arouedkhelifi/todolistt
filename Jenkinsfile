pipeline {
    agent any
    
    stages {
        stage('Route Pipeline') {
            steps {
                script {
                    def branch = env.BRANCH_NAME ?: 'dev'
                    def pipelineFile = ''
                    
                    // Determine which pipeline to use
                    if (branch.startsWith('PR-') || branch.contains('pull')) {
                        pipelineFile = 'Jenkinsfile.pr'
                        echo "🔀 Routing to PR Pipeline"
                    } else if (branch == 'dev' || branch == 'develop') {
                        pipelineFile = 'Jenkinsfile.dev'
                        echo "🔀 Routing to DEV Pipeline"
                    } else if (branch == 'main' || branch == 'master' || branch.startsWith('release')) {
                        pipelineFile = 'Jenkinsfile.release'
                        echo "🔀 Routing to RELEASE Pipeline"
                    } else {
                        pipelineFile = 'Jenkinsfile.dev'
                        echo "🔀 Unknown branch - Routing to DEV Pipeline (default)"
                    }
                    
                    echo "Branch: ${branch}"
                    echo "Pipeline: ${pipelineFile}"
                    echo "Triggering pipeline execution..."
                    
                    // Load and execute the specific pipeline
                    load(pipelineFile)
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline routing completed"
        }
    }
}
