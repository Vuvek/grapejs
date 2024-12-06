import Preview from "../../../components/Preview/preview";

export default async function GeneratePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <Preview pageId={slug} />;
}
