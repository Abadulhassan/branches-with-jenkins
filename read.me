pipeline {
    agent any

    environment {
        AWS_REGION  = "us-west-2"
        LAMBDA_NAME = "readuser"
    }

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Package Lambda') {
            steps {
                sh '''
                rm -f lambda.zip
                zip -r lambda.zip .
                '''
            }
        }

        stage('Deploy to Lambda') {
            when {
                branch 'main'
            }
            steps {
                echo "Deploying Lambda: readuser"
                sh '''
                aws lambda update-function-code \
                  --function-name $LAMBDA_NAME \
                  --region $AWS_REGION \
                  --zip-file fileb://lambda.zip
                '''
            }
        }
    }

    post {
        success {
            echo "✅ readuser Lambda deployed successfully"
        }
        failure {
            echo "❌ Deployment failed"
        }
        cleanup {
            sh 'rm -f lambda.zip'
        }
    }
}
