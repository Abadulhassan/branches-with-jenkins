pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        AWS_REGION  = "us-west-2"
        ZIP_NAME    = "lambda.zip"
        BASE_LAMBDA = "readuser"
    }

    stages {

        /* =========================
           CHECKOUT
           ========================= */
        stage('Checkout') {
            steps {
                echo "Checking out branch: ${BRANCH_NAME}"
                checkout scm
            }
        }

        /* =========================
           BUILD
           ========================= */
        stage('Build') {
            steps {
                echo "Building code for ${BRANCH_NAME}"
                sh '''
                  node -v || echo "Node not required"
                '''
            }
        }

        /* =========================
           PACKAGE
           ========================= */
        stage('Package Lambda') {
            steps {
                echo "Packaging Lambda for ${BRANCH_NAME}"
                sh '''
                  rm -f lambda.zip
                  zip -r lambda.zip .
                '''
            }
        }

        /* =========================
           DEPLOY (ALL BRANCHES)
           ========================= */
        stage('Deploy to Lambda') {
            steps {
                script {
                    def lambdaName = "${BASE_LAMBDA}"

                    echo "Deploying to Lambda: ${lambdaName}"

                    sh """
                      aws lambda update-function-code \
                        --function-name ${lambdaName} \
                        --region ${AWS_REGION} \
                        --zip-file fileb://${ZIP_NAME}
                    """
                }
            }
        }
    }

    /* =========================
       POST
       ========================= */
    post {
        success {
            echo "Deployment SUCCESS for branch: ${BRANCH_NAME}"
        }
        failure {
            echo "Deployment FAILED for branch: ${BRANCH_NAME}"
        }
        always {
            sh 'rm -f lambda.zip'
        }
    }
}
