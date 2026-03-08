You are an expert Next.js full-stack developer. Generate a complete, modular, production-ready Employee Management System (Sistem Manajemen Karyawan) based on the following specification.

═══════════════════════════════════════
TECH STACK
═══════════════════════════════════════
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- UI Library: shadcn/ui + Tailwind CSS
- Database: MySQL
- Auth: JWT (jose library)
- DB Driver: mysql2
- Form Validation: zod
- HTTP Client: native fetch (custom fetcher wrapper)

═══════════════════════════════════════
DATABASE SCHEMA
═══════════════════════════════════════
Tables:
1. karyawan (karyawan_id, departemen_id, jam_kerja_id, nama_lengkap, nik, jabatan, tanggal_masuk, status: aktif|resign)
2. absensi (absensi_id, karyawan_id, tanggal, waktu_masuk, waktu_pulang, status_kehadiran: hadir|terlambat|izin|sakit|alpha, status_karyawan: aktif|resign, catatan)
3. izin_cuti (izin_id, karyawan_id, tanggal_pengajuan, tanggal_mulai, tanggal_selesai, jenis, alasan, status: menunggu|disetujui|ditolak)
4. departemen (departemen_id, nama_departemen, lokasi)
5. jam_kerja (jam_kerja_id, nama_shift, hari: Senin-Minggu, jam_masuk, jam_pulang, keterangan)
6. user (user_id, id_karyawan, username, password, role: admin|hr|karyawan, status: aktif|resign)

═══════════════════════════════════════
ROLES & ACCESS
═══════════════════════════════════════
- admin   : Full access. Kelola karyawan, departemen, jam kerja, user, lihat semua laporan
- hr      : Kelola absensi, approve/reject izin cuti, lihat rekap absensi semua karyawan
- karyawan: Lihat absensi pribadi, ajukan izin cuti, lihat status izin sendiri

═══════════════════════════════════════
FOLDER STRUCTURE — GENERATE EXACTLY THIS
═══════════════════════════════════════
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── admin/page.tsx
│   │   │   ├── hr/page.tsx
│   │   │   └── karyawan/page.tsx
│   │   ├── karyawan/
│   │   │   ├── page.tsx
│   │   │   ├── tambah/page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── edit/page.tsx
│   │   ├── absensi/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── izin-cuti/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── departemen/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── jam-kerja/
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   ├── api/
│   │   ├── auth/route.ts
│   │   ├── karyawan/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── absensi/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── izin-cuti/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── departemen/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── jam-kerja/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── PageWrapper.tsx
│   ├── forms/
│   │   ├── LoginForm.tsx
│   │   ├── KaryawanForm.tsx
│   │   ├── AbsensiForm.tsx
│   │   └── IzinCutiForm.tsx
│   └── features/
│       ├── dashboard/
│       │   ├── AdminDashboard.tsx
│       │   ├── HRDashboard.tsx
│       │   └── KaryawanDashboard.tsx
│       ├── karyawan/
│       │   ├── KaryawanTable.tsx
│       │   └── KaryawanCard.tsx
│       ├── absensi/
│       │   └── AbsensiTable.tsx
│       ├── izin-cuti/
│       │   └── IzinCutiTable.tsx
│       └── departemen/
│           └── DepartemenTable.tsx
├── controllers/
│   ├── authController.ts
│   ├── karyawanController.ts
│   ├── absensiController.ts
│   ├── izinCutiController.ts
│   ├── departemenController.ts
│   └── jamKerjaController.ts
├── services/
│   ├── authService.ts
│   ├── karyawanService.ts
│   ├── absensiService.ts
│   ├── izinCutiService.ts
│   ├── departemenService.ts
│   └── jamKerjaService.ts
├── models/
│   ├── userModel.ts
│   ├── karyawanModel.ts
│   ├── absensiModel.ts
│   ├── izinCutiModel.ts
│   ├── departemenModel.ts
│   └── jamKerjaModel.ts
├── middlewares/
│   ├── authMiddleware.ts
│   ├── roleMiddleware.ts
│   └── validationMiddleware.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useKaryawan.ts
│   ├── useAbsensi.ts
│   ├── useIzinCuti.ts
│   └── useDepartemen.ts
├── lib/
│   ├── db.ts
│   ├── jwt.ts
│   ├── fetcher.ts
│   └── utils.ts
├── types/
│   ├── auth.types.ts
│   ├── karyawan.types.ts
│   ├── absensi.types.ts
│   ├── izinCuti.types.ts
│   └── departemen.types.ts
├── constants/
│   ├── roles.ts
│   ├── routes.ts
│   └── statusOptions.ts
└── middleware.ts

