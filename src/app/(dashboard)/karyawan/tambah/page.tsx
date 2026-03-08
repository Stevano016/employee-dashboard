'use client';

import { useRouter } from 'next/navigation';
import { KaryawanForm } from '@/components/forms/KaryawanForm';
import { ROUTES } from '@/constants/routes';

export default function KaryawanTambahPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl">
      <KaryawanForm
        onSuccess={() => router.push(ROUTES.KARYAWAN)}
        onCancel={() => router.push(ROUTES.KARYAWAN)}
      />
    </div>
  );
}
