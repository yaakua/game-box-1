import { Spinner } from '@nextui-org/spinner';
import { useTranslations } from 'next-intl';
export default function Loading() {
  const t = useTranslations('Loading');
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <Spinner color="primary"  labelColor="primary" label={t('title')} size="lg" />
    </div>
  );
}
