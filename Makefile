
SERVICES = backend cti-assessment frontend

start:
	@for d in $(SERVICES); do \
		echo "Running $$d..."; \
		docker compose -f $$d/docker-compose.yml up -d; \
	done

stop:
	@for d in $(SERVICES); do \
		echo "Stoping $$d..."; \
		docker compose -f $$d/docker-compose.yml down; \
	done

clean:
	@for d in $(SERVICES); do \
		echo "Cleaning $$d..."; \
		docker compose -f $$d/docker-compose.yml down --volumes --remove-orphans; \
	done

.PHONY: start stop clean
