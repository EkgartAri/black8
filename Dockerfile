FROM python:3.10-slim as base

# Building stage
FROM base AS builder

ENV PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_NO_INTERACTION=1 \
  POETRY_VIRTUALENVS_CREATE=false \
  PATH="$PATH:/runtime/bin" \
  PYTHONPATH="$PYTHONPATH:/runtime/lib/python3.11/site-packages" \
  POETRY_VERSION=1.4.2

RUN apt update && apt install -y build-essential unzip
RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /src
COPY backend/pyproject.toml /src/
RUN poetry export --without-hashes --no-interaction --no-ansi -f requirements.txt -o requirements.txt
RUN pip install --prefix=/runtime --force-reinstall -r requirements.txt

# Runtime stage
FROM base AS runtime
COPY --from=builder /runtime /usr/local
RUN apt update

WORKDIR /app
COPY ./backend ./
COPY ./run.sh ./
RUN chmod +x run.sh

CMD ["sh", "./run.sh"]
