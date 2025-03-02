import { Section1 } from '@ui/editor/sections/Section1.tsx';
import { Section2 } from '@ui/editor/sections/Section2.tsx';
import { InputSelect } from '@ui/editor/inputs/select/InputSelect.tsx';
import { InputString } from '@ui/editor/inputs/string/InputString.tsx';
import { Schedule } from './Structure/Schedule/Schedule.tsx';
import { createScheduleEvent } from './Structure/Schedule/Schedule.model.ts';
import { Survey } from './Structure/Survey/Survey.tsx';
import { createQuestionCard } from './Structure/Survey/SurveyItem.model.ts';
import { DressCode } from './Structure/DressCode/DressCode.tsx';
import styles from './Aside.module.scss';
import { Location } from '@pages/Editor/DraftPage/Aside/Structure/Location/Location.tsx';

export const Aside = () => {
  return (
    <aside className={styles.aside}>
      <Section1 title={'Дата свадьбы'}>
        <InputString type={'date'} placeholder={'Укажите дату свадьбы'} />
      </Section1>

      <Section1 title={'Выбрать шрифт'}>
        <InputSelect
          defaultValue={'10'}
          options={{
            ['10']: 'Вариант 1 - Классика',
            ['20']: 'Вариант 2 - Романтичный',
            ['30']: 'Вариант 3 - Эклектика'
          }}
          onChange={() => {}}
        />
      </Section1>

      <Section1 title={'Цвет сайта'}>
        <section className={styles.subSection}>
          <p className={styles.subSectionHeader}>Цвет блоков</p>
          <InputString type={'color'} theme={'transparent'} placeholder={'Выбрать'} />
        </section>

        <section className={styles.subSection}>
          <p className={styles.subSectionHeader}>Цвет шрифта</p>
        </section>
      </Section1>

      <Section1 title={'Структура сайта '}>
        <Section2 sectionId={'header'} title={'Главная'} />

        <Section2 sectionId={'info'} title={'Информация'}>
          <p className={styles.subSectionText}>
            Сейчас вы заполняете общее приглашение. Вы можете создать именные приглашения в профиле
            в разделе «Мои приглашения».
          </p>
        </Section2>

        <Location />

        <Section2 sectionId={'timeline'} title={'План дня'}>
          <Schedule items={[createScheduleEvent()]} />
        </Section2>

        <DressCode />

        <Section2 sectionId={'timer'} title={'Таймер'} />
        <Section2 sectionId={'details'} title={'Детали'} />
        <Section2 sectionId={'rsvp'} title={'Обратная связь'} />

        <Survey questions={[createQuestionCard(), createQuestionCard()]} />
      </Section1>
    </aside>
  );
};
