# TreeHeal APP - API 엔드포인트 문서

## 기기 등록 API

### 1. 기기 등록 (POST)

**엔드포인트**: `POST /api/devices/register`

**설명**: 앱 최초 실행 시 SSAID를 서버에 등록합니다. 이미 등록된 SSAID인 경우 기존 정보를 반환합니다.

**요청 헤더**:
```
Content-Type: application/json
```

**요청 바디**:
```json
{
  "ssaid": "a1b2c3d4e5f6g7h8",
  "device_name": "Samsung Galaxy S21",
  "device_type": "android 13"
}
```

**필드 설명**:
- `ssaid` (string, 필수):
  - Android: SSAID (Settings.Secure.ANDROID_ID)
  - iOS: identifierForVendor
  - **Web: 브라우저 핑거프린트** (형식: `web_[hash]`, 예: `web_a1b2c3d4`)
- `device_name` (string, 선택): 기기명
- `device_type` (string, 선택): 기기 타입 (예: "android 13", "ios 16.0", "web")

**성공 응답** (201 Created - 신규 등록):
```json
{
  "success": true,
  "device_id": 1,
  "message": "기기가 성공적으로 등록되었습니다",
  "data": {
    "device_id": 1,
    "device_name": "Samsung Galaxy S21",
    "ssaid": "a1b2c3d4e5f6g7h8",
    "device_type": "android 13",
    "status": "active",
    "registered_at": "2025-10-31T06:30:00Z"
  }
}
```

**성공 응답** (200 OK - 이미 등록됨):
```json
{
  "success": true,
  "device_id": 1,
  "message": "이미 등록된 기기입니다",
  "data": {
    "device_id": 1,
    "device_name": "Samsung Galaxy S21",
    "ssaid": "a1b2c3d4e5f6g7h8",
    "device_type": "android 13",
    "status": "active",
    "registered_at": "2025-10-30T12:00:00Z",
    "updated_at": "2025-10-31T06:30:00Z"
  }
}
```

**에러 응답** (400 Bad Request):
```json
{
  "success": false,
  "message": "SSAID는 필수 항목입니다"
}
```

**에러 응답** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "서버 오류가 발생했습니다"
}
```

---

### 2. 기기 정보 조회 (GET)

**엔드포인트**: `GET /api/devices/:ssaid`

**설명**: SSAID로 기기 정보를 조회합니다.

**경로 파라미터**:
- `ssaid` (string, 필수): 조회할 기기의 SSAID

**성공 응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "device_id": 1,
    "device_name": "Samsung Galaxy S21",
    "ssaid": "a1b2c3d4e5f6g7h8",
    "device_type": "android 13",
    "last_access_expert": "홍길동",
    "status": "active",
    "registered_at": "2025-10-30T12:00:00Z",
    "updated_at": "2025-10-31T06:30:00Z"
  }
}
```

**에러 응답** (404 Not Found):
```json
{
  "success": false,
  "message": "기기를 찾을 수 없습니다"
}
```

---

## 전문가 관리 API

### 3. 전문가 목록 조회 (GET)

**엔드포인트**: `GET /api/experts?ssaid={ssaid}`

**설명**: 활성화된 전문가 목록을 조회합니다. ssaid가 제공되면 해당 기기에 매핑된 전문가만 반환합니다.

**쿼리 파라미터**:
- `ssaid` (string, 선택): 기기 SSAID. 제공 시 해당 기기에 매핑된 전문가만 반환

**예시**:
- 모든 전문가: `GET /api/experts`
- 특정 기기 전문가: `GET /api/experts?ssaid=a1b2c3d4e5f6g7h8`

**성공 응답** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "expert_id": 1,
      "expert_name": "홍길동",
      "contact_number": "010-1234-5678",
      "specialization": "손해보험, 생명보험",
      "qualifications": "손해보험, 생명보험, 연금보험",
      "profile_image": "https://example.com/profiles/expert1.jpg",
      "display_order": 1,
      "is_fixed": true,
      "status": "active"
    },
    {
      "expert_id": 2,
      "expert_name": "김철수",
      "contact_number": "010-2345-6789",
      "specialization": "진단비, 실손보험",
      "qualifications": "생명보험, 손해보험",
      "profile_image": "https://example.com/profiles/expert2.jpg",
      "display_order": 2,
      "is_fixed": false,
      "status": "active"
    }
  ]
}
```

**에러 응답** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "서버 오류가 발생했습니다"
}
```

