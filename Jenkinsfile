pipeline {
    agent any
    
    stages {
        stage('Route to Appropriate Pipeline') {
            steps {
                script {
                    def branch = env.BRANCH_NAME ?: 'dev'
                    def targetJob = ''
                    
                    // Determine which job to trigger
                    if (branch.startsWith('PR-') || branch.contains('pull')) {
                        targetJob = 'todolistt-PR-pipeline'
                        echo "🔀 Routing to PR Pipeline"
                    } else if (branch == 'dev' || branch == 'develop') {
                        targetJob = 'todolistt-DEV-pipeline'
                        echo "🔀 Routing to DEV Pipeline"
                    } else if (branch == 'main' || branch == 'master' || branch.startsWith('release')) {
                        targetJob = 'todolistt-RELEASE-pipeline'
                        echo "🔀 Routing to RELEASE Pipeline"
                    } else {
                        targetJob = 'todolistt-DEV-pipeline'
                        echo "🔀 Unknown branch, routing to DEV Pipeline (default)"
                    }
                    
                    echo "Branch: ${branch}"
                    echo "Target Job: ${targetJob}"
                    
                    // Trigger the appropriate job
                    build job: targetJob, 
                          parameters: [
                              string(name: 'BRANCH', value: branch),
                              string(name: 'BUILD_NUMBER', value: env.BUILD_NUMBER)
                          ],
                          wait: true,
                          propagate: true
                }
            }
        }
    }
    
    post {
        success {
            echo "✓ Pipeline routing successful"
        }
        failure {
            echo "✗ Pipeline routing failed"
        }
    }
}
