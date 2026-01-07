import React, { createContext, useContext, useState, ReactNode } from 'react';

type SpiderTheme = 'mcu' | 'tobey' | 'andrew';

interface Villain {
  name: string;
  description: string;
  image: string;
  powers?: string[];
  firstAppearance?: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface SuitSpec {
  id: string;
  title: string;
  description: string;
  top: string;
  left: string;
}

interface ThemeContextType {
  theme: SpiderTheme;
  setTheme: (theme: SpiderTheme) => void;
  accentColor: string;
  heroImage: string;
  title: string;
  tagline: string;
  description: string;
  villains: Villain[];
  timeline: TimelineEvent[];
  suitSpecs: SuitSpec[];
  hudMetrics: {
    pulse: number;
    altitude: number;
    syncRate: number;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<SpiderTheme>('mcu');

  const getThemeData = () => {
    switch (theme) {
      case 'tobey':
        return {
          accentColor: '#7b0d0d',
          heroImage: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
          title: 'Питер Паркер',
          tagline: 'Классическая трилогия',
          description: 'Первый герой, подаривший нам магию полетов на паутине. Тот самый Паук, который научил нас, что с большой силой приходит большая ответственность.',
          villains: [
            { 
              name: 'Зеленый Гоблин', 
              description: 'Норман Озборн, первый и самый опасный враг.', 
              image: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=800&q=80',
              powers: ['Сверхчеловеческая сила', 'Регенерация', 'Высокий интеллект', 'Глайдер и бомбы-тыквы'],
              firstAppearance: 'The Amazing Spider-Man #14 (1964)'
            },
            { 
              name: 'Доктор Октопус', 
              description: 'Отто Октавиус, гений с четырьмя щупальцами.', 
              image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80',
              powers: ['Гениальный интеллект', 'Телепатическое управление щупальцами', 'Механические конечности'],
              firstAppearance: 'The Amazing Spider-Man #3 (1963)'
            },
            { 
              name: 'Веном', 
              description: 'Инопланетный симбиот, жаждущий мести.', 
              image: 'https://cdn.pixabay.com/photo/2024/01/26/15/42/venom-8534168_1280.jpg',
              powers: ['Все способности Человека-паука', 'Смена формы', 'Невидимость для паучьего чутья'],
              firstAppearance: 'The Amazing Spider-Man #300 (1988)'
            },
          ],
          timeline: [
            { year: '2002', title: 'Человек-паук', description: 'Начало пути легендарного героя.' },
            { year: '2004', title: 'Человек-паук 2', description: 'Борьба с Доктором Октопусом.' },
            { year: '2007', title: 'Человек-паук 3', description: 'Столкновение с темной стороной.' },
          ],
          suitSpecs: [
            { id: '1', title: 'Органическая паутина', description: 'Способность выпускать паутину прямо из запястий.', top: '85%', left: '30%' },
            { id: '2', title: 'Классические линзы', description: 'Узнаваемый разрез глаз первого кино-паука.', top: '15%', left: '50%' },
          ],
          hudMetrics: {
            pulse: 72,
            altitude: 45,
            syncRate: 100
          }
        };
      case 'andrew':
        return {
          accentColor: '#1e3a8a',
          heroImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
          title: 'Новый Человек-паук',
          tagline: 'Удивительная история',
          description: 'Питер Паркер, чья история полна тайн прошлого его родителей. Самый быстрый и техничный Паук в Мультивселенной.',
          villains: [
            { 
              name: 'Ящер', 
              description: 'Доктор Коннорс, мечтавший о регенерации.', 
              image: 'https://images.unsplash.com/photo-1501432377862-3d0432b87a14?w=800&q=80',
              powers: ['Сверхчеловеческая сила', 'Регенерация хвоста', 'Управление рептилиями'],
              firstAppearance: 'The Amazing Spider-Man #6 (1963)'
            },
            { 
              name: 'Электро', 
              description: 'Макс Диллон, повелитель электричества.', 
              image: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&q=80',
              powers: ['Генерация электричества', 'Полет по линиям электропередач', 'Электростатическое притяжение'],
              firstAppearance: 'The Amazing Spider-Man #9 (1964)'
            },
            { 
              name: 'Зеленый Гоблин', 
              description: 'Гарри Озборн в поисках исцеления.', 
              image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
              powers: ['Глайдер', 'Высокие технологии', 'Улучшенная сыворотка'],
              firstAppearance: 'The Amazing Spider-Man #31 (1965)'
            },
          ],
          timeline: [
            { year: '2012', title: 'Новый Человек-паук', description: 'Перезагрузка истории.' },
            { year: '2014', title: 'Высокое напряжение', description: 'Битва с Электро.' },
          ],
          suitSpecs: [
            { id: '1', title: 'Высокотехнологичные линзы', description: 'Золотистые линзы с улучшенным обзором.', top: '15%', left: '50%' },
            { id: '2', title: 'Тонкие пускатели', description: 'Компактные механические веб-шутеры.', top: '85%', left: '30%' },
          ],
          hudMetrics: {
            pulse: 88,
            altitude: 120,
            syncRate: 94
          }
        };
      default:
        return {
          accentColor: '#e23636',
          heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
          title: 'Человек-паук: Совершенно новый день',
          tagline: 'В кино: Вторая половина 2026',
          description: 'Новая глава в истории Питера Паркера. Совершенно новый день, совершенно новые вызовы и возвращение к истокам в мире, который забыл, кто под маской героя.',
          villains: [
            { 
              name: 'Стервятник', 
              description: 'Эдриан Тумс, использующий инопланетные технологии.', 
              image: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=800&q=80',
              powers: ['Механические крылья', 'Высокотехнологичный костюм', 'Оружие Читаури'],
              firstAppearance: 'The Amazing Spider-Man #2 (1963)'
            },
            { 
              name: 'Мистерио', 
              description: 'Мастер иллюзий и обмана Квентин Бек.', 
              image: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=800&q=80',
              powers: ['Дроны-иллюзионисты', 'Мастер спецэффектов', 'Тактический гений'],
              firstAppearance: 'The Amazing Spider-Man #13 (1964)'
            },
            { 
              name: 'Крейвен-охотник', 
              description: 'Охотник, ищущий самую ценную добычу.', 
              image: 'https://images.unsplash.com/photo-1501432377862-3d0432b87a14?w=800&q=80',
              powers: ['Мастер рукопашного боя', 'Усиленные чувства', 'Мастерство выслеживания'],
              firstAppearance: 'The Amazing Spider-Man #15 (1964)'
            },
          ],
          timeline: [
            { year: '2017', title: 'Возвращение домой', description: 'Первое сольное приключение в КВМ.' },
            { year: '2019', title: 'Вдали от дома', description: 'Европейские каникулы.' },
            { year: '2021', title: 'Нет пути домой', description: 'Грандиозный финал трилогии.' },
            { year: '2026', title: 'Совершенно новый день', description: 'Начало новой саги о герое.' },
          ],
          suitSpecs: [
            { id: '1', title: 'Нанотехнологии', description: 'Костюм, созданный из нано-частиц Железным человеком.', top: '45%', left: '50%' },
            { id: '2', title: 'ИИ Карен', description: 'Встроенный помощник для анализа угроз.', top: '15%', left: '50%' },
            { id: '3', title: 'Веб-шутеры 3.0', description: 'Мульти-режимные пускатели паутины.', top: '85%', left: '30%' },
          ],
          hudMetrics: {
            pulse: 65,
            altitude: 350,
            syncRate: 98
          }
        };
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, ...getThemeData() }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useSpiderTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useSpiderTheme must be used within ThemeProvider');
  return context;
};
