import fetch from '../fetch';
import { useEffect, useState } from 'react';
import { Project } from './UseProjects';
import { set } from 'react-datepicker/dist/date_utils';

type Entry = {
  id?: string;
  notes?: string;
  projectId: string;
  project?: Project;
  hours: number;
  task: string;
  date?: Date | null | undefined;
};

type Hours = {
  id: string;
  name: string;
  hours: number;
};

const useEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [hours, setHours] = useState<Hours[]>([]);
  const [projectsTasks, setProjectsTasks] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    try {
      const { data } = await fetch.get('/tasks');

      setEntries(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getEntry = async (id: string) => {
    const { data } = await fetch.get(`/tasks/${id}`);
    return data;
  };

  const addEntry = async (entry: Entry, cb?: () => void) => {
    try {
      await fetch.post('/tasks', entry);
      cb && cb();
      getEntries();
    } catch (error) {
      console.error(error);
    }
  };

  const updateEntry = async (id: string, entry: Entry) => {
    await fetch.put(`/tasks/${id}`, entry);
    getEntries();
  };

  const deleteEntry = async (id: string) => {
    await fetch.delete(`/tasks/${id}`);
    getEntries();
  };

  const getEntriesHours = async ({ from, to }: { from?: Date; to?: Date }) => {
    const fromDate = from?.toISOString();
    const toDate = to?.toISOString();
    setIsLoading(true);

    let url = `/tasks/projects`;
    from && to && (url += `?fromDate=${fromDate}&toDate=${toDate}`);
    const hours = await fetch.get(url);
    setHours(hours.data);
    setIsLoading(false);
    return hours.data;
  };

  const getProjectsTasks = async ({
    id,
    from,
    to,
  }: {
    id: string;
    from: Date;
    to: Date;
  }) => {
    const fromDate = from.toISOString();
    const toDate = to.toISOString();
    setIsLoading(true);
    try {
      const { data } = await fetch.get(
        `/tasks/project/${id}?fromDate=${fromDate}&toDate=${toDate}`,
      );

      setProjectsTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    entries,
    hours,
    projectsTasks,
    isLoading,
    getEntries,
    getEntriesHours,
    getProjectsTasks,
    getEntry,
    addEntry,
    updateEntry,
    deleteEntry,
  };
};

export default useEntries;
