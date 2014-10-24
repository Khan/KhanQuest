.PHONY: help build server install
.PHONY: help build server install create_build_dir perseus_dev_tools build_ke build_perseus npm_install clean

PORT=9000

help:
	@echo "make server PORT=9000 # runs the KAQuest server"
	@echo "make build # compiles into build"

install: npm_install build_ke build_perseus

npm_install:
	npm install
	rm -rf node_modules/perseus
	git clone https://github.com/Khan/perseus.git node_modules/perseus
	cd node_modules/perseus && git submodule update --init
	mkdir -p ./node_modules/react
	echo "module.exports = window.React;" > ./node_modules/react/index.js
	mkdir -p ./node_modules/underscore
	echo "module.exports = window._;" > ./node_modules/underscore/index.js
	mkdir -p ./node_modules/perseus
	echo "module.exports = window.Perseus;" > ./node_modules/perseus/index.js

build: install create_build_dir
	./node_modules/.bin/webpack

server:
	(sleep 1; echo; echo http://localhost:$(PORT)/game.html) &
	./node_modules/.bin/webpack-dev-server --port $(PORT) --output-public-path live-build/ --devtool source-map src/index.jsx

create_build_dir:
	mkdir -p build

perseus_dev_tools:
	cd node_modules/perseus && npm install

build_perseus: create_build_dir node_modules/perseus
	cd node_modules/perseus && make build
	cp node_modules/perseus/build/perseus-2.js build/perseus.js
	cp node_modules/perseus/build/perseus-2.css build/perseus.css
	rm -rf build/perseus/
	cp -R node_modules/perseus/lib build/perseus/

build_ke: create_build_dir perseus_dev_tools node_modules/perseus
	./node_modules/.bin/webpack --config=ke.webpack.config.js
	rm -rf build/ke
	cp -R node_modules/khan-exercises/local-only build/ke
	cp node_modules/khan-exercises/exercises-stub.js build/ke/
	cp node_modules/khan-exercises/css/khan-site.css build/ke/
	cp node_modules/khan-exercises/css/khan-exercise.css build/ke/

clean:
	rm -rf build
