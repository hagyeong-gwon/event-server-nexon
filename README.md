## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 실행 방법

```bash
$ docker compose -f ./docker/docker-compose.yml up --build -d
```
gateway-server swagger : http://localhost:30000/docs

- 환경 설정
  - 환경 변수 파일 : apps/event-server or gateway-server or user-server/.env
  - MONGO_DB : 몽고 DB url (mongodb://id:pw@url/db 형태)

- 테스트 시나리오
  - 일반 사용자 (role : USER)
    - /signUp - 회원가입
    - POST /api/claim - 보상 요청
    - GET /api/claim - 본인 보상 요청 이력 확인
  - 관리자 (role : OPERATOR, ADMIN)
    - /signUp - 회원가입
    - 이벤트 생성
    - 이벤트 조건 생성
    - 보상 생성
    - 보상 상태 변경

### 데이터 구조 간략 설명
- User : 사용자 정보 (id, email, role...)
- Event : 이벤트 정보 (title, description, startDate, endDate...)
- EventCondition : 이벤트 조건 정보 (eventId, conditionType, value...)
- Reward : 보상 정보 (eventId, rewardType, qty...) 조건 테이블과 1:N 관계
- Claim : 보상 청구 정보 (userId, eventId, rewardIds, status...)

### 설계 설명
- servers
  - gateway-server : 인증 / 권한 검사 + proxy 역할
  - event-server : 이벤트 서버
  - user-server : 사용자 서버
- directory (port-adapter 구조 - hexagonal architecture)
  - src
    - base : 공통 설정
    - inbound : 외부에서 접근해오는 controller
    - outbound : 외부로 나가는 repository
    - middlewares : 공통 미들웨어
    - models : 비즈니스 로직
    - shared : 공통 모듈 / 유틸리티
- 권한 관련 설명
  - USER : /api route 사용가능
  - AUDITOR : GET /claim 사용가능
  - OPERATOR : /event, /reward 사용가능
  - ADMIN : 전부 사용가능

## 구현 중 겪은 고민
- Auth 서버 단일 구성으로 인증을 처리했고 권한은 각 서버에서 처리했다보니 gateway에서 인증, 권한 처리 시 어떻게 해야하는지에 대해 시간이 걸렸음
- swagger 또한 gateway에서 한번에 제공해주기 위해 설정을 하는데에 시간이 걸림
- 여러 타입의 이벤트 조건을 검사하는 공통 코드를 작업할 때 어떤 디자인 패턴을 써야하는지 고민 (전략 패턴 사용)

## TODO...
- [ ] JWT 만료 시 grpc 통신과 refresh token 으로 재발급
- [ ] Redis에 JWT(refresh token) 저장
- [ ] 인증 서버 고도화 (로그아웃 등)
- [ ] 토큰 재발급 시 gateway에서 grpc 통신으로 유저 DB 조회 후 실사용자 인지 확인하는 기능 구현
- [ ] 공통 모듈 / 유틸리티 분리
- [ ] 각 디렉토리 간 의존성 관계 정리 (port-adapter 구조가 지켜지고 있는지 검증)
- [ ] 이벤트 관련 작업 시 validation 추가
- [ ] 동적 access control 기능 구현 (Redis 사용)
- [ ] 테스트 코드 작성
- [ ] 어드민 / 유저 서버 분리
- [ ] 자동 및 수동 보상 지급 기능 구현 (eventEmitter)