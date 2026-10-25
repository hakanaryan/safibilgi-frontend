const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://safibilgi-backend.onrender.com';

export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    url: string;
    alternativeText?: string;
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover?: {
      data?: StrapiImage;
    };
    category?: {
      data?: Category;
    };
  };
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/categories?populate=*`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export function getStrapiMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
