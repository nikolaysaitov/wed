import Header from '../../components-ui/header/Header.tsx';
import { MainSection } from '@components/main/MainSection.tsx';
import { DescriptionSection } from '@components/description/DescriptionSection.tsx';
import { AdvantagesSection } from '@components/advantages/AdvantagesSection.tsx';
import { InstructionSection } from '@components/instruction/InstructionSection.tsx';
import { FeedbackSection } from '@components/feedback/FeedbackSection.tsx';
import { PriceSection } from '@components/price/PriceSection.tsx';
import { FaqSection } from '@components/faq/FaqSection.tsx';
import { Footer } from '@ui/footer/Footer.tsx';
import styles from './LandingPage.module.scss';

export function LandingPage() {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <MainSection />
        <DescriptionSection />
        <AdvantagesSection />
        <InstructionSection />
        <FeedbackSection />
        <PriceSection />
        <FaqSection />
        <Footer />
      </div>
    </>
  );
}
