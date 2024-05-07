startapp:
	docker compose up -d --build --force-recreate

stopapp:
	docker compose down
