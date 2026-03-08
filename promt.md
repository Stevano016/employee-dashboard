You are an expert Next.js full-stack developer.
Generate a complete, modular, production-ready Employee Management System from scratch.
Generate one file at a time, confirm filename, then move to next.
Do not skip any file. Do not combine multiple files into one response.

═══════════════════════════════════════
TECH STACK
═══════════════════════════════════════
- Framework  : Next.js 14+ (App Router)
- Language   : TypeScript
- UI Library : shadcn/ui + Tailwind CSS
- Database   : MySQL
- Auth       : JWT (jose library) + httpOnly cookie
- DB Driver  : mysql2
- Validation : zod
- State      : Zustand (global) + TanStack Query (server state)
- Fetching   : native fetch (custom fetcher wrapper)
- Password   : bcryptjs

═══════════════════════════════════════
INSTALL COMMANDS (generate this first)
═══════════════════════════════════════
npx create-next-app@latest employee-management --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd employee-management
npx shadcn@latest init
npx shadcn@latest add button input table badge card dialog dropdown-menu form label select separator sheet skeleton toast
npm install mysql2 jose bcryptjs zod zustand @tanstack/react-query @tanstack/react-query-devtools
npm install --save-dev @types/bcryptjs

═══════════════════════════════════════
DATABASE SCHEMA
═══════════════════════════════════════
Tables:

1. karyawan
   - karyawan_id  : int PK AUTO_INCREMENT
   - departemen_id: int FK → departemen
   - jam_kerja_id : int FK → jam_kerja
   - nama_lengkap : varchar(100)
   - nik          : varchar(20)
   - jabatan      : varchar(50)
   - tanggal_masuk: date
   - status       : enum('aktif','resign')

2. absensi
   - absensi_id      : int PK AUTO_INCREMENT
   - karyawan_id     : int FK → karyawan
   - tanggal         : date
   - waktu_masuk     : time
   - waktu_pulang    : time
   - status_kehadiran: enum('hadir','terlambat','izin','sakit','alpha')
   - status_karyawan : enum('aktif','resign')
   - catatan         : text

3. izin_cuti
   - izin_id          : int PK AUTO_INCREMENT
   - karyawan_id      : int FK → karyawan
   - tanggal_pengajuan: date
   - tanggal_mulai    : date
   - tanggal_selesai  : date
   - jenis            : varchar(20)
   - alasan           : text
   - status           : enum('menunggu','disetujui','ditolak')

4. departemen
   - departemen_id  : int PK AUTO_INCREMENT
   - nama_departemen: varchar(100)
   - lokasi         : varchar(100)

5. jam_kerja
   - jam_kerja_id: int PK AUTO_INCREMENT
   - nama_shift  : varchar(50)
   - hari        : enum('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu')
   - jam_masuk   : time
   - jam_pulang  : time
   - keterangan  : varchar(100)

6. user
   - user_id    : int PK AUTO_INCREMENT
   - id_karyawan: int FK → karyawan
   - username   : varchar(50) UNIQUE
   - password   : varchar(100) hashed bcrypt
   - role       : enum('admin','hr','karyawan')
   - status     : enum('aktif','resign')

═══════════════════════════════════════
ROLES & ACCESS
═══════════════════════════════════════
admin   : Full access. Kelola karyawan, departemen, jam kerja, user, lihat semua laporan
hr      : Kelola absensi, approve/reject izin cuti, lihat rekap absensi semua karyawan
karyawan: Lihat absensi pribadi, ajukan izin cuti, lihat status izin sendiri

Sidebar menu per role:
- admin   : Dashboard, Karyawan, Departemen, Jam Kerja, Absensi, Izin Cuti
- hr      : Dashboard, Absensi, Izin Cuti, Karyawan (read only)
- karyawan: Dashboard, Absensi Saya, Izin Cuti Saya

═══════════════════════════════════════
COMPLETE FOLDER STRUCTURE
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
│   │   │   ├── admin/
│   │   │   │   └── page.tsx
│   │   │   ├── hr/
│   │   │   │   └── page.tsx
│   │   │   └── karyawan/
│   │   │       └── page.tsx
│   │   ├── karyawan/
│   │   │   ├── page.tsx
│   │   │   ├── tambah/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── absensi/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── izin-cuti/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── departemen/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── jam-kerja/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── route.ts
│   │   ├── karyawan/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── absensi/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── izin-cuti/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── departemen/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── jam-kerja/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                        # shadcn/ui (auto generated, do not touch)
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
├── store/
│   ├── authStore.ts
│   ├── uiStore.ts
│   └── notifStore.ts
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
IMPLEMENTATION DETAILS
═══════════════════════════════════════

