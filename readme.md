# **[gRPC_fullstackServiceNetworking_sample](https://github.com/kimdaeseon/gRPC_fullstackServiceNetworking_sample)**



## 0. 들어가기 전에

해당 코드들은 경희대학교 소프트웨어 융합학과 이성원 교수님의 python 예제 코드를 nodejs를 사용하여 구현한 코드들입니다.

## 1. 시작하기

gRPC를 node.js로 사용하는 방법은 교수님의 예제처럼 _pb, _grpc_pb 파일을 생성해서 정적으로 사용하는 방법과

grpc/proto-loader 모듈을 통한 동적으로 사용하는 방법이 존재합니다.



모든 코드는 grpc.proto-loader를 사용하는 동적인 방법으로 구현하였으며

예제 1번의 경우 정적으로 구현한 코드가 존재합니다.



grpc-dynamic 디렉토리에는 동적인 방식으로 구현된 코드가 존재합니다. 

grpc-static 디렉토리에는 정적인 방식으로 구현된 코드가 존재합니다.



해당 디렉토리로 이동하신 후 아래 명령어를 실행합니다.

```javascript
npm install
```

필요한 모듈을 설치한 후 아래 명령어를 통해서 코드를 실행시켜 볼 수 있습니다.

```javascript
node '예제 파일 명'
```

## 2. 예제 개요

1 : 기본적인 grpc 통신

2 : bidirectional streaming

3 : client streaming

4: server streaming

## 3. 코드 위치

모든 예제는 grpc-dynamic 디렉토리에 동적인 방법으로 작성되어있습니다.

단 예제 1번의 경우 grpc-static 디렉토리에 정적인 방법으로 작성되어 있습니다.

