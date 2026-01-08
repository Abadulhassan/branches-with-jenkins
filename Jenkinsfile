pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()   // extra safety
    }

    environment {
        AWS_REGION   = "us-west-2"
        LAMBDA_NAME  = "readuser"        // SINGLE lambda
        ZIP_NAME     = "lambda.zip"
    }

    stages {

        /* =========================
           CHECKOUT
           ========================= */
        stage('Checkout') {
            steps {
                echo "📥 Checking out branch: ${env.BRANCH_NAME}"
                checkout scm
            }
        }

        /* =========================
           BUILD
           ========================= */
        stage('Build') {
            steps {
                echo "🔧 Building branch: ${env.BRANCH_NAME}"
                sh 'node -v || echo "Node not required"'
            }
        }

        /* =========================
           PACKAGE
           ========================= */
        stage('Package') {
            steps {
                echo "📦 Packaging Lambda for ${env.BRANCH_NAME}"
                sh '''
                  rm -f lambda.zip
                  zip -r lambda.zip .
                '''
            }
        }

        /* =========================
           DEPLOY (MANUAL, ONE BRANCH)
           ========================= */
        stage('Deploy to Lambda') {
            steps {
                lock(resource: 'lambda-deploy-lock') {

                    echo "🚀 Deploying SELECTED branch: ${env.BRANCH_NAME}"
                    echo "🔒 Lock acquired (only one branch can deploy)"

                    sh """
                      aws lambda update-function-code \
                        --function-name ${LAMBDA_NAME} \
                        --region ${AWS_REGION} \
                        --zip-file fileb://${ZIP_NAME}
                    """

                    echo "✅ Deployment completed for ${env.BRANCH_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo "🎉 SUCCESS: ${env.BRANCH_NAME} deployed to Lambda"
        }
        failure {
            echo "❌ FAILED: ${env.BRANCH_NAME} deployment failed"
        }
        always {
            sh 'rm -f lambda.zip'
        }
    }
}
