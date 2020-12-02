# ベースイメージの取得
FROM ubuntu:20.04

# メタデータの登録
LABEL maintainer="大熊諒"
LABEL version="1.0"
LABEL description="ToDoManagement api"

# 必要パッケージのインストール
RUN apt -y update && apt -y upgrade
RUN apt install -y tzdata
RUN apt install -y python3
RUN apt install -y python3-pip
RUN pip3 install responder

# ローカルファイルをコンテナにコピー
COPY ./initdb.py /src/
COPY ./run.py /src/

# 本番環境用のサイト構築（この部分が開発環境とは異なる！）

# ポート開放
EXPOSE 5042

CMD ["python3", "/src/run.py"]