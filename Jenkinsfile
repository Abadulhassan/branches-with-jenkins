pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()   // prevents parallel deploys
    }

    environment {
        AWS_REGION  = "us-west-2"
        LAMBDA_NAME = "readuser"     // SINGLE lambda
        ZIP_NAME    = "lambda.zip"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Checking out branch: ${env.BRANCH_NAME}"
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "🔧 Building branch: ${env.BRANCH_NAME}"
                sh 'node -v || echo "Node not required"'
            }
        }

        stage('Package') {
            steps {
                echo "📦 Packaging Lambda for ${env.BRANCH_NAME}"
                sh '''
                  rm -f lambda.zip
                  zip -r lambda.zip index.js package.json 2>/dev/null || zip -r lambda.zip .
                '''
            }
        }

        stage('Deploy to Lambda') {
            steps {
                echo "🚀 Deploying SELECTED branch: ${env.BRANCH_NAME}"

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
            echo "✅ SUCCESS: ${env.BRANCH_NAME} deployed"
        }
        failure {
            echo "❌ FAILED: ${env.BRANCH_NAME} deployment failed"
        }
        always {
            sh 'rm -f lambda.zip'
        }
    }
}
