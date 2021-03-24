 import {HttpErrorResponse} from '@angular/common/http';

export const extractErrorMessagesFromErrorResponse = (errorResponse: HttpErrorResponse) => {
  // 1 - Crea una matriz vacía para almacenar errores
  const errors = [];

  // 2 - compruebe si el objeto de error está presente en la respuesta
  if (errorResponse.error) {

    // 3 - Empuje el mensaje de error principal a la matriz de errores
    errors.push(errorResponse.error.message);

    // 4 - Verifique el objeto de mensajes de error de validación de formulario de Laravel
    if (errorResponse.error.errors) {

      // 5 - Para cada propiedad de error (que es un campo de formulario
      for (const property in errorResponse.error.errors) {

        if (errorResponse.error.errors.hasOwnProperty(property)) {

          // 6 - Extrae su matriz de errores
          const propertyErrors: Array<string> = errorResponse.error.errors[property];

          // 7 - Empuje todos los errores de la matriz a la matriz de errores
          propertyErrors.forEach(error => errors.push(error));
        }

      }

    }

  }

  return errors;
};