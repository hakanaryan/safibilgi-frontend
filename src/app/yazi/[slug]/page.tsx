import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchArticleBySlug, getStrapiMediaUrl } from '@/lib/strapi';
import { ArrowLeft, Clock } from 'lucide-react';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await fetchArticleBySlug(params.slug);
  if (!article) {
    return { title: 'Yazı Bulunamadı | Safi Bilgi' };
  }

  return {
    title: `${article.attributes.title} | Safi Bilgi`,
    description: article.attributes.description || article.attributes.title,
    openGraph: {
      title: article.attributes.title,
      description: article.attributes.description,
      type: 'article',
      publishedTime: article.attributes.publishedAt,
    },
  };
}

export const revalidate = 60;

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = await fetchArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const coverUrl = getStrapiMediaUrl(article.attributes.cover?.data?.attributes?.url);
  const categoryName = article.attributes.category?.data?.attributes?.name;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Tüm Yazılara Dön
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4">
        {categoryName && (
          <span className="inline-block text-xs font-semibold text-amber-400 uppercase tracking-wider">
            {categoryName}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          {article.attributes.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {article.attributes.publishedAt
                ? new Date(article.attributes.publishedAt).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Taslak'}
            </span>
          </div>
          <span>•</span>
          <span>Safi Bilgi Editör Ekibi</span>
        </div>
      </header>

      {/* Cover Image */}
      {coverUrl && (
        <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-800 border border-slate-800 shadow-2xl">
          <img
            src={coverUrl}
            alt={article.attributes.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Description / Summary lead */}
      {article.attributes.description && (
        <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1">
          {article.attributes.description}
        </p>
      )}

      {/* Main Content */}
      <div className="prose prose-invert prose-amber max-w-none text-slate-300 leading-relaxed text-base sm:text-lg space-y-4 whitespace-pre-wrap">
        {article.attributes.content}
      </div>
    </article>
  );
}
