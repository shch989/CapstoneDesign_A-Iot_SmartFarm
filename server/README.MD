# 캡스톤 팀 프로젝트 (서버 개발 담당: 조성현)

## 서버 개발 내용 정리

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

### NestJS Cli 설치 *NodeJS 14버전 이상
```
$ npm i -g @nestjs/cli
```

### NestJS 애플리케이션 생성
```
$ nest new <project_name>
```

```
$ npm install --save pigpio
```

### node-dht-sensor를 설치하여 라즈베리파이에 연결된 온습도 센서를 제어

```
$ npm install --save node-dht-sensor
```

NodeJS에서 제공하는 GPIO의 onoff를 사용하려고 하였으나 ASAIR AM2302(DHT22)의 경우 디지털 센서이기 때문에 node-dht-sensor를 사용해야한다.

### Socket.io를 이용한 실시간 양방향 통신 구현

```
$ npm i --save @nestjs/websockets @nestjs/platform-socket.io
```

실시간으로 사용자에게 데이터를 제공하는 방법은 여러가지가 있다. 대표적으로는 WebSocket, WebRPC, MQTT 등이 있다. 하지만 이번 캡스톤 작품에서는 가볍고 빠른 WebSocket을 사용하기로 하였다.

### Axios를 사용하여 NestJS에서 다른 HTTP 요청 처리
```
$ npm install --save @nestjs/axios axios
```

### Config를 사용하여 개인 정보 보호
```
$ npm i --save @nestjs/config
$ npm install dotenv
```

### Bcrypt를 사용하여 사용자 개인 정보 보호
```
$ npm i bcrypt
$ npm i -D @types/bcrypt
```

### Class Validator를 사용하여 데이터 필터링
```
$ npm i --save class-validator class-transformer
```

### Google Maps Platform (Geocoding API) 사용하여 주소지의 위도와 경도 추출
### <a href="https://console.cloud.google.com/welcome?project=smartfarm-386612">프로젝트 대쉬보드 이동</a>

### WeatherStack 사용하여 위도와 경도에 대한 날씨 정보 추출
### <a href="https://weatherstack.com/">API 공식문서 이동</a>