---

### 4. 기기별 전문가 목록 조회 (GET)

**엔드포인트**: `GET /api/experts/device/:deviceId`

**설명**: 특정 기기에 매핑된 전문가 목록을 조회합니다.

**경로 파라미터**:
- `deviceId` (number, 필수): 기기 ID

**성공 응답** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "expert_id": 1,
      "expert_name": "홍길동",
      "contact_number": "010-1234-5678",
      "specialization": "손해보험, 생명보험",
      "qualifications": "손해보험, 생명보험, 연금보험",
      "profile_image": "https://example.com/profiles/expert1.jpg",
      "display_order": 1,
      "is_fixed": true,
      "status": "active"
    }
  ]
}
```

---

### 5. 전문가 상세 조회 (GET)

**엔드포인트**: `GET /api/experts/:expertId`

**설명**: 특정 전문가의 상세 정보를 조회합니다.

**경로 파라미터**:
- `expertId` (number, 필수): 전문가 ID

**성공 응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "expert_id": 1,
    "expert_name": "홍길동",
    "contact_number": "010-1234-5678",
    "specialization": "손해보험, 생명보험, 진단비, 실손",
    "qualifications": "손해보험, 생명보험, 연금보험",
    "profile_image": "https://example.com/profiles/expert1.jpg",
    "display_order": 1,
    "is_fixed": true,
    "status": "active",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-10-31T06:30:00Z"
  }
}
```

**에러 응답** (404 Not Found):
```json
{
  "success": false,
  "message": "전문가를 찾을 수 없습니다"
}
```

---

## 상담 구분 API

### 6. 상담 구분 목록 조회 (GET)

**엔드포인트**: `GET /api/categories`

**설명**: 활성화된 상담 구분 목록을 조회합니다.

**성공 응답** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "category_id": 1,
      "category_name": "보험보상상담",
      "category_icon": null,
      "display_order": 1,
      "is_active": true
    },
    {
      "category_id": 2,
      "category_name": "보험무료상담",
      "category_icon": null,
      "display_order": 2,
      "is_active": true
    }
  ]
}
```

**에러 응답** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "서버 오류가 발생했습니다"
}
```

---

## 세부 항목 API

### 7. 세부 항목 목록 조회 (GET)

**엔드포인트**: `GET /api/detail-items`

**설명**: 활성화된 세부 항목(상담 받고 싶은 분야) 목록을 조회합니다.

**성공 응답** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "item_id": 1,
      "item_name": "실손",
      "item_icon": null,
      "display_order": 1,
      "is_active": true
    },
    {
      "item_id": 2,
      "item_name": "수술",
      "item_icon": null,
      "display_order": 2,
      "is_active": true
    },
    {
      "item_id": 3,
      "item_name": "진단",
      "item_icon": null,
      "display_order": 3,
      "is_active": true
    },
    {
      "item_id": 4,
      "item_name": "기타",
      "item_icon": null,
      "display_order": 4,
      "is_active": true
    }
  ]
}
```

**에러 응답** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "서버 오류가 발생했습니다"
}
```

---

## 약관 동의 API

### 8. 약관 목록 조회 (GET)

**엔드포인트**: `GET /api/consent-items`

**설명**: 활성화된 약관(개인정보 동의) 항목 목록을 조회합니다.

