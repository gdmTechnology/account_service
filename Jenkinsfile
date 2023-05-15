pipeline {
	agent any
	stages {
		stage("verify tooling") {
			steps {
				sh '''
					docker version
					docker info
				'''
			}
		}
		stage("install node_modules") {
			steps {
				script {
				sh 'npm i'
				}
			}
		}
		stage('Tests') {
			steps {
				script {
				sh 'npm run test'
				}
			}
			post {
				always {
				step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/jest/cobertura-coverage.xml', lineCoverageTargets: '100, 95, 50'])
				}
			}
		}
		stage("Removing old images") {
			steps {
				script {
					def imageExists = sh(script: "docker images -q account-service", returnStdout: true) == 0

					if(imageExists){
						sh 'docker rmi account-service'
					}
				}
			}
		}
		stage("build") {
			steps {
				sh 'docker build -t account-service .'
			}
		}

		stage("Killing unused containers") {
			steps {
				sh 'sudo docker system prune --all'
			}
		}
		stage("run") {
			steps {
				sh '''
                    docker run -d \
                    -e HOST=account_service \
                    -e JWT_SECRET=1kZDnw8==jh \
					-e KAFKA_CLIENTID=rem-kafka \
					-e KAFKA_BROKER_PORT=9092 \
        			-e KAFKA_BROKER_HOST=broker \
					-e ADMIN_EMAIL=gui.acassemiro@gmail.com \
					-e PORT=3001 \
					-e MONGO_HOST=mongo \
					-e MONGO_PORT=27017 \
					-e MONGO_DB_NAME=rem \
					-e MONGO_PASS=rem2023 \
					-e MONGO_USER=rem \
					-p 3001:3001 \
					--hostname account_service \
                    --network rem_network \
					--restart always \
					--name account_service account-service
				'''
			}
		}
	}
}