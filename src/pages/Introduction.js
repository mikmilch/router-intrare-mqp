import logo from './logo.png'
import bottomFiller from './bottomFiller.png';
import styles from '../index.css';
import { useNavigate } from 'react-router-dom';

const Introduction = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/quiz');
    };

    return (
      <body>
        <main>
          <div className='container'>
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
            <img src={bottomFiller} alt="Bottom Image" className="bottom-image" />         
          </div>
        </main>
        <navbar>
            <div className='container'>
                <button onClick={handleClick}>Empieza</button>
            </div>
        </navbar>
      </body>
    );
  }

export default Introduction;