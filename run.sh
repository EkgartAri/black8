# HACK: waiting for db to start listening
sleep 5

# running startup stuff and the server itself
python manage.py migrate
python manage.py createsuperuser --noinput
python manage.py runserver 0.0.0.0:8000 --noreload
