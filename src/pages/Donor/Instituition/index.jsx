/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import Swal from 'sweetalert2';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Button from 'components/Button';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PublicationList from 'components/PublicationsList';
import ImageIcon from '@mui/icons-material/Image';
import Modal from './Modal';

import styles from './styles.module.css';

const about = `
O Viva Rio nasceu em 1993 num movimento pela contenção da violência e pela recuperação da cidade. Surgiu em momento propício, do fim da Guerra Fria, do desabrochar das democracias na América Latina e na Europa do Leste, do controle sobre a inflação brasileira, de afirmação da cidadania.  Gravou no nome um estilo otimista, meio romântico radical, que busca soluções para os problemas, curte o morro e o asfalto, protesta sem atrapalhar o trânsito e faz de tudo para não perder o humor. Ainda hoje, vez por outra, vem a público com este jeito de fazer.

Foi concebido de modo quase casual, fruto de um encontro improvável entre lideranças dos vários cantos da cidade. Pessoas significativas da indústria e do comércio, da mídia e da publicidade, da cultura e dos esportes, das favelas e dos sindicatos de trabalhadores reuniram-se para encarar a crise do Rio. O convite veio pelo telefone na voz de Betinho, com o apoio dos donos de O Dia, Jornal do Brasil e Organizações Globo. Convite como este não se recusa, mas as pessoas fundadoras foram além. Perseveraram até criar o novo movimento.

Ainda que bem articulado na sociedade, o Viva Rio tomou uma direção peculiar, de certa forma inesperada. Definiu-se como organização sem fins lucrativos e optou pelo trabalho no interior das comunidades mais vulneráveis, aquelas que são expostas à pobreza, aos poderes paralelos e à violência armada. Foi assim já nos primeiros projetos, como a Casa da Paz em Vigário Geral, a Fábrica de Esperança em Acari, o Balcão de Direitos na Rocinha e na Maré, todos de 1994. Forjou uma estratégia duradoura: falar à sociedade global através da grande mídia, mas com os pés plantados nos territórios e as mãos ativas em situações de risco.

A escala e a velocidade do crescimento transformaram o Viva Rio. Conserva os valores originais, preserva o estilo e o público alvo. O espírito está lá, firme, forte e brincalhão, mas o corpo já não é o mesmo, ganhou musculatura. Não é mais um “movimento” e, a rigor, já não lhe cabe a qualificação de uma “ONG”. O pessoal engajado e a logística implicada são de grande porte, impensáveis há vinte anos. O Viva Rio é melhor pensado hoje como uma “empresa social”, sempre sem fins lucrativos, mas com as obrigações de eficácia, eficiência e transparência que são exigidas das empresas líderes no mercado.
`;

const Instituition = () => {
  const { id } = useParams();
  const [institution, setInstitution] = useState({});
  const [publications, setPublications] = useState([]);
  const [mode, setMode] = useState('about');
  const [donateModal, setDonateModal] = useState(false);
  const [donationData, setDonationData] = useState({});
  const { name, description, location, coverImage, logoImage } = institution;

  useEffect(async () => {
    try {
      const { data } = await api.get(`/institution/${id}`);
      const { institution: newInstitution, publications: newPublications } =
        data;
      setInstitution(newInstitution);
      setDonationData(newInstitution.donationData);
      setPublications(newPublications);
    } catch (err) {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: msg,
      });
    }
  }, [mode]);

  const changeDonateModal = () => {
    setDonateModal(!donateModal);
  };

  return (
    <AnimatedPage>
      <Modal
        donateModal={donateModal}
        changeDonateModal={changeDonateModal}
        donationData={donationData}
        logoImage={logoImage}
        name={name}
      />
      <Header title="Instituição" path="/donor/home" />
      <div className="content">
        <div className={styles.img}>
          <img alt="imagem" src={coverImage} />
          <div className={styles.avatar}>
            <img alt="imagem" src={logoImage} />
          </div>
        </div>
        <div style={{ marginTop: 15 }}>
          <p className={styles.title}>{name}</p>
          <p>
            {location?.address} - {location?.city} - {location?.state}
          </p>
        </div>
        <div className={styles.button}>
          <Button
            onClick={() => changeDonateModal()}
            small
            icon={<FavoriteRoundedIcon style={{ fontSize: 16 }} />}
          >
            quero doar
          </Button>
        </div>
        <div className={styles.options}>
          <div
            onClick={() => setMode('about')}
            className={mode === 'about' ? styles.aboutActive : styles.about}
          >
            <p>Sobre</p>
          </div>
          <div
            onClick={() => setMode('pub')}
            className={mode === 'pub' ? styles.pubActive : styles.pub}
          >
            <p>Publicações</p>
          </div>
        </div>
        {mode === 'about' ? (
          <div className={styles.display}>
            <p>{description}</p>
          </div>
        ) : (
          <PublicationList publications={publications} />
        )}
      </div>
    </AnimatedPage>
  );
};

export default Instituition;
