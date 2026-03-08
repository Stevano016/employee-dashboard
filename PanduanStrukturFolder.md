src/
│
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                    # Layout polos, tanpa sidebar
│   │   └── login/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx                    # Layout dengan sidebar & navbar
│   │   ├── dashboard/
│   │   │   ├── page.tsx                  # Redirect by role
│   │   │   ├── admin/
│   │   │   │   └── page.tsx
│   │   │   ├── hr/
│   │   │   │   └── page.tsx
│   │   │   └── karyawan/
│   │   │       └── page.tsx
│   │   │
│   │   ├── karyawan/
│   │   │   ├── page.tsx                  # List karyawan
│   │   │   ├── tambah/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx              # Detail karyawan
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   │
│   │   ├── absensi/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── izin-cuti/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── departemen/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   └── jam-kerja/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── route.ts                  # POST login, POST logout
│   │   ├── karyawan/
│   │   │   ├── route.ts                  # GET all, POST
│   │   │   └── [id]/
│   │   │       └── route.ts              # GET, PUT, DELETE
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
│   │
│   ├── globals.css
│   ├── layout.tsx                        # Root layout
│   └── page.tsx                          # Redirect ke /login atau /dashboard
│
├── components/
│   ├── ui/                               # Komponen atomic, reusable
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Badge.tsx
│   │   ├── Spinner.tsx
│   │   ├── Dropdown.tsx
│   │   └── Card.tsx
│   │
│   ├── layout/                           # Struktur halaman
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── PageWrapper.tsx
│   │
│   ├── forms/                            # Form per fitur
│   │   ├── LoginForm.tsx
│   │   ├── KaryawanForm.tsx
│   │   ├── AbsensiForm.tsx
│   │   └── IzinCutiForm.tsx
│   │
│   └── features/                         # Komponen spesifik per fitur
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
│
├── controllers/                          # Handler req/res
│   ├── authController.ts
│   ├── karyawanController.ts
│   ├── absensiController.ts
│   ├── izinCutiController.ts
│   ├── departemenController.ts
│   └── jamKerjaController.ts
│
├── services/                             # Business logic
│   ├── authService.ts
│   ├── karyawanService.ts
│   ├── absensiService.ts
│   ├── izinCutiService.ts
│   ├── departemenService.ts
│   └── jamKerjaService.ts
│
├── models/                               # Query DB
│   ├── userModel.ts
│   ├── karyawanModel.ts
│   ├── absensiModel.ts
│   ├── izinCutiModel.ts
│   ├── departemenModel.ts
│   └── jamKerjaModel.ts
│
├── middlewares/
│   ├── authMiddleware.ts                 # Validasi JWT/session
│   ├── roleMiddleware.ts                 # Guard per role
│   └── validationMiddleware.ts           # Validasi request body
│
├── hooks/                                # Custom hooks (client side)
│   ├── useAuth.ts
│   ├── useKaryawan.ts
│   ├── useAbsensi.ts
│   ├── useIzinCuti.ts
│   └── useDepartemen.ts
│
├── lib/
│   ├── db.ts                             # Koneksi DB MySQL
│   ├── jwt.ts                            # Sign & verify JWT
│   ├── fetcher.ts                        # Fetch wrapper client side
│   └── utils.ts                          # Helper umum
│
├── types/                                # TypeScript interfaces
│   ├── auth.types.ts
│   ├── karyawan.types.ts
│   ├── absensi.types.ts
│   ├── izinCuti.types.ts
│   └── departemen.types.ts
│
├── constants/
│   ├── roles.ts                          # admin | hr | karyawan
│   ├── routes.ts                         # Semua path URL
│   └── statusOptions.ts                  # aktif | resign | dll
│
└── middleware.ts                         # Next.js middleware (root src/)


