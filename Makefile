
.PHONY: dev
dev:
	npm run dev

.PHONY: build
build:
	npm run build

.PHONY: check
check:
	npm run check

.PHONY: agentsmd
agentsmd:
	curl -fsSL https://raw.githubusercontent.com/dani-polani/agents-init/main/install.sh | sh
