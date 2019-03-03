FROM balenalib/odroid-xu4-ubuntu-python:latest
RUN ["cross-build-start"]

ENV INITSYSTEM on

COPY . /app
WORKDIR /app

RUN pip install pipenv

RUN pipenv install --system --deploy

CMD ["python", "watchdog.py"]
RUN ["cross-build-end"]