### .env.example
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=employee_db
JWT_SECRET=your_super_secret_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

### lib/db.ts
- mysql2/promise createPool
- Read from .env
- Export pool with execute helper
- Handle connection error

### lib/jwt.ts
- Use jose library
- signJwt(payload) → signed JWT string, expiry 8 hours
- verifyJwt(token) → decoded payload or null
- Payload shape: { user_id, id_karyawan, username, role, status }
- Secret from JWT_SECRET env

### lib/fetcher.ts
- Base URL from NEXT_PUBLIC_APP_URL
- Default headers: Content-Type application/json
- Include credentials: 'include'
- GET, POST, PUT, DELETE methods
- Throw error if response not ok with error message from API
- Return typed response

### lib/utils.ts
- formatDate(date): string → DD/MM/YYYY
- formatTime(time): string → HH:MM
- cn(...classes) → tailwind class merger using clsx + tailwind-merge

### constants/roles.ts
export const ROLES = {
  ADMIN: 'admin',
  HR: 'hr',
  KARYAWAN: 'karyawan'
} as const
export type Role = typeof ROLES[keyof typeof ROLES]

### constants/routes.ts
All page URL paths as constants.
Example: export const ROUTES = { LOGIN: '/login', DASHBOARD: '/dashboard', ... }

### constants/statusOptions.ts
Status options arrays for dropdowns.
Include: statusKehadiran, statusIzin, statusKaryawan, jenisIzin

### types/
Strictly typed interfaces matching DB schema.
Each file exports its interface + any related types.
Example auth.types.ts:
  interface User { user_id, id_karyawan, username, role, status }
  interface LoginPayload { username, password }
  interface AuthResponse { user, token }

### models/
- Use pool.execute() from lib/db.ts
- Return typed results using RowDataPacket
- Functions: findAll, findById, create, update, remove
- karyawanModel also: findByDepartemen, findAktif
- absensiModel also: findByKaryawan, findByTanggal, findToday
- izinCutiModel also: findByKaryawan, findByStatus, findPending
- userModel also: findByUsername

### services/
- Pure functions, no Request/Response
- Call model functions
- authService: login(username, password) → verify bcrypt → signJwt → return token + user
- karyawanService: getAll, getById, create, update, remove, getAktif
- absensiService: getAll, getById, create, update, getTodayRecap, getByKaryawan
- izinCutiService: getAll, getById, create, updateStatus, getByKaryawan, getPending
- departemenService: getAll, getById, create, update, remove
- jamKerjaService: getAll, getById, create, update, remove

### middlewares/authMiddleware.ts
- Extract JWT from cookies (name: 'token') or Authorization Bearer header
- Verify using verifyJwt from lib/jwt.ts
- Return decoded payload or throw 401

### middlewares/roleMiddleware.ts
- Accept allowedRoles: Role[]
- Check decoded.role against allowedRoles
- Throw 403 if not permitted

### middlewares/validationMiddleware.ts
- Accept zod schema
- Parse req.json()
- Return parsed data or throw 400 with zod error messages

### controllers/
Pattern for every controller:
try {
  const decoded = await authMiddleware(req)
  roleMiddleware(decoded, ['admin']) // adjust roles per endpoint
  // call service
  return NextResponse.json({ success: true, data })
} catch (error) {
  return NextResponse.json({ success: false, message: error.message }, { status: error.status || 500 })
}

authController: login → set httpOnly cookie 'token' → return user
karyawanController: GET all, GET by id, POST create, PUT update, DELETE remove
absensiController: GET all, GET by id, POST create, PUT update
izinCutiController: GET all, GET by id, POST create, PUT update status
departemenController: GET all, GET by id, POST create, PUT update, DELETE remove
jamKerjaController: GET all, GET by id, POST create, PUT update, DELETE remove

Role access per controller:
- karyawan  GET all  : admin, hr
- karyawan  POST     : admin
- karyawan  PUT/DELETE: admin
- absensi   GET all  : admin, hr
- absensi   GET own  : karyawan (filter by id_karyawan from token)
- absensi   POST     : admin, hr
- izin-cuti GET all  : admin, hr
- izin-cuti GET own  : karyawan
- izin-cuti POST     : karyawan
- izin-cuti PUT      : admin, hr
- departemen: admin only
- jam-kerja : admin only

