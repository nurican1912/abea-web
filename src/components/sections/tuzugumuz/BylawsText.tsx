import type { BylawsArticle, BylawsBlock } from '@/types/content';

/** "Çağrı Usulü: Yönetim Kurulu…" → kalın "Çağrı Usulü:" + metin */
const LEAD = /^([^:.]{2,60}):\s([\s\S]+)$/;

function Block({ block }: { block: BylawsBlock }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>;
    case 'h':
      return <h3 className="pt-3 font-semibold">{block.text}</h3>;
    case 'item': {
      const lead = LEAD.exec(block.text);
      return (
        <div className="grid grid-cols-[3.25rem_1fr] gap-2">
          <span className="font-semibold text-primary tabular-nums">{block.label}</span>
          <p>
            {lead ? (
              <>
                <strong className="font-semibold">{lead[1]}:</strong> {lead[2]}
              </>
            ) : (
              block.text
            )}
          </p>
        </div>
      );
    }
    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-[0.9375rem]">
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col" className="border border-line bg-surface-soft px-4 py-2 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, i) => (
                    <td key={i} className="border border-line px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** Tüzüğün maddeleri — her madde kendi bağlantısıyla (#madde-12) açılabilir. */
export function BylawsText({ articles, closing }: { articles: BylawsArticle[]; closing: string }) {
  return (
    // Tüzük yalnızca Türkçe: İngilizce sayfada da ekran okuyucular Türkçe okusun.
    <div lang="tr" className="max-w-[72ch]">
      {articles.map((article) => (
        <article
          key={article.id}
          id={article.id}
          aria-labelledby={`${article.id}-title`}
          className="scroll-mt-6 border-t border-line pt-8 pb-2 first:border-t-0 first:pt-0 [&+&]:mt-8"
        >
          <h2 id={`${article.id}-title`} className="font-display text-2xl leading-tight font-semibold text-balance">
            <span className="block text-sm tracking-[0.12em] text-primary uppercase">{article.label}</span>
            {article.title}
          </h2>
          <div className="mt-4 space-y-3 text-ink/85">
            {article.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>
      ))}
      <p className="mt-10 border-t border-line pt-6 font-semibold">{closing}</p>
    </div>
  );
}
