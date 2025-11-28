import { redirect } from 'next/navigation';

interface LocaleRootPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleRootPage({ params }: LocaleRootPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/home`);
}