**성공 응답** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "consent_item_id": 1,
      "item_title": "개인정보 수집 및 이용 동의",
      "item_content": "TreeHeal은 보험 상담 서비스 제공을 위해 다음과 같이 개인정보를 수집 및 이용합니다.\n\n1. 수집 항목: 이름, 생년월일, 성별, 연락처\n2. 수집 목적: 보험 상담 서비스 제공 및 상담사 배정\n3. 보유 기간: 상담 완료 후 3년\n\n위 내용에 동의하십니까?",
      "is_required": true,
      "display_order": 1,
      "is_active": true
    },
    {
      "consent_item_id": 2,
      "item_title": "제3자 정보 제공 동의",
      "item_content": "TreeHeal은 보험 상담을 위해 고객님의 정보를 다음과 같이 제3자에게 제공합니다.\n\n1. 제공받는 자: 배정된 보험 상담사\n2. 제공 항목: 이름, 연락처, 상담 희망 내역\n3. 이용 목적: 보험 상담 서비스 제공\n4. 보유 기간: 상담 완료 후 1년\n\n위 내용에 동의하십니까?",
      "is_required": true,
      "display_order": 2,
      "is_active": true
    },
    {
      "consent_item_id": 3,
      "item_title": "마케팅 정보 수신 동의",
      "item_content": "TreeHeal은 새로운 보험 상품 및 이벤트 정보를 SMS, 이메일 등으로 제공하고자 합니다.\n\n1. 수신 방법: SMS, 이메일, 앱 푸시\n2. 발송 내용: 신규 보험 상품 안내, 이벤트 소식\n3. 수신 철회: 언제든지 수신 거부 가능\n\n위 내용에 동의하십니까?",
      "is_required": false,
      "display_order": 3,
      "is_active": true
    }
  ]
}
```

**에러 응답** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "서버 오류가 발생했습니다"
}
```

---

## 상담 신청 API

### 9. 상담 신청 (POST)

**엔드포인트**: `POST /api/consultations`

**설명**: 사용자가 입력한 정보로 상담 신청을 등록합니다.

**요청 헤더**:
```
Content-Type: application/json
```

**요청 바디**:
```json
{
  "ssaid": "a1b2c3d4e5f6g7h8",
  "category_id": 1,
  "applicant_name": "홍길동",
  "contact_number": "010-1234-5678",
  "birth_date": "1990-01-15",
  "gender": "M",
  "assigned_expert_id": 1,
  "detail_items": ["실손보험", "진단비"],
  "region": "서울특별시",
  "detailed_region": "강남구"
}
```

**필드 설명**:
- `ssaid` (string, 필수): 기기 SSAID
- `category_id` (number, 필수): 상담 구분 ID (consultation_categories 테이블의 category_id)
- `applicant_name` (string, 필수): 신청자 이름
- `contact_number` (string, 필수): 연락처 (010-1234-5678 형식)
- `birth_date` (string, 필수): 생년월일 (YYYY-MM-DD 형식)
- `gender` (string, 필수): 성별 ('M' 또는 'F')
- `assigned_expert_id` (number, 선택): 배정된 전문가 ID (선택하지 않은 경우 null 또는 undefined)
- `detail_items` (string[], 선택): 관심 항목 배열 (한글 라벨: "실손보험", "수술비", "진단비", "기타상담")
- `region` (string, 선택): 지역 (시/도)
- `detailed_region` (string, 선택): 상세 지역 (구/군)

**성공 응답** (201 Created):
```json
{
  "success": true,
  "request_id": 123,
  "request_number": "REQ-20251031-00001",
  "message": "상담 신청이 완료되었습니다"
}
```

**에러 응답** (400 Bad Request - 필수 항목 누락):
```json
{
  "success": false,
  "message": "필수 항목이 누락되었습니다: applicant_name"
}
```

**에러 응답** (400 Bad Request - 유효하지 않은 형식):
```json
{
  "success": false,
  "message": "전화번호 형식이 올바르지 않습니다"
}
```

**에러 응답** (404 Not Found - 존재하지 않는 전문가):
```json
{
  "success": false,
  "message": "지정된 전문가를 찾을 수 없습니다"
}
```