### app/api/*/route.ts
Thin layer only:
import { getKaryawan, createKaryawan } from '@/controllers/karyawanController'
export const GET = getKaryawan
export const POST = createKaryawan

### store/authStore.ts
Zustand store:
- user: User | null
- role: Role | null
- isAuthenticated: boolean
- setUser(user) → set state
- logout() → clear state
- Use persist middleware, key: 'auth-store', storage: localStorage

### store/uiStore.ts
Zustand store:
- isSidebarOpen: boolean (default true)
- toggleSidebar()
- setSidebarOpen(value: boolean)
No persist.

### store/notifStore.ts
Zustand store:
- notifications: Notif[]
- Notif: { id: string, message: string, type: 'success'|'error'|'warning'|'info' }
- addNotif(message, type)  → nanoid for id, auto removeNotif after 3000ms
- removeNotif(id)
- clearAll()
No persist.

### hooks/useAuth.ts
- Login: POST /api/auth → setUser in authStore → router.push to /dashboard
- Logout: DELETE /api/auth → logout() in authStore → router.push to /login
- Return { user, role, isAuthenticated, login, logout, isLoading }

### hooks/useKaryawan.ts
- useKaryawan()      → useQuery(['karyawan'], GET /api/karyawan)
- useKaryawanById(id)→ useQuery(['karyawan', id], GET /api/karyawan/id)
- useTambahKaryawan()→ useMutation POST, onSuccess invalidate ['karyawan'], addNotif success
- useEditKaryawan()  → useMutation PUT, onSuccess invalidate ['karyawan'], addNotif success
- useHapusKaryawan() → useMutation DELETE, onSuccess invalidate ['karyawan'], addNotif success
All onError: addNotif error from notifStore

### hooks/useAbsensi.ts
- useAbsensi()       → useQuery(['absensi'], GET /api/absensi)
- useAbsensiSaya()   → useQuery(['absensi', 'saya'], GET /api/absensi?own=true)
- useTambahAbsensi() → useMutation POST, onSuccess invalidate ['absensi'], addNotif success
- useEditAbsensi()   → useMutation PUT, onSuccess invalidate ['absensi'], addNotif success

### hooks/useIzinCuti.ts
- useIzinCuti()      → useQuery(['izin-cuti'], GET /api/izin-cuti)
- useIzinCutiSaya()  → useQuery(['izin-cuti', 'saya'], GET /api/izin-cuti?own=true)
- useAjukanIzin()    → useMutation POST, onSuccess invalidate ['izin-cuti'], addNotif success
- useUpdateIzin()    → useMutation PUT status, onSuccess invalidate ['izin-cuti'], addNotif success

### hooks/useDepartemen.ts
- useDepartemen()      → useQuery(['departemen'], GET /api/departemen)
- useTambahDepartemen()→ useMutation POST, onSuccess invalidate ['departemen'], addNotif success
- useEditDepartemen()  → useMutation PUT, onSuccess invalidate ['departemen'], addNotif success
- useHapusDepartemen() → useMutation DELETE, onSuccess invalidate ['departemen'], addNotif success

### app/layout.tsx (root)
'use client'
Wrap with QueryClientProvider.
Add ReactQueryDevtools in development.
Add Toaster from shadcn/ui for notifications.
Zustand needs no provider.

