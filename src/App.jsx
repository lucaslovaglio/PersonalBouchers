import React from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import './App.css';
import logo from './personal-color.png';
import logo2 from './acceso-combos-desk.png';

function App() {
  const [codes, setCodes] = React.useState(['', '', '', '', '']);
  const [isValid, setIsValid] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRefs = React.useRef([]);

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    if (/\D/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;

    setCodes(newCodes);

    if (value !== '' && index < codes.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleValidation = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (codes.every(code => code !== '')) {
        setIsValid(true);
      }
    }, 2000);
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />

      <div className="box">
        <h2>Validar un Código de Personal:</h2>
        {!isValid && !isLoading ? (
          <div className="code-inputs">
            <div className="codeBox">
              {codes.map((code, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={code}
                  onChange={(e) => handleInputChange(index, e)}
                  maxLength={1}
                  className="code-input"
                  placeholder=""
                  variant="outlined"
                  size="small"
                />
              ))}
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleValidation}
              disabled={isLoading}
              endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              Validar
            </Button>
          </div>
        ) : isLoading ? (
          <div className="loader">
            <CircularProgress size={50} color="primary"  sx={{margin: '50px'}}/>
          </div>
        ) : (
          <div className='successBox'>
            <p>
              <b>Cupón Válido</b><br></br>
              Gracias por Validar el Descuento de Personal!
            </p>
          </div>
        )}
      </div>
      <img src={logo2} alt="Logo2" className="tipo" />
    </div>
  );
}

export default App;
