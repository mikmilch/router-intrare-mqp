import logo from './images/logo.png'
import resultsExample from './Results Example.jpeg';
import bottomFiller from './images/bottomFiller.png';
import styles from '../index.css';
import { useNavigate } from 'react-router-dom';

const Results = () => {
    const navigate = useNavigate();
    const handleHomeButtonClick = () => {
        navigate('/intro');
    };

    return (
      <body>
        <homebutton onClick={handleHomeButtonClick}>X</homebutton>
        <main>
          <div className='container'>
            <img src={logo} alt='logo' className='logo' />
            <h1> </h1>
            <h1>Perfil de Competencias</h1>
            <h1>Resultados</h1>
            <h1>En Progreso</h1>
            </div>
        </main>
        </body>
    );
  }

export default Results;