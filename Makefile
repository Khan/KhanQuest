.PHONY: help build server install
.PHONY: help build server install create_build_dir perseus_dev_tools build_ke build_perseus npm_install clean

PORT=9000

help:
	@echo "make server PORT=9000 # runs the KAQuest server"
	@echo "make build # compiles into build"

install: npm_install build_ke build_perseus

npm_install:
	npm install

build: install create_build_dir
	./node_modules/.bin/webpack

server:
	(sleep 1; echo; echo http://localhost:$(PORT)/game.html) &
	./node_modules/.bin/webpack-dev-server --port $(PORT) --output-public-path live-build/ --devtool eval src/index.jsx

create_build_dir:
	mkdir -p build

perseus_dev_tools:
	cd node_modules/perseus && npm install

build_perseus: create_build_dir node_modules/perseus
	cd node_modules/perseus && make build
	cp node_modules/perseus/build/perseus-1.js build/perseus.js
	cp node_modules/perseus/build/perseus-1.css build/perseus.css
	rm -rf build/perseus/
	cp -R node_modules/perseus/lib build/perseus/

build_ke: create_build_dir perseus_dev_tools node_modules/perseus
	cd node_modules/khan-exercises && ../perseus/node_modules/.bin/r.js -o requirejs.config.js out=../../build/ke.js
	rm -rf build/ke
	cp -R node_modules/khan-exercises/local-only build/ke
	cp node_modules/khan-exercises/exercises-stub.js build/ke/
	cp node_modules/khan-exercises/css/khan-site.css build/ke/
	cp node_modules/khan-exercises/css/khan-exercise.css build/ke/

clean:
	rm -rf build


