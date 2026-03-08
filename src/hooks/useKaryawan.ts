import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/fetcher';
import { Karyawan } from '@/types/karyawan.types';

export const useKaryawan = () => {
  const [data, setData] = useState<Karyawan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetcher<Karyawan[]>('/api/karyawan');
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

  const createKaryawan = async (payload: any) => {
    const res = await fetcher('/api/karyawan', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    fetchData();
    return res;
  };

  const updateKaryawan = async (id: number, payload: any) => {
    const res = await fetcher(`/api/karyawan/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    fetchData();
    return res;
  };

  return { data, loading, error, refetch: fetchData, createKaryawan, updateKaryawan };
};