### middleware.ts (Next.js root middleware)
- Protect all routes under /dashboard/*
- Read cookie 'token'
- Verify JWT using jose
- If invalid/missing → redirect to /login
- If valid → check role → redirect /dashboard to /dashboard/{role}
- Public routes: /login only

### app/(auth)/layout.tsx
Plain layout, no sidebar/navbar.
Center content vertically and horizontally.
Clean background.

### app/(auth)/login/page.tsx
'use client'
Import LoginForm component.
If already authenticated redirect to /dashboard.

### components/forms/LoginForm.tsx
'use client'
Use shadcn/ui Form + zod validation.
Fields: username, password (show/hide toggle).
On submit: call login() from useAuth hook.
Show loading state on button.
Show error message if login failed.

### app/(dashboard)/layout.tsx
'use client'
Import Sidebar + Navbar + PageWrapper.
Get isSidebarOpen from uiStore.
Responsive layout.

### components/layout/Sidebar.tsx
'use client'
Get user, role from authStore.
Get isSidebarOpen from uiStore.
Render menu based on role from constants.
Active link highlight using usePathname.
Use shadcn/ui Sheet for mobile.

### components/layout/Navbar.tsx
'use client'
Get user from authStore.
Get toggleSidebar from uiStore.
Show username + role badge.
Logout button → call logout from useAuth.

### components/layout/PageWrapper.tsx
Wrapper with consistent padding and title slot.
Props: title, children, action (optional button slot).

### app/(dashboard)/dashboard/page.tsx
'use client'
Get role from authStore.
Redirect to /dashboard/admin, /dashboard/hr, or /dashboard/karyawan.

### components/features/dashboard/AdminDashboard.tsx
'use client'
Stats cards:
- Total karyawan aktif (from useKaryawan filtered status aktif)
- Total departemen (from useDepartemen)
- Absensi hadir hari ini (from useAbsensi filtered today)
- Izin pending (from useIzinCuti filtered status menunggu)
Use shadcn/ui Card + Skeleton for loading.

### components/features/dashboard/HRDashboard.tsx
'use client'
- Absensi hari ini recap (hadir, terlambat, alpha count)
- List izin pending with approve/reject buttons
- Use useIzinCuti + useUpdateIzin mutation

### components/features/dashboard/KaryawanDashboard.tsx
'use client'
- Absensi bulan ini milik sendiri (useAbsensiSaya)
- Status izin terakhir (useIzinCutiSaya)
- Tombol ajukan izin cuti

### components/features/karyawan/KaryawanTable.tsx
'use client'
Use shadcn/ui Table.
Columns: Nama, NIK, Jabatan, Departemen, Status, Tanggal Masuk, Aksi.
Badge color: aktif → green, resign → red.
Aksi: Detail, Edit, Hapus (hapus only for admin).
Pagination simple.
Search by nama.

### components/features/absensi/AbsensiTable.tsx
'use client'
Use shadcn/ui Table.
Columns: Nama Karyawan, Tanggal, Waktu Masuk, Waktu Pulang, Status, Catatan.
Badge color:
  hadir → green
  terlambat → yellow
  alpha → red
  sakit → blue
  izin → purple
Filter by tanggal.

### components/features/izin-cuti/IzinCutiTable.tsx
'use client'
Use shadcn/ui Table.
Columns: Nama, Jenis, Tanggal Mulai, Tanggal Selesai, Alasan, Status, Aksi.
Badge color: menunggu → yellow, disetujui → green, ditolak → red.
Aksi for hr/admin: Approve, Reject buttons using useUpdateIzin.

### components/forms/KaryawanForm.tsx
'use client'
Use shadcn/ui Form + zod.
Fields: nama_lengkap, nik, jabatan, departemen_id (select), jam_kerja_id (select), tanggal_masuk, status.
Used for both tambah and edit (accept optional defaultValues prop).
On submit: call useTambahKaryawan or useEditKaryawan.

### components/forms/AbsensiForm.tsx
'use client'
Fields: karyawan_id (select), tanggal, waktu_masuk, waktu_pulang, status_kehadiran (select), catatan.
On submit: call useTambahAbsensi.

### components/forms/IzinCutiForm.tsx
'use client'
Fields: tanggal_mulai, tanggal_selesai, jenis (select), alasan.
karyawan_id auto filled from authStore user.id_karyawan.
On submit: call useAjukanIzin.

### All page.tsx files in (dashboard)
Keep thin. Only import feature component.
Example:
// app/(dashboard)/karyawan/page.tsx
'use client'
import PageWrapper from '@/components/layout/PageWrapper'
import KaryawanTable from '@/components/features/karyawan/KaryawanTable'
export default function KaryawanPage() {
  return (
    <PageWrapper title="Data Karyawan">
      <KaryawanTable />
    </PageWrapper>
  )
}

═══════════════════════════════════════
STYLE GUIDE
═══════════════════════════════════════
- Use shadcn/ui components as base
- Tailwind for custom styling
- Badge variants per status (use cn() utility):
  aktif/hadir/disetujui  → bg-green-100 text-green-700
  terlambat/menunggu     → bg-yellow-100 text-yellow-700
  alpha/ditolak/resign   → bg-red-100 text-red-700
  sakit/izin             → bg-blue-100 text-blue-700
- Consistent spacing: p-4 md:p-6 for pages
- Sidebar width: 240px open, 0 or icon-only when closed
- Font: default Next.js (Inter)

═══════════════════════════════════════
GENERATE ORDER — ONE FILE AT A TIME
═══════════════════════════════════════
1.  .env.example
2.  lib/db.ts
3.  lib/jwt.ts
4.  lib/fetcher.ts
5.  lib/utils.ts
6.  constants/roles.ts
7.  constants/routes.ts
8.  constants/statusOptions.ts
9.  types/auth.types.ts
10. types/karyawan.types.ts
11. types/absensi.types.ts
12. types/izinCuti.types.ts
13. types/departemen.types.ts
14. models/userModel.ts
15. models/karyawanModel.ts
16. models/absensiModel.ts
17. models/izinCutiModel.ts
18. models/departemenModel.ts
19. models/jamKerjaModel.ts
20. services/authService.ts
21. services/karyawanService.ts
22. services/absensiService.ts
23. services/izinCutiService.ts
24. services/departemenService.ts
25. services/jamKerjaService.ts
26. middlewares/authMiddleware.ts
27. middlewares/roleMiddleware.ts
28. middlewares/validationMiddleware.ts
29. controllers/authController.ts
30. controllers/karyawanController.ts
31. controllers/absensiController.ts
32. controllers/izinCutiController.ts
33. controllers/departemenController.ts
34. controllers/jamKerjaController.ts
35. app/api/auth/route.ts
36. app/api/karyawan/route.ts
37. app/api/karyawan/[id]/route.ts
38. app/api/absensi/route.ts
39. app/api/absensi/[id]/route.ts
40. app/api/izin-cuti/route.ts
41. app/api/izin-cuti/[id]/route.ts
42. app/api/departemen/route.ts
43. app/api/departemen/[id]/route.ts
44. app/api/jam-kerja/route.ts
45. app/api/jam-kerja/[id]/route.ts
46. store/authStore.ts
47. store/uiStore.ts
48. store/notifStore.ts
49. hooks/useAuth.ts
50. hooks/useKaryawan.ts
51. hooks/useAbsensi.ts
52. hooks/useIzinCuti.ts
53. hooks/useDepartemen.ts
54. components/layout/Sidebar.tsx
55. components/layout/Navbar.tsx
56. components/layout/PageWrapper.tsx
57. components/forms/LoginForm.tsx
58. components/forms/KaryawanForm.tsx
59. components/forms/AbsensiForm.tsx
60. components/forms/IzinCutiForm.tsx
61. components/features/dashboard/AdminDashboard.tsx
62. components/features/dashboard/HRDashboard.tsx
63. components/features/dashboard/KaryawanDashboard.tsx
64. components/features/karyawan/KaryawanTable.tsx
65. components/features/karyawan/KaryawanCard.tsx
66. components/features/absensi/AbsensiTable.tsx
67. components/features/izin-cuti/IzinCutiTable.tsx
68. components/features/departemen/DepartemenTable.tsx
69. app/globals.css
70. app/layout.tsx
71. app/page.tsx
72. app/(auth)/layout.tsx
73. app/(auth)/login/page.tsx
74. app/(dashboard)/layout.tsx
75. app/(dashboard)/dashboard/page.tsx
76. app/(dashboard)/dashboard/admin/page.tsx
77. app/(dashboard)/dashboard/hr/page.tsx
78. app/(dashboard)/dashboard/karyawan/page.tsx
79. app/(dashboard)/karyawan/page.tsx
80. app/(dashboard)/karyawan/tambah/page.tsx
81. app/(dashboard)/karyawan/[id]/page.tsx
82. app/(dashboard)/karyawan/[id]/edit/page.tsx
83. app/(dashboard)/absensi/page.tsx
84. app/(dashboard)/absensi/[id]/page.tsx
85. app/(dashboard)/izin-cuti/page.tsx
86. app/(dashboard)/izin-cuti/[id]/page.tsx
87. app/(dashboard)/departemen/page.tsx
88. app/(dashboard)/departemen/[id]/page.tsx
89. app/(dashboard)/jam-kerja/page.tsx
90. app/(dashboard)/jam-kerja/[id]/page.tsx
91. middleware.ts
92. next.config.ts

After generating each file:
- Print: "✅ [filename] done. Generating [next filename]..."
- Then immediately generate the next file.
- If you reach your output limit, stop at a complete file and print:
  "⏸️ Paused at [filename]. Type 'continue' to resume."