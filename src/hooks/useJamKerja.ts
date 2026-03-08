import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/fetcher';
import { JamKerja } from '@/types/jamKerja.types';

export const useJamKerja = () => {
  const [data, setData] = useState<JamKerja[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetcher<JamKerja[]>('/api/jam-kerja');
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, refetch: fetchData };
};
