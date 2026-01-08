pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        AWS_REGION  = "us-west-2"
        LAMBDA_NAME = "readuser"
        ZIP_NAME    = "lambda.zip"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Checking out branch: ${env.BRANCH_NAME}"
                checkout scm
            }
        }

        stage('Package Lambda') {
            steps {
                echo "📦 Packaging for branch: ${env.BRANCH_NAME}"
                sh '''
                  rm -f lambda.zip
                  zip -r lambda.zip index.js Jenkinsfile
                '''
            }
        }

        stage('Deploy to Lambda') {
            steps {
                echo "🚀 DEPLOYING branch: ${env.BRANCH_NAME}"

                sh """
                  aws lambda update-function-code \
                    --function-name ${LAMBDA_NAME} \
                    --region ${AWS_REGION} \
                    --zip-file fileb://${ZIP_NAME}
                """
            }
        }
    }

    post {
        success {
            echo "✅ DEPLOY COMPLETED for branch: ${env.BRANCH_NAME}"
        }
        failure {
            echo "❌ DEPLOY FAILED for branch: ${env.BRANCH_NAME}"
        }
        always {
            sh 'rm -f lambda.zip'
        }
    }
}
