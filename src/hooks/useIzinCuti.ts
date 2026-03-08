import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/fetcher';
import { IzinCuti } from '@/types/izinCuti.types';

export const useIzinCuti = () => {
  const [data, setData] = useState<IzinCuti[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetcher<IzinCuti[]>('/api/izin-cuti');
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

  const ajukanIzin = async (payload: Partial<IzinCuti>) => {
    const res = await fetcher('/api/izin-cuti', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    fetchData();
    return res;
  };

  const updateStatus = async (id: number, status: string) => {
    const res = await fetcher(`/api/izin-cuti/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    fetchData();
    return res;
  };

  return { data, loading, error, refetch: fetchData, ajukanIzin, updateStatus };
};