**에러 응답** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "상담 신청 중 오류가 발생했습니다"
}
```

---

### 10. 상담 신청 조회 (GET)

**엔드포인트**: `GET /api/consultations/:requestNumber`

**설명**: 신청 번호로 상담 신청 내역을 조회합니다.

**경로 파라미터**:
- `requestNumber` (string, 필수): 신청 번호 (예: "REQ-20251031-00001")

**성공 응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "request_id": 123,
    "request_number": "REQ-20251031-00001",
    "ssaid": "a1b2c3d4e5f6g7h8",
    "category_id": 1,
    "consultation_type": "보험보상상담",
    "applicant_name": "홍길동",
    "contact_number": "010-1234-5678",
    "birth_date": "1990-01-15",
    "gender": "M",
    "assigned_expert_id": 1,
    "expert_name": "김철수",
    "detail_items": ["암보험", "실손보험"],
    "region": "서울특별시",
    "detailed_region": "강남구",
    "status": "pending",
    "submitted_at": "2025-10-31T10:30:00Z",
    "processed_at": null
  }
}
```

**에러 응답** (404 Not Found):
```json
{
  "success": false,
  "message": "상담 신청을 찾을 수 없습니다"
}
```

---

## 서버 구현 예시 (Node.js + Express + MySQL)

### CORS 설정 (필수!)

웹 브라우저에서 테스트하는 경우 CORS를 반드시 설정해야 합니다.

```bash
npm install cors
```

