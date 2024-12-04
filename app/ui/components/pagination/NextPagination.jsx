"use client";

import FormatQuery from '@/app/lib/FormatQuery';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';

export default function NextPagination({ searchParams, ...props }) {
  return (
    <Pagination
      {...props}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`?${FormatQuery({ ...searchParams, page: item.page }).toString()}`}
          {...item}
        />
      )}
    />
  );
}