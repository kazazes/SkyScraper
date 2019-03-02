FROM balenalib/intel-nuc-ubuntu-python:latest

ENV INITSYSTEM on

COPY . /app
WORKDIR /app

RUN pip install pipenv

RUN pipenv install --system --deploy

CMD ["python", "watchdog.py"]
