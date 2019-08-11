FROM python:3-alpine

RUN apk add build-base

WORKDIR /usr/local/app

COPY requirements.txt main.py ./

RUN pip install -r requirements.txt

CMD ["python3", "main.py"]
