import styled from "styled-components";
import Titulo from "../../Titulo";
import fotos from './fotos-populares.json'

const ColunaFotos = styled.li`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Botao = styled.button`
border-radius: 10px;
border: 2px solid var(--Degrad-com-rosa, #C98CF1);
width: 208px;
height: 56px;
flex-shrink: 0;
color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
background-color: transparent;
padding: 2px;
margin-top: 24px;

`


const Imagem = styled.img`
    max-width: 212px;
    
`



const Populares = () => {
  return (
    <section>
      <Titulo $alinhamento="center">Populares</Titulo>

      <ColunaFotos>
      {fotos.map(foto => <Imagem key={foto.id} src={foto.path} alt={foto.alt}/>)}
            </ColunaFotos>
      <Botao>Ver mais</Botao>
    </section>
  );
};

export default Populares;
