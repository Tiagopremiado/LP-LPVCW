export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  icon: 'briefing' | 'concept' | 'rv_bg' | 'ip' | 'implementation';
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01',
    title: 'Briefing',
    description: 'Defina o objetivo, público e proposta de valor.',
    icon: 'briefing',
  },
  {
    number: '02',
    title: 'Concept Hero',
    description: 'Direção visual que estabelece o tom da página.',
    icon: 'concept',
  },
  {
    number: '03',
    title: 'RV + BG',
    description: 'Reforce a narrativa com recursos visuais e background.',
    icon: 'rv_bg',
  },
  {
    number: '04',
    title: 'IP',
    description: 'Desenvolva as seções com clareza e consistência.',
    icon: 'ip',
  },
  {
    number: '05',
    title: 'Implementação',
    description: 'Una tudo em uma página de alto impacto.',
    icon: 'implementation',
  },
];
