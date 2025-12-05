pipeline {
    agent any
    
    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    stages {
        stage('🔀 Determine Pipeline') {
            steps {
                script {
                    echo "======================================"
                    echo "🔀 Multi-Branch Pipeline Router"
                    echo "======================================"
                    
                    env. BRANCH_NAME = env.GIT_BRANCH. replace('origin/', '')
                    
                    if (env.BRANCH_NAME == 'main') {
                        echo "📍 Branch: MAIN (Production)"
                    } else if (env.BRANCH_NAME == 'dev') {
                        echo "📍 Branch: DEV (Development)"
                    } else if (env.BRANCH_NAME. startsWith('feature/')) {
                        echo "📍 Branch: FEATURE (${env.BRANCH_NAME})"
                    } else {
                        echo "📍 Branch: OTHER (${env.BRANCH_NAME})"
                    }
                }
            }
        }
    }
}
