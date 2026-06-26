.PHONY: install run test smoke clean docker-local

install:
	./scripts/bootstrap_local.sh

run:
	./scripts/run_local.sh

test:
	./scripts/test_local.sh

smoke:
	./scripts/smoke_check.sh

clean:
	./scripts/clean_generated.sh

docker-local:
	docker compose -f infra/docker-compose.local.yml up --build
