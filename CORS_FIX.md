# CORS 에러 해결 가이드

## 문제 증상

```
교차 출처 요청 차단: 동일 출처 정책으로 인해 http://222.239.249.119:3000/api/categories에 있는 원격 리소스를 차단했습니다.
(원인: CORS 요청이 성공하지 못함). 상태 코드: (null).
```

## 원인

웹 브라우저는 보안상의 이유로 다른 도메인의 리소스에 대한 접근을 제한합니다 (Same-Origin Policy).
앱이 `http://localhost:19006`에서 실행되고 서버가 `http://222.239.249.119:3000`에 있으므로, CORS 정책을 활성화해야 합니다.

## 해결 방법 (서버 측 설정 필수!)

### 1. Node.js + Express 서버인 경우

#### 설치
```bash
cd server
npm install cors
```

#### 서버 코드 수정

**Option 1: 모든 도메인 허용 (개발용)**

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS를 가장 먼저 설정! (다른 미들웨어보다 먼저)
app.use(cors());

// 그 다음 다른 미들웨어들
app.use(express.json());

// 라우터 등록
app.use('/api', router);

app.listen(3000);
```

**Option 2: 특정 도메인만 허용 (프로덕션 권장)**

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// ✅ 특정 도메인만 허용
app.use(cors({
  origin: [
    'http://localhost:19006',      // Expo web 개발 서버
    'http://localhost:8081',        // React Native 개발 서버
    'http://192.168.0.100:19006',   // 로컬 네트워크 IP
    'http://222.239.249.119',       // 실제 서버 도메인
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use('/api', router);

app.listen(3000);
```

### 2. 직접 헤더 설정하는 방법

CORS 패키지를 사용하지 않고 직접 설정하려면:

```javascript
const express = require('express');
const app = express();

// ✅ CORS 헤더 수동 설정
app.use((req, res, next) => {
  // 모든 도메인 허용
  res.header('Access-Control-Allow-Origin', '*');

  // 또는 특정 도메인만 허용
  // res.header('Access-Control-Allow-Origin', 'http://localhost:19006');

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // OPTIONS preflight 요청 처리
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use('/api', router);

app.listen(3000);
```

## 설정 확인 방법

### 1. 브라우저 콘솔에서 확인

```javascript
// 브라우저 개발자 도구 콘솔에서 실행
fetch('http://222.239.249.119:3000/api/categories')
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
```

성공하면 데이터가 표시되고, CORS 에러가 사라집니다.

### 2. curl로 확인

```bash
# OPTIONS preflight 요청 확인
curl -X OPTIONS http://222.239.249.119:3000/api/categories \
  -H "Origin: http://localhost:19006" \
  -H "Access-Control-Request-Method: GET" \
  -v

# 실제 GET 요청 확인
curl -X GET http://222.239.249.119:3000/api/categories \
  -H "Origin: http://localhost:19006" \
  -v
```

**정상적인 응답에는 다음 헤더들이 포함되어야 합니다:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### 3. Postman이나 Insomnia로 확인

Postman이나 Insomnia는 CORS 제한이 없으므로, 서버 API 자체가 잘 동작하는지만 확인할 수 있습니다.

## 완전한 서버 예시

```javascript
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

// ===== 1. CORS 설정 (가장 먼저!) =====
app.use(cors({
  origin: [
    'http://localhost:19006',
    'http://localhost:8081',
    'http://222.239.249.119',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ===== 2. Body parser =====
app.use(express.json());

// ===== 3. MySQL 연결 =====
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'treeheal_db',
  waitForConnections: true,
  connectionLimit: 10,
});

// ===== 4. 라우터 =====
const router = express.Router();

// 상담 구분 목록 조회
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await pool.query(
      `SELECT category_id, category_name, category_icon, display_order, is_active
       FROM consultation_categories
       WHERE is_active = TRUE
       ORDER BY display_order ASC`
    );

    return res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// ... 다른 라우터들

// ===== 5. 라우터 등록 =====
app.use('/api', router);

// ===== 6. 서버 시작 =====
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  console.log(`✅ CORS enabled for multiple origins`);
});
```

## 주의사항

### ⚠️ CORS 설정 순서가 중요합니다!

```javascript
// ✅ 올바른 순서
app.use(cors());              // 1. CORS 먼저
app.use(express.json());      // 2. Body parser
app.use('/api', router);      // 3. 라우터

// ❌ 잘못된 순서 (CORS 에러 발생)
app.use('/api', router);      // 라우터를 먼저 등록하면
app.use(cors());              // CORS가 적용되지 않음!
```

### ⚠️ 서버 재시작 필요

CORS 설정을 변경한 후에는 **반드시 서버를 재시작**해야 합니다:

```bash
# 서버 중지 (Ctrl+C)
# 서버 재시작
node server.js
# 또는
npm start
```

### ⚠️ 프로덕션 환경에서는 특정 도메인만 허용

```javascript
// ❌ 프로덕션에서 모든 도메인 허용하지 마세요!
app.use(cors()); // 보안상 위험

// ✅ 프로덕션에서는 특정 도메인만 허용
app.use(cors({
  origin: ['https://your-domain.com'],
  credentials: true
}));
```

## 여전히 CORS 에러가 발생하는 경우

### 1. 서버 로그 확인

서버 콘솔에서 다음을 확인하세요:
- 요청이 서버에 도달했는지
- 어떤 응답을 보냈는지

```javascript
router.get('/categories', async (req, res) => {
  console.log('📥 Request received:', req.method, req.url);
  console.log('📤 Origin:', req.headers.origin);

  // ... 나머지 코드
});
```

### 2. 브라우저 네트워크 탭 확인

1. 브라우저 개발자 도구 열기 (F12)
2. **Network** 탭 선택
3. 페이지 새로고침
4. `/categories` 요청 찾기
5. **Response Headers** 확인

다음 헤더들이 있어야 합니다:
```
access-control-allow-origin: *
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
```

### 3. Preflight 요청 확인

브라우저는 먼저 OPTIONS 요청을 보내서 CORS 가능 여부를 확인합니다:

```javascript
// OPTIONS 요청 로깅
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    console.log('🔍 Preflight request:', req.url);
  }
  next();
});
```

## 백엔드 개발자에게 전달할 체크리스트

- [ ] `cors` 패키지 설치 완료 (`npm install cors`)
- [ ] `app.use(cors())` 코드 추가 완료
- [ ] CORS 설정을 **다른 미들웨어보다 먼저** 추가했는지 확인
- [ ] 서버 재시작 완료
- [ ] 브라우저 콘솔에서 CORS 에러 사라졌는지 확인
- [ ] OPTIONS preflight 요청이 200으로 응답하는지 확인

## 빠른 테스트 서버

테스트용으로 간단한 CORS 서버를 만들어보세요:

```javascript
// test-cors.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // 모든 도메인 허용
app.use(express.json());

app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    data: [
      { category_id: 1, category_name: '보험보상상담', is_active: true },
      { category_id: 2, category_name: '보험무료상담', is_active: true }
    ]
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('✅ Test CORS server running on http://0.0.0.0:3000');
});
```

실행:
```bash
node test-cors.js
```

브라우저에서 테스트:
```
http://222.239.249.119:3000/api/categories
```

## 추가 리소스

- [MDN - CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- [Express cors 미들웨어](https://expressjs.com/en/resources/middleware/cors.html)
- [Node.js CORS 가이드](https://www.npmjs.com/package/cors)
