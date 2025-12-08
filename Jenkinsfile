pipeline {
    agent any
    
    environment {
        PROJECT_NAME = "todolistt"
        ARTIFACTS_DIR = "${WORKSPACE}\\artifacts"
    }
    
    stages {
        stage('Detect Branch') {
            steps {
                script {
                    def branch = env.BRANCH_NAME ?: 'dev'
                    
                    if (branch.startsWith('PR-') || branch.contains('pull')) {
                        env.PIPELINE_TYPE = 'PR'
                    } else if (branch == 'dev' || branch == 'develop') {
                        env.PIPELINE_TYPE = 'DEV'
                    } else if (branch == 'main' || branch == 'master' || branch.startsWith('release')) {
                        env.PIPELINE_TYPE = 'RELEASE'
                    } else {
                        env.PIPELINE_TYPE = 'DEV'
                    }
                    
                    echo "Running ${env.PIPELINE_TYPE} Pipeline on ${branch}"
                }
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                bat 'docker-compose build'
            }
        }
        
        stage('Run') {
            steps {
                bat '''
                    docker-compose down -v 2>nul || echo cleanup
                    docker rm -f todolistt-mongodb todolistt-backend todolistt-frontend 2>nul || echo removed
                    docker-compose up -d
                    ping -n 21 127.0.0.1 >nul
                '''
            }
        }
        
      
        
        stage('Cleanup') {
            steps {
                bat '''
                    docker-compose down -v 2>nul
                    docker image prune -f 2>nul
                '''
            }
        }
    }
    
    post {
        always {
            echo "${env.PIPELINE_TYPE} Pipeline: ${currentBuild.result}"
        }
        success {
            echo "✓ PASSED"
        }
        failure {
            echo "✗ FAILED"
            bat 'docker-compose logs --tail=50 || echo no logs'
        }
    }
}
