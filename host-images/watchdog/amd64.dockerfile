FROM python:3

ENV INITSYSTEM on

COPY . /app
WORKDIR /app

RUN pip install pipenv

RUN pipenv install --system --deploy

CMD ["python", "watchdog.py"]
