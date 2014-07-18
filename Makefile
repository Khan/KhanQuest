.PHONY: help build server install

PORT=9000

help:
	@echo "make server PORT=9000 # runs the KAQuest server"
	@echo "make build # compiles into build"

install:
	@npm install

build: install
	mkdir -p build
	./node_modules/.bin/webpack

server: install
	(sleep 1; echo; echo http://localhost:$(PORT)/test.html) &
	./node_modules/.bin/webpack-dev-server --port $(PORT) --output-public-path live-build/ --devtool eval --quiet src/index.jsx
