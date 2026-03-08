import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/fetcher';
import { Absensi } from '@/types/absensi.types';

export const useAbsensi = () => {
  const [data, setData] = useState<Absensi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetcher<Absensi[]>('/api/absensi');
      setData(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitAbsen = async (payload: { type: 'masuk' | 'pulang'; status_kehadiran?: string; catatan?: string }) => {
    const res = await fetcher('/api/absensi', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    fetchData();
    return res;
  };

  return { data, loading, error, refetch: fetchData, submitAbsen };
};
