import Link from 'next/link';
import { fetchArticles, fetchCategories, getStrapiMediaUrl } from '@/lib/strapi';
import { Clock, BookOpen, ChevronRight, Sparkles } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const [articles, categories] = await Promise.all([
    fetchArticles(),
    fetchCategories(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Temiz & Güvenilir İçerikler
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Bilginin En <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Safi</span> ve Net Hali.
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          Gereksiz detaylar ve kafa karıştırıcı kalabalıklardan uzak; doğrudan öğrenmek istediğiniz konulara odaklanan bağımsız bilgi rehberi.
        </p>

        {/* Categories Bar */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700 hover:border-amber-500/50 hover:text-amber-300 transition-colors cursor-pointer"
              >
                {cat.attributes.name}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Articles Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            Son Yazılar
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {articles.length} makale
          </span>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">Henüz yayınlanmış yazı bulunmuyor</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Strapi panelinizden (<span className="text-amber-400">Content Manager &gt; Article &gt; Create new entry</span>) ilk yazınızı oluşturup <strong>Publish</strong> butonuna basabilirsiniz!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => {
              const coverUrl = getStrapiMediaUrl(article.attributes.cover?.data?.attributes?.url);
              const categoryName = article.attributes.category?.data?.attributes?.name;

              return (
                <article
                  key={article.id}
                  className="group rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition-all duration-300 flex flex-col"
                >
                  {coverUrl && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-800">
                      <img
                        src={coverUrl}
                        alt={article.attributes.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {categoryName && (
                        <span className="inline-block text-xs font-semibold text-amber-400 uppercase tracking-wider">
                          {categoryName}
                        </span>
                      )}

                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                        <Link href={`/yazi/${article.attributes.slug}`}>
                          {article.attributes.title}
                        </Link>
                      </h3>

                      {article.attributes.description && (
                        <p className="text-sm text-slate-400 line-clamp-3">
                          {article.attributes.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {article.attributes.publishedAt
                            ? new Date(article.attributes.publishedAt).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'Yeni'}
                        </span>
                      </div>

                      <Link
                        href={`/yazi/${article.attributes.slug}`}
                        className="inline-flex items-center gap-1 text-amber-400 font-medium hover:gap-1.5 transition-all"
                      >
                        Oku <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
