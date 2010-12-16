# Makefile

test:
	clear
	node-jscoverage lib lib-cov
	expresso -I lib-cov test/*
	rm -Rf lib-cov

.PHONY: test


# eof
