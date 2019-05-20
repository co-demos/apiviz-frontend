### cf : https://guillim.github.io/docker/2018/11/18/docker-hands-on-intro.html 
### cf : https://jonathanmh.com/deploying-a-nuxt-js-app-with-docker/
### cf : https://dev.to/vuevixens/dockerise-your-nuxt-ssr-app-like-a-boss-a-true-vue-vixens-story-4mm6
### cf : https://github.com/sass/node-sass/issues/2165
### cf : https://stackoverflow.com/questions/54492385/nuxt-js-in-docker-missing-dependencies

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

nuxt: 
	${DC} -f ${DC}-nuxt.yml up --build -d
nuxt-stop:
	${DC} -f ${DC}-nuxt.yml down

### ============================= ###
### main make / docker commands
### ============================= ###

# nuxt building
up: network nuxt
down: nuxt-stop network-stop
restart: down up