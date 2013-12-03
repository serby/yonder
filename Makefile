test:
	@./node_modules/.bin/mocha \
		-r should \
		-R Spec

lint-changed:
	@./node_modules/.bin/jshint `git status --porcelain | sed -e "s/^...//g"`

lint:
	@./node_modules/.bin/jshint lib test

.PHONY: test lint lint-changed