```javascript
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

// CORS 설정 - 모든 도메인 허용 (개발용)
app.use(cors());

// 또는 특정 도메인만 허용 (프로덕션 권장)
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:19006', 'https://your-domain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const router = express.Router();

// MySQL 연결 풀
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'treeheal_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 기기 등록 API
router.post('/devices/register', async (req, res) => {
  try {
    const { ssaid, device_name, device_type } = req.body;

    // SSAID 필수 체크
    if (!ssaid) {
      return res.status(400).json({
        success: false,
        message: 'SSAID는 필수 항목입니다'
      });
    }

    // 이미 등록된 SSAID인지 확인
    const [existingDevices] = await pool.query(
      'SELECT * FROM devices WHERE ssaid = ? AND status = "active"',
      [ssaid]
    );

    // 이미 등록된 경우
    if (existingDevices.length > 0) {
      const device = existingDevices[0];

      // updated_at 갱신
      await pool.query(
        'UPDATE devices SET updated_at = NOW() WHERE device_id = ?',
        [device.device_id]
      );

      return res.status(200).json({
        success: true,
        device_id: device.device_id,
        message: '이미 등록된 기기입니다',
        data: device
      });
    }

    // 신규 등록
    const [result] = await pool.query(
      `INSERT INTO devices (device_name, ssaid, device_type, status)
       VALUES (?, ?, ?, 'active')`,
      [device_name || 'Unknown Device', ssaid, device_type || 'Unknown']
    );

    // 등록된 기기 정보 조회
    const [newDevice] = await pool.query(
      'SELECT * FROM devices WHERE device_id = ?',
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      device_id: result.insertId,
      message: '기기가 성공적으로 등록되었습니다',
      data: newDevice[0]
    });

  } catch (error) {
    console.error('Device registration error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// 기기 정보 조회 API
router.get('/devices/:ssaid', async (req, res) => {
  try {
    const { ssaid } = req.params;

    const [devices] = await pool.query(
      'SELECT * FROM devices WHERE ssaid = ? AND status = "active"',
      [ssaid]
    );

    if (devices.length === 0) {
      return res.status(404).json({
        success: false,
        message: '기기를 찾을 수 없습니다'
      });
    }

    return res.status(200).json({
      success: true,
      data: devices[0]
    });

  } catch (error) {
    console.error('Get device error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// 전문가 목록 조회 API (ssaid 쿼리 파라미터 지원)
router.get('/experts', async (req, res) => {
  try {
    const { ssaid } = req.query;

    let query;
    let params = [];

    if (ssaid) {
      // ssaid가 있으면 해당 기기에 매핑된 전문가만 반환
      query = `
        SELECT e.* FROM experts e
        INNER JOIN device_expert_mapping dem ON e.expert_id = dem.expert_id
        INNER JOIN devices d ON dem.device_id = d.device_id
        WHERE d.ssaid = ? AND e.status = 'active'
        ORDER BY dem.display_order ASC, e.display_order ASC
      `;
      params = [ssaid];
    } else {
      // ssaid가 없으면 모든 활성 전문가 반환
      query = `
        SELECT * FROM experts
        WHERE status = 'active'
        ORDER BY display_order ASC, expert_id ASC
      `;
    }

    const [experts] = await pool.query(query, params);

    return res.status(200).json({
      success: true,
      data: experts
    });

  } catch (error) {
    console.error('Get experts error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// 기기별 전문가 목록 조회 API
router.get('/experts/device/:deviceId', async (req, res) => {
  try {
    const { deviceId } = req.params;

    const [experts] = await pool.query(
      `SELECT e.* FROM experts e
       INNER JOIN device_expert_mapping dem ON e.expert_id = dem.expert_id
       WHERE dem.device_id = ? AND e.status = 'active'
       ORDER BY dem.display_order ASC, e.display_order ASC`,
      [deviceId]
    );

    return res.status(200).json({
      success: true,
      data: experts
    });

  } catch (error) {
    console.error('Get experts by device error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// 전문가 상세 조회 API
router.get('/experts/:expertId', async (req, res) => {
  try {
    const { expertId } = req.params;

    const [experts] = await pool.query(
      'SELECT * FROM experts WHERE expert_id = ? AND status = "active"',
      [expertId]
    );

    if (experts.length === 0) {
      return res.status(404).json({
        success: false,
        message: '전문가를 찾을 수 없습니다'
      });
    }

    return res.status(200).json({
      success: true,
      data: experts[0]
    });

  } catch (error) {
    console.error('Get expert by id error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// 상담 구분 목록 조회 API
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await pool.query(
      `SELECT category_id, category_name, category_icon, display_order, is_active
       FROM consultation_categories
       WHERE is_active = TRUE
       ORDER BY display_order ASC, category_id ASC`
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

// 세부 항목 목록 조회 API
router.get('/detail-items', async (req, res) => {
  try {
    const [items] = await pool.query(
      `SELECT item_id, item_name, item_icon, display_order, is_active
       FROM detail_items
       WHERE is_active = TRUE
       ORDER BY display_order ASC, item_id ASC`
    );

    return res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {
    console.error('Get detail items error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// 약관 목록 조회 API
router.get('/consent-items', async (req, res) => {
  try {
    const [items] = await pool.query(
      `SELECT consent_item_id, item_title, item_content, is_required, display_order, is_active
       FROM privacy_consent_items
       WHERE is_active = TRUE
       ORDER BY display_order ASC, consent_item_id ASC`
    );

    return res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {
    console.error('Get consent items error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다'
    });
  }
});

// 상담 신청 API
router.post('/consultations', async (req, res) => {
  try {
    const {
      ssaid,
      category_id,
      applicant_name,
      contact_number,
      birth_date,
      gender,
      assigned_expert_id,
      detail_items,
      region,
      detailed_region
    } = req.body;

    // 필수 항목 체크
    if (!ssaid) {
      return res.status(400).json({
        success: false,
        message: '필수 항목이 누락되었습니다: ssaid'
      });
    }

    if (!category_id) {
      return res.status(400).json({
        success: false,
        message: '필수 항목이 누락되었습니다: category_id'
      });
    }

    if (!applicant_name) {
      return res.status(400).json({
        success: false,
        message: '필수 항목이 누락되었습니다: applicant_name'
      });
    }

    if (!contact_number) {
      return res.status(400).json({
        success: false,
        message: '필수 항목이 누락되었습니다: contact_number'
      });
    }

    if (!birth_date) {
      return res.status(400).json({
        success: false,
        message: '필수 항목이 누락되었습니다: birth_date'
      });
    }

    if (!gender) {
      return res.status(400).json({
        success: false,
        message: '필수 항목이 누락되었습니다: gender'
      });
    }

    // 전화번호 형식 검증 (010-1234-5678 또는 01012345678)
    const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(contact_number.replace(/-/g, ''))) {
      return res.status(400).json({
        success: false,
        message: '전화번호 형식이 올바르지 않습니다'
      });
    }

    // 생년월일 형식 검증 (YYYY-MM-DD)
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDateRegex.test(birth_date)) {
      return res.status(400).json({
        success: false,
        message: '생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD)'
      });
    }

    // 성별 검증
    if (gender !== 'M' && gender !== 'F') {
      return res.status(400).json({
        success: false,
        message: '성별은 M 또는 F여야 합니다'
      });
    }

    // 전문가 ID가 있는 경우 존재하는지 확인
    if (assigned_expert_id) {
      const [experts] = await pool.query(
        'SELECT expert_id FROM experts WHERE expert_id = ? AND status = "active"',
        [assigned_expert_id]
      );

      if (experts.length === 0) {
        return res.status(404).json({
          success: false,
          message: '지정된 전문가를 찾을 수 없습니다'
        });
      }
    }

    // 신청 번호 생성 (REQ-YYYYMMDD-00001 형식)
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const [lastRequest] = await pool.query(
      `SELECT request_number FROM consultation_requests
       WHERE request_number LIKE ?
       ORDER BY request_id DESC
       LIMIT 1`,
      [`REQ-${today}-%`]
    );

    let requestNumber;
    if (lastRequest.length > 0) {
      const lastNumber = parseInt(lastRequest[0].request_number.split('-')[2]);
      requestNumber = `REQ-${today}-${String(lastNumber + 1).padStart(5, '0')}`;
    } else {
      requestNumber = `REQ-${today}-00001`;
    }

    // detail_items를 JSON 문자열로 변환
    const detailItemsJson = detail_items ? JSON.stringify(detail_items) : null;

    // 상담 신청 등록
    const [result] = await pool.query(
      `INSERT INTO consultation_requests (
        request_number,
        ssaid,
        category_id,
        applicant_name,
        contact_number,
        birth_date,
        gender,
        assigned_expert_id,
        detail_items,
        region,
        detailed_region,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        requestNumber,
        ssaid,
        category_id,
        applicant_name,
        contact_number,
        birth_date,
        gender,
        assigned_expert_id || null,
        detailItemsJson,
        region || null,
        detailed_region || null
      ]
    );

    return res.status(201).json({
      success: true,
      request_id: result.insertId,
      request_number: requestNumber,
      message: '상담 신청이 완료되었습니다'
    });

  } catch (error) {
    console.error('Consultation submission error:', error);
    return res.status(500).json({
      success: false,
      message: '상담 신청 중 오류가 발생했습니다'
    });
  }
});

