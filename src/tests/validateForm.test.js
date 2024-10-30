import { describe, expect, test } from '@jest/globals';
import { validateForm } from '../AttendanceForm';

describe("Validar Formulario", () => {
  test("Validar usuario que no sea nulo", () => {
    const formData = { employeeId: "" };
    const errors = validateForm(formData);
    expect(errors.employeeId).toBe("El ID del empleado es obligatorio");
  });
});