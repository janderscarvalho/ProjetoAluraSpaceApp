import { useState, useEffect } from "react";
import { styled } from "styled-components";
import Titulo from "../Titulo";
import Tags from "./Tags";
import Populares from "./Populares";
import Imagem from "./Imagem";

const GaleriaContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const SecaoFluida = styled.section`
  flex-grow: 1;
`;

const ImagensContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
`;

const Galeria = ({ fotos = [], setTag,  aoFotoSelecionada, aoAlternarFavorito}) => { // É ADICIONADO SETTAG PARA PASSAR A PROP
    
    // A PROPRIEDADE É PASSADA PARA O ELEMENTO TAGS, PARA QUE ESTES POSSAM CONTROLAR O ESTADO DO FILTRO ATRAVES DO ONCLICK
    return (
        <>
            <Tags setTag={setTag} />             -  
            <GaleriaContainer>
                <SecaoFluida>
                    <Titulo>Navegue pela galeria</Titulo>
                    <ImagensContainer>
                        {fotos.map(foto => <Imagem 
                            
                            key={foto.id} 
                            foto={foto} 
                            aoZoomSolicitado={aoFotoSelecionada}
                            aoAlternarFavorito={aoAlternarFavorito}
                            />)
                        }
                    </ImagensContainer>
                </SecaoFluida>
                <Populares />
            </GaleriaContainer>
        </>
    )
}

export default Galeria;
