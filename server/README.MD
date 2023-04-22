# 캡스톤 팀 프로젝트 (서버 개발 담당: 조성현)

## 서버개발 내용 정리

### 라즈베리 파이에서 NodeJS 설치

```
$ sudo apt-get update
```

```
$ sudo apt-get install nodejs
$ node -v
```

```
$ sudo apt-get install npm
$ npm -v
```

### node-dht-sensor를 라즈베리파이에서 설치하여 ASAIR AM2302(DHT22)를 제어

```
$ npm install --save node-dht-sensor
```

NodeJS에서 제공하는 GPIO의 onoff를 사용하려고 하였으나 ASAIR AM2302(DHT22)의 경우 디지털 센서이기 때문에 node-dht-sensor를 사용해야한다.

### Socket.io를 이용한 실시간 양방향 통신 구현

```
$ npm install --save socket.io
```

실시간으로 사용자에게 데이터를 제공하는 방법은 여러가지가 있다. 대표적으로는 WebSocket, WebRPC, MQTT 등이 있다. 하지만 이번 캡스톤 작품에서는 가볍고 빠른 WebSocket을 사용하기로 하였다.
