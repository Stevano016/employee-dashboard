'use client';

import { useKaryawan } from '@/hooks/useKaryawan';
import { KaryawanTable } from '@/components/features/karyawan/KaryawanTable';

export default function KaryawanPage() {
  const { data, loading } = useKaryawan();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Karyawan</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Tambah Karyawan
        </button>
      </div>
      {loading ? <div>Loading...</div> : <KaryawanTable data={data} />}
    </div>
  );
}
