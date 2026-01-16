pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        AWS_REGION  = "us-west-2"
        ZIP_NAME    = "lambda.zip"
        LAMBDA_NAME = "readuser"  // Same for all branches
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out branch: ${env.BRANCH_NAME}"
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Building code for ${env.BRANCH_NAME}"
                sh '''
                  node -v || echo "Node not required"
                '''
            }
        }

        stage('Package Lambda') {
            steps {
                echo "Packaging Lambda for ${env.BRANCH_NAME}"
                sh '''
                  rm -f lambda.zip
                  zip -r lambda.zip .
                '''
            }
        }

        stage('Deploy to Lambda') {
            steps {
                echo "Deploying branch '${env.BRANCH_NAME}' to Lambda: ${LAMBDA_NAME}"
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
            echo "Deployment SUCCESS for branch: ${env.BRANCH_NAME}"
        }
        failure {
            echo "Deployment FAILED for branch: ${env.BRANCH_NAME}"
        }
        always {
            sh 'rm -f lambda.zip'
        }
    }
}
