type CaseStudyPageProps = {
  params: { slug: string };
};

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  return <main data-slug={params.slug} />;
}
