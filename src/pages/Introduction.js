import logo from './images/logo.png'
import bottomFiller from './images/bottomFiller.png';
import styles from '../index.css';
import { useNavigate } from 'react-router-dom';

const Introduction = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/quiz');
    };

    return (
      <div className='introduction-container'>
        <img src={logo} alt='logo' className='logo' />
        <h1>Perfil de Competencias</h1>
        <p>
          Por favor, complete este cuestionario sobre sus habilidades.
        </p>
        <p>
          Cuanto más honesto sea con sus respuestas, mejor se ajustará el trabajo a usted.
        </p>
        <p>
          Tomará aproximadamente 10 minutos, y puede tomarse el tiempo que necesite.
        </p>       
        <div className='navbar'>
            <div className='container'>
                <button onClick={handleClick}>Empieza</button>
            </div>
        </div>
        <div className="introduction-content">
          <img src={bottomFiller} alt="Bottom Image" className="bottom-image" />
        </div>
      </div>
    );
  }

export default Introduction;