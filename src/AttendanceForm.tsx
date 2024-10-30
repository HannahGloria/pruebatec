import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoApymsa from "./assets/img/logoApymsa.png";
import { colors, typography } from './assets/css/theme';
import { btn, img, formAttendance, inputForm} from './assets/css/attendancetheme';

type MouseEvent = React.MouseEvent<HTMLButtonElement>

//Validacion que exporto para Jest, igual valida aca que tenga un ID de empleado
export const validateForm = (formData: { employeeId: string }) => {
  let errors = { employeeId: "" };
  if (!formData.employeeId) {
    errors.employeeId = "El ID del empleado es obligatorio";
  }
  return errors.employeeId;
};

const AttendanceForm = () => {
  
  let currentTime = new Date().toLocaleTimeString();
  let currentDate = new Date().toLocaleDateString();

  // Estado para los valores del formulario
  const [formData, setFormData] = useState({
    employeeId: "",
    date: currentDate,
    currentTime: currentTime,
  });

  // Estado para mostrar el botón de recargar
  const [showBtn, setShowBtn] = useState(false);

  const navigate = useNavigate(); 

  // Manejar el cambio en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //* Generalmente con los event handlers debemos de usar: e.currentTarget.value
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // //Evento para recargar la pagina en un click
  // const reloadPage = (e: MouseEvent) => {
  //   window.location.reload();
  // };


  // Manejo del submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(validateForm({ employeeId: formData.employeeId}) !== ""){
      <div>
        <p>El ID del empleado es obligatorio</p>
      </div>
      return;
    }else{
      // Aquí enviar los datos al backend
      //document.getElementById("root")!.innerHTML = "Registro de asistencia de: " + JSON.stringify(formData);
      console.log("Datos válidos:", formData);
      setShowBtn(true);
      // Redirigir a una nueva pantalla
      navigate('/home', { state: { formData } });
    }
      
  }; 

  return (
    <>
    <img src={logoApymsa} style={{ ...img.logoImg }} alt="logo apymsa" />
    <h1 style={{ ...typography.h1, color: colors.primary, ...formAttendance.text as React.CSSProperties}}>Registro de asistencia</h1>
      <form onSubmit={handleSubmit} style={{...formAttendance.text as React.CSSProperties}}>
        <label style={{ ...inputForm.text}}>ID del empleado:</label>
        <input
          style={{ ...inputForm.input }}
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
        />
        <div>
          <button type="submit" style={{ ...btn, ...btn.btnIngreso}}>Ingreso</button>
          <button type="submit" style={{ ...btn, ...btn.btnSalida }}>Salida</button>
        </div>
      </form>
      {/* {showBtn && <div><button onClick={reloadPage}>Recargar</button></div>}
      {showBtn && <p> {validateForm(formData)} </p>} */}
    </>
  );
};

export default AttendanceForm;