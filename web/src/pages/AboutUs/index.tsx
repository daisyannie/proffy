import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//import LandingHeader from '../../components/LandingHeader';
import PageHeader from '../../components/PageHeader';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';

import api from '../../services/api';

import './styles.css';

function AboutUs(){

    const [totalConnections, setTotalConnections] = useState(0);
    
    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            
            setTotalConnections(total);
        });
    }, [])

    return (
        <div id="page-aboutus-header">
            <PageHeader
                title="Nossa missão"
                description="Alunos precisando de ajuda com as aulas on-line. Professores precisando de uma renda extra. E a nossa missão? Ajudá-los a se encontrar."
            />
            <div id="page-aboutus" className="container">
                <main>  
                    <fieldset>
                        <legend>
                            Quer compartilhar seus conhecimentos com outros e ainda conseguir uma renda extra?
                        </legend>
                        <p>
                        Acesse o menu Dar Aulas, preencha um cadastro simples e aguarde pelo seu whatsapp as oportunidades aparecerem.
                        </p>
                    </fieldset> 

                    <fieldset>
                        <legend>Precisa de ajuda com alguma matéria nos estudos online?</legend>
                        <p>
                        Acesse o menu Dar Aulas, preencha um cadastro simples e aguarde pelo seu whatsapp as oportunidades aparecerem.
                        </p>
                    </fieldset>
                    <footer>
                        <div className="buttons-aboutus-container">
                            <button id="buttonStudy" className="study-button">
                                <Link to="/study">
                                    <img src={studyIcon} alt="Estudar"/>
                                    Estudar
                                </Link>                   
                            </button>
                            <button className="give-classes-button">
                                <Link to="/give-classes">
                                    <img src={giveClassesIcon} alt="Dar aulas"/>
                                    Dar Aulas
                                </Link>                   
                            </button>  
                        </div>                     
                    </footer>
                </main>                              
            </div>
        </div>
    )
}

export default AboutUs;