#!/bin/bash

POSTGRES = postgres-database
OS := $(shell uname)


help: ## Muestra el mensaje de Ayuda
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

# Start the containers / TODO: Revisar nombre  de la red a crear en docker-compose.yml
run: ## Inicia todos los contenedores
	docker network create docker-network-devel || true
	docker-compose up -d

stop: ## Para todos los contenedores
	docker-compose stop


down: ## Realiza el down de todos los contenedores
	docker-compose down
	docker network prune -f

restart: ## Reinicia todos los contenedores
	$(MAKE) stop && $(MAKE) run


build: ## Realiza un rebuild de los contenedores
	docker network create docker-network-devel || true
	docker-compose up --build


ssh-postgres: ## POSTGRES - SSH PostgresSQL
	docker exec -it ${POSTGRES} bash
