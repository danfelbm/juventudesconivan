export interface RedSocial {
  red_social: string;
  valor: string;
}

export interface RegistroFormData {
  nombres: string;
  apellidos: string;
  email: string;
  confirmarEmail: string;
  telefono: string;
  confirmarTelefono: string;
  localidad: string;
  organizacion?: string;
  profesion?: string;
  genero: string;
  edad: number;
  perfil: string;
  redesSociales: RedSocial[];
  aceptaPolitica: boolean;
}

export interface RegistroInsert {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  localidad: string;
  organizacion?: string;
  profesion?: string;
  genero: string;
  edad: number;
  perfil: string;
  acepta_politica: boolean;
}

export interface RedSocialInsert {
  registro_id: string;
  red_social: string;
  valor: string;
}