═══════════════════════════════════════
ARCHITECTURE RULES — FOLLOW STRICTLY
═══════════════════════════════════════
1. app/api/*/route.ts         → Only calls controller, no logic
2. controllers/               → Handle Request/Response, call service
3. services/                  → Business logic only, no req/res
4. models/                    → Raw SQL queries only using mysql2
5. middlewares/               → Intercept and validate before controller
6. hooks/                     → All client-side API calls, never in page.tsx
7. page.tsx                   → Import feature component only, stays thin

═══════════════════════════════════════
IMPLEMENTATION DETAILS
═══════════════════════════════════════

### lib/db.ts
- mysql2 createPool
- Read config from .env: DB_HOST, DB_USER, DB_PASS, DB_NAME

### lib/jwt.ts
- Sign JWT with jose, payload: { user_id, role, karyawan_id }
- Expiry: 8 hours
- Secret from .env: JWT_SECRET

### lib/fetcher.ts
- Wrapper around fetch for client-side
- Auto include credentials
- Handle error response as throw

### middleware.ts (Next.js root middleware)
- Protect all /dashboard/* routes
- Redirect to /login if no valid JWT in cookies
- Redirect to /dashboard/{role} based on role in JWT

### authMiddleware.ts
- Verify JWT from Authorization header or cookies
- Return 401 if invalid

### roleMiddleware.ts
- Accept allowed roles array
- Return 403 if role not permitted
- Usage: roleMiddleware(['admin', 'hr'])

### validationMiddleware.ts
- Accept zod schema
- Parse request body
- Return 400 with zod errors if invalid

### API Route pattern (example: karyawan)
// app/api/karyawan/route.ts
import { getKaryawan, createKaryawan } from '@/controllers/karyawanController'
export const GET = getKaryawan
export const POST = createKaryawan

### Controller pattern
- Wrap in try/catch
- Call authMiddleware first
- Call roleMiddleware second
- Call service
- Return NextResponse.json()

### Service pattern
- Pure functions
- No Request/Response objects
- Call model functions
- Handle business rules (ex: cek karyawan aktif sebelum absensi)

### Model pattern
- Use db.execute() from mysql2
- Return typed results
- No business logic

### types/ pattern
- Export interface per entity matching DB schema
- Example: interface Karyawan { karyawan_id: number; nama_lengkap: string; ... }

### hooks/ pattern
- Use useState + useEffect
- Call lib/fetcher.ts
- Return { data, loading, error, refetch }

### components/features/ pattern
- Receive data as props from hooks
- Use shadcn/ui Table, Badge, Button, Dialog
- Badge color based on status:
  aktif → green, resign → red
  hadir → green, terlambat → yellow, alpha → red, sakit/izin → blue
  menunggu → yellow, disetujui → green, ditolak → red

### Dashboard per role
AdminDashboard   : Total karyawan, total departemen, karyawan baru bulan ini, rekap absensi hari ini
HRDashboard      : Absensi hari ini, izin pending (menunggu), rekap mingguan
KaryawanDashboard: Absensi bulan ini pribadi, status izin terakhir, jam masuk hari ini

### Sidebar menu per role
admin   : Dashboard, Karyawan, Departemen, Jam Kerja, Absensi, Izin Cuti, User
hr      : Dashboard, Absensi, Izin Cuti, Karyawan (read only)
karyawan: Dashboard, Absensi Saya, Izin Cuti Saya

### Login flow
1. POST /api/auth with { username, password }
2. authService: bcrypt compare password
3. If valid: sign JWT, set httpOnly cookie
4. Redirect to /dashboard → middleware redirect to /dashboard/{role}

═══════════════════════════════════════
GENERATE ORDER — FILE BY FILE
═══════════════════════════════════════
Generate in this exact order:
1. .env.example
2. lib/db.ts
3. lib/jwt.ts
4. lib/fetcher.ts
5. lib/utils.ts
6. constants/roles.ts
7. constants/routes.ts
8. constants/statusOptions.ts
9. types/ (all files)
10. models/ (all files)
11. services/ (all files)
12. middlewares/ (all files)
13. controllers/ (all files)
14. app/api/ (all routes)
15. hooks/ (all files)
16. components/ui/ (shadcn setup)
17. components/layout/ (Sidebar, Navbar, PageWrapper)
18. components/forms/ (all forms)
19. components/features/ (all feature components)
20. app/(auth)/ (layout + login page)
21. app/(dashboard)/ (layout + all pages)
22. app/layout.tsx
23. app/page.tsx
24. middleware.ts

After generating each file, confirm the filename and move to the next.
Do not skip any file.
Do not combine multiple files into one response.