### cf : https://guillim.github.io/docker/2018/11/18/docker-hands-on-intro.html 
### cf : https://jonathanmh.com/deploying-a-nuxt-js-app-with-docker/
### cf : https://dev.to/vuevixens/dockerise-your-nuxt-ssr-app-like-a-boss-a-true-vue-vixens-story-4mm6

export APP=apiviz-nuxt

#other variable definition
# DC    := docker-compose
# DF    := Dockerfile.

export DC=docker-compose
export DF=Dockerfile.

export APP_PATH := $(shell pwd)


### ============ ###
### network
### ============ ###

network:
	@docker network create ${APP} 2> /dev/null; true
network-stop:
	docker network rm ${APP}


### ============ ###
### frontend
### ============ ###

frontend: 
	${DC} -f ${DC}-frontend.yml up --build -d
frontend-stop:
	${DC} -f ${DC}-frontend.yml down

nuxt: 
	${DC} -f ${DC}-nuxt.yml up --build -d
nuxt-stop:
	${DC} -f ${DC}-nuxt.yml down

### ============================= ###
### main make / docker commands
### ============================= ###

# --------------------
# default
up: network frontend
down: frontend-stop network-stop
restart: down up


up-nuxt: network nuxt
down-nuxt: nuxt-stop network-stop
restart-nuxt: down up