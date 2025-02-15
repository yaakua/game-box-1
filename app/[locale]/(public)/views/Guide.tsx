import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/ui/components/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/components/card';
import { getTranslations } from 'next-intl/server';

type Props = {
  locale: string;
};

export default async function Guide() {
  const t = await getTranslations('HomePage');

  const controlSections = [
    {
      id: 'movement',
      title: t('Guide.movementControlsTitle'),
      controls: ['movementControl1', 'movementControl2'],
    },
    {
      id: 'interaction',
      title: t('Guide.interactionControlsTitle'),
      controls: ['interactionControl1', 'interactionControl2', 'interactionControl3'],
    },
    {
      id: 'combat',
      title: t('Guide.combatControlsTitle'),
      controls: ['combatControl1', 'combatControl2', 'combatControl3', 'combatControl4'],
    },
    {
      id: 'misc',
      title: t('Guide.miscControlsTitle'),
      controls: ['miscControl1', 'miscControl2', 'miscControl3'],
    },
  ];

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-semibold text-warning font-leckerli">
          {t('Guide.controlsTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {controlSections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-2xl text-secondary font-leckerli">{section.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  {section.controls.map((control) => (
                    <li key={control}>{t(control)}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
