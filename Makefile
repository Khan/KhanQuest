.PHONY: all create_build_dir build perseus_dev_tools build_ke build_perseus npm_install server clean

all: install build

install: npm_install build_ke build_perseus

npm_install:
	npm install

build: create_build_dir

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

PORT=6060
server:
	./node_modules/.bin/http-server . -p $(PORT)
