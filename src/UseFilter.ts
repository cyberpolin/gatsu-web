// useFilter.ts
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';
import { ClientType } from './UseClients';

export const useFilter = ({
  data,
  searchTerm,
}: {
  data: ClientType[];
  searchTerm: string;
}) => {
  const options = {
    keys: ['phone', 'name'],
    threshold: 0.3, // lower is stricter, higher is more lenient
    includeScore: true,
  };

  const fuse = new Fuse(data, options);

  return { fuseSearch: fuse.search(searchTerm) };
};