// 상담 신청 조회 API
router.get('/consultations/:requestNumber', async (req, res) => {
  try {
    const { requestNumber } = req.params;

    const [requests] = await pool.query(
      `SELECT
        cr.*,
        e.expert_name
       FROM consultation_requests cr
       LEFT JOIN experts e ON cr.assigned_expert_id = e.expert_id
       WHERE cr.request_number = ?`,
      [requestNumber]
    );

    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: '상담 신청을 찾을 수 없습니다'
      });
    }

    const request = requests[0];

    // detail_items를 JSON 파싱
    if (request.detail_items) {
      try {
        request.detail_items = JSON.parse(request.detail_items);
      } catch (e) {
        request.detail_items = [];
      }
    }

    return res.status(200).json({
      success: true,
      data: request
    });

  } catch (error) {
    console.error('Get consultation error:', error);
    return res.status(500).json({
      success: false,
      message: '상담 신청 조회 중 오류가 발생했습니다'
    });
  }
});

// 라우터를 앱에 등록
app.use('/api', router);

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = router;
```

---

## 웹 브라우저 테스트 시 주의사항

### 1. CORS 에러 해결

**에러 메시지**:
```
교차 출처 요청 차단: 동일 출처 정책으로 인해 http://localhost:3000/api/devices/register에 있는 원격 리소스를 차단했습니다.
(원인: 'Access-Control-Allow-Origin' CORS 헤더가 없음)
```

**해결 방법**:
- 서버에 `cors` 미들웨어 설치 및 설정 (위 코드 참조)
- 개발 중에는 `app.use(cors())`로 모든 도메인 허용
- 프로덕션에서는 특정 도메인만 허용

### 2. 웹 환경 디바이스 ID

웹 브라우저에서는 다음과 같은 방식으로 디바이스 ID를 생성합니다:

- **Canvas 핑거프린트**: 브라우저의 렌더링 특성 활용
- **브라우저 정보**: User-Agent, 언어, 화면 해상도, 타임존 등
- **해시 생성**: 위 정보를 조합하여 고유한 해시 생성
- **형식**: `web_[16진수 해시]` (예: `web_a1b2c3d4e5f6`)

**특징**:
- localStorage에 저장되어 브라우저를 닫아도 유지됨
- 브라우저 캐시를 지우면 새로운 ID 생성
- 동일한 브라우저/기기에서는 일관된 ID 유지

### 3. 서버 URL 설정

**중요**: 서버 URL은 [src/config/api.ts](src/config/api.ts)에서 **한 번만** 변경하면 모든 API에 자동 적용됩니다.

```typescript
// src/config/api.ts
const API_URLS = {
  development: 'http://localhost:3000/api',
  production: 'https://your-production-server.com/api',
  web: 'http://localhost:3000/api',
};
```

**더 이상 개별 서비스 파일에서 URL을 변경할 필요가 없습니다!**

---

## 앱에서의 사용 방법

### 1. API 서버 URL 설정

**[src/config/api.ts](src/config/api.ts)** 파일에서 서버 URL을 변경하세요:

```typescript
const API_URLS = {
  development: 'http://localhost:3000/api',        // 로컬 개발 서버
  production: 'https://your-server.com/api',       // 프로덕션 서버
  web: 'http://localhost:3000/api',                // 웹 개발용
};
```

이 설정은 다음 서비스에 자동 적용됩니다:
- `deviceService.ts` (기기 등록/조회)
- `expertService.ts` (전문가 목록/상세 조회)
- 향후 추가될 모든 API 서비스

### 2. 앱 실행 흐름

1. **앱 시작** → `App.tsx`의 `useEffect` 실행
2. **기기 등록 확인** → AsyncStorage에서 `device_registered` 확인
3. **미등록 시**:
   - SSAID 가져오기 (`expo-application`)
   - 서버에 POST 요청 (`/api/devices/register`)
   - 성공 시 AsyncStorage에 `device_registered: true` 저장
4. **이미 등록된 경우**: 서버 요청 없이 앱 계속 진행

### 3. 로그 확인

앱 실행 시 콘솔에서 다음 로그를 확인할 수 있습니다:

```
기기가 이미 등록되어 있습니다
```

또는

```
서버에 기기 등록 중... a1b2c3d4e5f6g7h8
기기 등록 완료: 1
```

---

## 주의사항

1. **SSAID는 앱 재설치 시 변경될 수 있습니다** (Android)
2. **네트워크 오류 처리**: 오프라인 상태에서도 앱이 정상 동작하도록 에러 처리 필요
3. **보안**: HTTPS를 사용하여 통신하세요
4. **타임아웃**: 현재 10초로 설정되어 있습니다
5. **재시도 로직**: 필요시 실패 시 재시도 로직 추가 권장

---

## 테스트 방법

### 1. 로컬 테스트 (MockAPI)

개발 중에는 실제 서버 없이 테스트할 수 있도록 mock 데이터를 사용할 수 있습니다.

[src/services/deviceService.ts](src/services/deviceService.ts)에 다음과 같이 수정:

```typescript
// 개발 모드 플래그
const DEV_MODE = true;

export const registerDevice = async (): Promise<DeviceRegistrationResponse> => {
  if (DEV_MODE) {
    // Mock response for development
    console.log('[DEV MODE] Mock device registration');
    return {
      success: true,
      device_id: 999,
      message: '[DEV MODE] Mock registration successful',
    };
  }

  // ... 실제 코드
};
```

### 2. 등록 상태 초기화

AsyncStorage를 초기화하려면:

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// 개발 중 테스트용
await AsyncStorage.removeItem('device_registered');
```
