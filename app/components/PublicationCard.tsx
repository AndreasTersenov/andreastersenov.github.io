export type Pub = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  tags?: string[];
  thumb?: string | null;
  flag?: string;
  topic?: string;
};

export default function PublicationCard({ pub }: { pub: Pub }) {
  return (
    <article className="pub" data-reveal>
      <div className="thumb">
        {pub.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pub.thumb} alt="" />
        ) : null}
      </div>
      <div>
        <h3 className="title">{pub.title}</h3>
        <p className="authors">{pub.authors}</p>
        <p className="meta">
          <em>{pub.venue}</em> · {pub.year}
          {pub.tags ? ` · ${pub.tags.join(" · ")}` : ""}
        </p>
      </div>
      <div className="actions">
        {pub.flag && <span className="badge-coral">{pub.flag}</span>}
        <span className="pub-link">arXiv ↗</span>
        <span className="pub-link">BibTeX</span>
      </div>
    </article>
  );
}
