import { useEffect, useState } from "react"
import styled from "styled-components";
import EstilosGlobais from "./components/EstilosGlobais";
import Cabecalho from "./components/Cabecalho";
import BarraLateral from "./components/BarraLateral";
import Banner from "./components/Banner";
import Galeria from "./components/Galeria";
import fotos from './fotos.json';
import ModalDeZoom from "./components/ModaldeZoom";
import bannerBackground from "./assets/banner.png";


const FundoGradiente = styled.div`
  background: linear-gradient(
    175deg,
    #041833 4.16%,
    #04244f 48%,
    #154580 96.76%
  );
  width: 100%;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`;

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`;

const ConteudoGaleria = styled.section `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const App = () => {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos);// CRIANDO E ARMAZENANDO O OBJETO DE FOTOS
  const [filtro, setFiltro] = useState('') //FUNCAO PARA FILTRAR PELO NOME DA IMAGEM
  const [tag, setTag] = useState(0) //ESTADO QUE ARMAZENA A TAG
  const [fotoComZoom, setFotoComZoom] = useState(null)

  useEffect(() => {
    const fotosFiltradas = fotos.filter(foto => { //CRIANDO UM ESTADO DE "FOTOS FILTRADAS"
      const filtroPorTag = !tag || foto.tagId === tag; //REGRA USESTATE DE FILTRO POR TAG UTILIZANDO TAGID(FOI ADICIONADO NO JASON) COMO LASTRO
      const filtroPorTitulo = !filtro || foto.titulo.toLowerCase().includes(filtro.toLowerCase()) // CRIANDO A OPÇÃO DE FILTRO POR NOME OU POR TAG
      return filtroPorTag && filtroPorTitulo
    })

    setFotosDaGaleria(fotosFiltradas); // RESULTADO DO USE EFFECT-
  }, [filtro, tag]); // CRIANDO A OPÇÃO DE FILTRO POR NOME OU POR TAG

  const aoAlternarFavorito = (foto) => {
    if (foto.id === fotoComZoom?.id) {
      setFotoComZoom({
        ...fotoComZoom,
        favorita: !fotoComZoom.favorita
      })
    }
    setFotosDaGaleria(fotosDaGaleria.map(fotoDaGaleria => {
      return {
        ...fotoDaGaleria,
        favorita: fotoDaGaleria.id === foto.id ? !foto.favorita : fotoDaGaleria.favorita
      }
    }))
  }

  return (
    <FundoGradiente>
      <EstilosGlobais />
      <AppContainer>
        <Cabecalho 
        filtro={filtro}//FUNCAO PARA FILTRAR PELO NOME DA IMAGEM
        setFiltro={setFiltro}//FUNCAO PARA FILTRAR PELO NOME DA IMAGEM
        />
        <MainContainer>
          <BarraLateral  />
          <ConteudoGaleria>
          <Banner
            backgroundImage={bannerBackground}
            texto="A galeria mais completa de fotos do espaço!"
          />
          <Galeria 
            fotos={fotosDaGaleria}
            aoFotoSelecionada={foto => setFotoComZoom(foto)} 
            aoAlternarFavorito={aoAlternarFavorito}
            setTag={setTag}// PASSA A PROPRIEDADE TAG PARA O COMPONENTE FILHO PARA REPASSAR A PROP
            
          />
          </ConteudoGaleria>
        </MainContainer>
      </AppContainer>
      <ModalDeZoom 
        foto={fotoComZoom}
        aoFechar={() => setFotoComZoom(null)}
        aoAlternarFavorito={aoAlternarFavorito}
      />
    </FundoGradiente>
  );
}

export default App;
