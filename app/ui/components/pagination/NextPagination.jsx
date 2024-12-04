"use client";

import FormatQuery from '@/app/lib/FormatQuery';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';

export default function NextPagination({ searchParams, count, ...props }) {
  return (
    <Pagination
      page={searchParams.p}
      count={count}
      {...props}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`?${FormatQuery({ ...searchParams, p: item.page }).toString()}`}
          {...item}
        />
      )}
    />
  );
}