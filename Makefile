startapp:
	docker compose up -d --build --force-recreate

stopapp:
	docker compose down

runfront:
	cd frontend && npm run start || cd -
