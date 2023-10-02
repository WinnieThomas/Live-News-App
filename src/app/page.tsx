import React from 'react'
import { categories } from '../../constants';
import fetchNews from '@/lib/fetchNews';

async function page() {
  const news:NewsResponse = await fetchNews(categories.join(','));
  return (
    <div>HomePage</div>
  )
}

export default page