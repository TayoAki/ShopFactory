import type { Metadata } from 'next';
import { FitQuiz } from '@/components/FitQuiz';

export const metadata: Metadata = {
  title: 'Find Your Golf Hat — Fit Quiz',
  description: 'Find Bogey Baby hats for your usual fit, how you wear your hair, and your days on the course.',
};
export default function FitQuizPage() {
  return <FitQuiz />;
}
