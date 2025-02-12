pipeline {
    agent any

    environment {
        NODE_VERSION = '16'
        APPIUM_VERSION = '2.0.0'
    }

    stages {
        stage('Setup') {
            steps {
                sh """
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    npm install -g appium@${APPIUM_VERSION}
                    npm install
                """
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test Android') {
            when {
                expression { params.PLATFORM == 'android' || params.PLATFORM == 'all' }
            }
            steps {
                sh """
                    appium --allow-insecure chromedriver_autodownload &
                    sleep 10
                    npm run test:android
                """
            }
        }

        stage('Test iOS') {
            when {
                expression { params.PLATFORM == 'ios' || params.PLATFORM == 'all' }
            }
            steps {
                sh """
                    appium --allow-insecure chromedriver_autodownload &
                    sleep 10
                    npm run test:ios
                """
            }
        }

        stage('Generate Report') {
            steps {
                sh 'npm run report'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Report'
                ])
            }
        }
    }

    post {
        always {
            sh 'pkill -f appium || true'
            cleanWs()
        }
    }
} 