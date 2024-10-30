import React, { MouseEventHandler } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import empleadoImg from './assets/img/maxresdefault.jpg';
import { img, cardContainer, cardDescription } from './assets/css/attendancetheme';
import { cssDefaults } from './assets/css/theme';


const Home = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  //Evento para regresar a la pagina de inicio
  const navigate = useNavigate(); 

  const navigateToHome = () =>{
      navigate('/');
  }

  return (
    <div style={{...cssDefaults as React.CSSProperties}}>
        <h1 style={{...cardContainer.h1}}>Mi portal</h1>
        <div style={{...cardContainer as React.CSSProperties}}> 
            <div><button onClick={navigateToHome} style={{...cardContainer.salir as React.CSSProperties}}>x</button></div>
            <img src={empleadoImg} style={{ ...img.avatarImg }} alt="empleado" />
            <h1 style={{...cssDefaults  as React.CSSProperties}}>Hola <span style={{...cardContainer.nombreEmpleado}}>Empleadx</span></h1>
            <h2 style={{...cssDefaults  as React.CSSProperties}}>del area de: <span>Sistemas</span></h2>
            {formData && 
                <div style={{...cardDescription  as React.CSSProperties}}>
                    <p style={{...cssDefaults  as React.CSSProperties}}>Registro de asistencia del ID: {JSON.stringify(formData.employeeId)}</p>
                    <p style={{...cssDefaults  as React.CSSProperties}}>Asistencia: {JSON.stringify(formData.date)}</p>
                    <p style={{...cssDefaults  as React.CSSProperties}}>Hora: {JSON.stringify(formData.currentTime)}</p>
                </div>
            }
            <div style={{...cardContainer.sectionContainer}}>
                <div>
                    <h2>Tareas pendientes:</h2>
                    <ul>
                        <li>Revisar el código de la aplicación</li>
                        <li>Revisar los issues</li>
                        <li>Revisar el tablero de proyectos</li>
                    </ul>
                </div>
                <div>
                    <h2>Notificaciones:</h2>
                    <ul>
                        <li>Tu solicitud de vacaciones ha sido aprobada</li>
                    </ul>
                </div>
            </div>
        </div>
        <button onClick={navigateToHome} style={{...cardContainer.salir as React.CSSProperties}}>Salir</button>
    </div>
);
};

export default Home;