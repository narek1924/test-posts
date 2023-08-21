import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const trimmedValue = control.value?.trim();
  if (!trimmedValue) {
    return { required: true, message: 'Обязательное поле' };
  }
  if (
    trimmedValue &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/.test(trimmedValue)
  ) {
    return { invalidEmail: true, message: 'Неправильный e-mail адрес' };
  }

  return null;
}
export function nameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const loginPattern = /^[a-zA-Zа-яА-Я]+$/;

  if (!control.value) {
    return { required: true, message: 'Обязательное поле' };
  }

  if (control.value.length < 5 || control.value.length > 20) {
    return {
      length: true,
      message: 'Поле "имя" должно содержать от 5 до 20 символов',
    };
  }

  if (!loginPattern.test(control.value)) {
    return {
      pattern: true,
      message: 'Поле "имя" должно содержать только буквы',
    };
  }

  return null;
}
