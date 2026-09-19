export class Validators {
  static isEmailValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static isPasswordStrong(senha: string): boolean {
    return senha.length >= 6; 
  }

  static isCpfValid(cpf: string): boolean {
    const limpo = cpf.replace(/\D/g, '');
    if (limpo.length !== 11 || /^(\d)\1{10}$/.test(limpo)) return false;
    return true; 
  }
}