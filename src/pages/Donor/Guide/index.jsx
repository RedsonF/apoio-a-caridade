import React from 'react';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';

import styles from './styles.module.css';

const Guide = () => (
  <AnimatedPage>
    <Header title="Guia" path="/donor/options" />
    <div className="tightContent">
      <div className={styles.instituition}>
        <p className={styles.name}>Entidades beneficentes</p>
        <p className={styles.description}>
          São instituições que prestam serviços relevantes à sociedade,
          notadamente à parte mais carente, que podem ser em áreas como:
          assistência social, saúde, educação, espiritual, família, maternidade,
          a portadores de deficiência, inclusão no mercado de trabalho, entre
          outras.
        </p>
      </div>
      <div className={styles.instituition}>
        <p className={styles.name}>Fundações</p>
        <p className={styles.description}>
          São instituições mais ligadas à captação de recursos. As fundações
          visam alcançar determinado fim de interesse público ou social, atuando
          em áreas científica, social ou cultural.
        </p>
      </div>
      <div className={styles.instituition}>
        <p className={styles.name}>Institutos</p>
        <p className={styles.description}>
          São instituições dedicadas ao estudo ou à pesquisa de caráter
          especializado, mais ligadas à pesquisa científica para qualificar
          tecnologicamente a população.
        </p>
      </div>
      <div className={styles.instituition}>
        <p className={styles.name}>ONGs</p>
        <p className={styles.description}>
          São instituições que atuam em diversas áreas, tais como saúde,
          trabalho, educação, cidadania. Sempre visando o bem-estar de pessoas,
          animais, comunidades e da sociedade.
        </p>
      </div>
    </div>
  </AnimatedPage>
);

export default Guide;
