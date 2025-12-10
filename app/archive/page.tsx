import { getPostsByYear, getAllPosts } from '@/lib/posts';
import { Archive, Calendar, Hash } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function ArchivePage() {
  const postsByYear = getPostsByYear();
  const allPosts = getAllPosts();
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  // Get month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Group posts by month within each year
  const postsByMonthByYear = years.map(year => {
    const yearPosts = postsByYear[year];
    const byMonth: Record<string, typeof yearPosts> = {};
    
    yearPosts.forEach(post => {
      const date = new Date(post.date);
      const month = date.getMonth();
      const monthName = monthNames[month];
      
      if (!byMonth[monthName]) {
        byMonth[monthName] = [];
      }
      byMonth[monthName].push(post);
    });
    
    return { year, byMonth };
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-background-card border border-border">
              <Archive size={24} className="text-accent-blue" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Archive</h1>
              <p className="text-text-secondary mt-2">
                A chronological record of all unsaid thoughts
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Years</span>
              </div>
              <span className="text-2xl font-semibold">{years.length}</span>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Hash size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Thoughts</span>
              </div>
              <span className="text-2xl font-semibold">{allPosts.length}</span>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-text-secondary">First thought</span>
              </div>
              <span className="text-lg font-semibold">
                {allPosts.length > 0 ? new Date(allPosts[allPosts.length - 1].date).getFullYear() : '—'}
              </span>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-text-secondary">Latest thought</span>
              </div>
              <span className="text-lg font-semibold">
                {allPosts.length > 0 ? new Date(allPosts[0].date).getFullYear() : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {postsByMonthByYear.map(({ year, byMonth }) => (
            <div key={year} className="relative">
              {/* Year header */}
              <div className="sticky top-20 z-10 mb-8">
                <div className="inline-flex items-center gap-3 bg-background-primary px-4 py-2 rounded-lg border border-border">
                  <div className="w-3 h-3 rounded-full bg-accent-blue" />
                  <h2 className="text-2xl font-bold">{year}</h2>
                  <span className="text-text-secondary text-sm">
                    {postsByYear[year].length} thought{postsByYear[year].length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Months */}
              <div className="ml-6 pl-8 border-l border-border">
                {Object.entries(byMonth).map(([month, posts]) => (
                  <div key={month} className="mb-10 last:mb-0 relative">
                    {/* Month dot */}
                    <div className="absolute -left-[33px] top-1 w-3 h-3 rounded-full bg-background-card border-2 border-accent-hover" />
                    
                    {/* Month header */}
                    <h3 className="text-xl font-semibold mb-4">
                      {month}
                      <span className="text-text-secondary text-sm font-normal ml-2">
                        ({posts.length})
                      </span>
                    </h3>

                    {/* Posts */}
                    <div className="space-y-4">
                      {posts.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/thoughts/${post.slug}`}
                          className="block card p-4 hover:border-accent-hover transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h4 className="font-medium hover:text-accent-blue transition-colors">
                                {post.title}
                              </h4>
                              {post.excerpt && (
                                <p className="text-text-secondary text-sm mt-1 line-clamp-1">
                                  {post.excerpt}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-text-secondary">
                              <time>{formatDate(post.date)}</time>
                              <span>{post.readingTime}</span>
                            </div>
                          </div>
                          
                          {/* Tags */}
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {post.tags.slice(0, 2).map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-xs rounded-full bg-background-secondary"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-background-secondary">
                                  +{post.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {years.length === 0 && (
            <div className="card text-center py-16">
              <Archive size={64} className="mx-auto mb-6 text-text-secondary opacity-50" />
              <h2 className="text-2xl font-semibold mb-3">Archive empty</h2>
              <p className="text-text-secondary max-w-md mx-auto">
                The timeline begins with your first thought. Write something to start the record.
              </p>
            </div>
          )}
        </div>

        {/* Stats footer */}
        {years.length > 0 && (
          <div className="mt-12 card">
            <h3 className="text-lg font-semibold mb-4">Archive Statistics</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-text-secondary mb-2">Thoughts per Year</h4>
                <div className="space-y-2">
                  {years.map(year => {
                    const count = postsByYear[year].length;
                    const percentage = (count / allPosts.length) * 100;
                    return (
                      <div key={year} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{year}</span>
                          <span>{count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="h-1.5 bg-background-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent-blue rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-text-secondary mb-2">Monthly Distribution</h4>
                <div className="grid grid-cols-3 gap-3">
                  {monthNames.map(month => {
                    const count = allPosts.filter(post => 
                      monthNames[new Date(post.date).getMonth()] === month
                    ).length;
                    return (
                      <div key={month} className="text-center p-3 rounded-lg bg-background-secondary">
                        <div className="text-lg font-semibold">{count}</div>
                        <div className="text-xs text-text-secondary truncate">{month.slice(0, 3)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}