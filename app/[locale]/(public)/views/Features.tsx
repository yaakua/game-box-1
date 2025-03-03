import { getTranslations } from 'next-intl/server';

export default async function Features({pageName}:{pageName:string|null|undefined}) {
  const prefix = pageName ? pageName + '.' : '';
  const t = await getTranslations(`${prefix}HomeFeatures`);
  const screenshot_prefix = pageName ? '/games/' + pageName : '';
  const game_screenshot_path = `${screenshot_prefix}/game_screenshot.webp`;
  return (
    <>
      <h2 className="text-xl md:text-5xl font-bold text-left mb-4 md:mb-8 text-feature-title font-leckerli">{t('gameTitle')}</h2>

      <div className="flex flex-row mb-4 md:mb-8 items-center">
        <section className="flex-1 pr-4 md:pr-8">
          <h2 className="text-lg md:text-3xl font-semibold mb-2 md:mb-4 text-feature-title font-leckerli">{t('whatIsTitle')}</h2>
          <p className="text-sm md:text-base text-feature-description">{t('whatIsDescription')}</p>
        </section>
        <div className="flex-shrink-0 w-1/3">
          <div className="bg-feature-card rounded-2xl p-1">
            <div className="h-[150px] md:h-[250px] overflow-hidden rounded-xl">
              <img
                src={game_screenshot_path}
                alt="Game screenshot"
                className="w-full h-full object-cover object-top rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="mb-4 md:mb-8">
        <h2 className="text-lg md:text-3xl font-semibold mb-2 md:mb-4 text-feature-title font-leckerli">{t('howToPlayTitle')}</h2>
        <ul className="list-disc pl-4 md:pl-6 space-y-1 md:space-y-2 text-sm md:text-base text-feature-description">
          <li>{t('howToPlayStep1')}</li>
          <li>{t('howToPlayStep2')}</li>
          <li>{t('howToPlayStep3')}</li>
        </ul>
      </section>
      <section className="mb-4 md:mb-8">
        <h2 className="text-lg md:text-3xl font-semibold mb-2 md:mb-4 text-feature-title font-leckerli">
          {t('keyFeaturesTitle')}
        </h2>
        <ul className="grid grid-cols-2 gap-2 md:gap-4">
          {['feature1', 'feature2', 'feature3', 'feature4'].map((feature, index) => (
            <li key={index} className="bg-feature-card hover:bg-feature-card-hover transition-colors p-2 md:p-4 rounded-lg">
              <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2 text-feature-title">{t(`${feature}Title`)}</h3>
              <p className="text-xs md:text-base text-feature-description">{t(`${feature}Description`)}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
