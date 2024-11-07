import React, { useState, FormEvent, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// TypeScript interfaces
interface FormData {
  nombres: string;
  apellidos: string;
  telefono: string;
  domicilio: string;
  puesto: 'HR' | 'Desarrollo' | 'Otro' | '';
  edad: string;
  fecha: string;
}

interface FormErrors {
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  domicilio?: string;
  puesto?: string;
  edad?: string;
  fecha?: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    apellidos: '',
    telefono: '',
    domicilio: '',
    puesto: '',
    edad: '',
    fecha: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `(+${numbers}`;
    if (numbers.length <= 4) return `(+${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 6) return `(+${numbers.slice(0, 2)}) ${numbers.slice(2, 4)} ${numbers.slice(4)}`;
    if (numbers.length <= 8) return `(+${numbers.slice(0, 2)}) ${numbers.slice(2, 4)} ${numbers.slice(4, 6)} ${numbers.slice(6)}`;
    return `(+${numbers.slice(0, 2)}) ${numbers.slice(2, 4)} ${numbers.slice(4, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`;
  };

  const formatDate = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 4)}-${numbers.slice(4, 8)}`;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nombres.trim()) newErrors.nombres = 'Nombres es requerido';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Apellidos es requerido';
    if (!formData.telefono.trim() || formData.telefono.replace(/\D/g, '').length < 10) {
      newErrors.telefono = 'Teléfono inválido';
    }
    if (!formData.domicilio.trim()) newErrors.domicilio = 'Domicilio es requerido';
    if (!formData.puesto) newErrors.puesto = 'Puesto es requerido';
    
    const edad = parseInt(formData.edad);
    if (!formData.edad || isNaN(edad) || edad < 18 || edad > 100) {
      newErrors.edad = 'Edad debe estar entre 18 y 100';
    }
    
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(formData.fecha)) newErrors.fecha = 'Fecha inválida (dd-mm-aaaa)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('URLPENDIENTEDELENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert('Registro exitoso!');
          handleClear();
        } else {
          alert('Error al enviar el formulario');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar el formulario');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClear = (): void => {
    setFormData({
      nombres: '',
      apellidos: '',
      telefono: '',
      domicilio: '',
      puesto: '',
      edad: '',
      fecha: ''
    });
    setErrors({});
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'telefono') {
      formattedValue = formatPhoneNumber(value);
    } else if (name === 'fecha') {
      formattedValue = formatDate(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="text-center mb-0">Registro</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">Nombres</label>
              <input
                type="text"
                className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                placeholder="Ingrese nombres"
              />
              {errors.nombres && <div className="invalid-feedback">{errors.nombres}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input
                type="text"
                className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Ingrese apellidos"
              />
              {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono</label>
              <input
                type="text"
                className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="(+52)"
              />
              {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="domicilio" className="form-label">Domicilio</label>
              <input
                type="text"
                className={`form-control ${errors.domicilio ? 'is-invalid' : ''}`}
                id="domicilio"
                name="domicilio"
                value={formData.domicilio}
                onChange={handleChange}
                placeholder="Ingrese domicilio"
              />
              {errors.domicilio && <div className="invalid-feedback">{errors.domicilio}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="puesto" className="form-label">Puesto</label>
              <select
                className={`form-select ${errors.puesto ? 'is-invalid' : ''}`}
                id="puesto"
                name="puesto"
                value={formData.puesto}
                onChange={handleChange}
              >
                <option value="">Seleccione un puesto</option>
                <option value="HR">HR</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.puesto && <div className="invalid-feedback">{errors.puesto}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="edad" className="form-label">Edad</label>
              <input
                type="number"
                className={`form-control ${errors.edad ? 'is-invalid' : ''}`}
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                min="18"
                max="100"
                placeholder="Ingrese edad"
              />
              {errors.edad && <div className="invalid-feedback">{errors.edad}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">Fecha</label>
              <input
                type="text"
                className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                placeholder="dd-mm-aaaa"
              />
              {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Enviando...
                  </>
                ) : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;