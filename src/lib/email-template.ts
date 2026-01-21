interface EmailTemplateProps {
  nombres: string;
  apellidos: string;
}

export function getEmailTemplate({ nombres, apellidos }: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Registro</title>
  <style>
    body {
      font-family: 'Courier New', Courier, monospace;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #1a1a1a;
      font-size: 24px;
      margin-bottom: 20px;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 15px;
    }
    .highlight {
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Juventudes con Iván</h1>

    <p>Hola <span class="highlight">${nombres} ${apellidos}</span>,</p>

    <p>¡Gracias por registrarte en <strong>Juventudes con Iván</strong>!</p>

    <p>Tu registro ha sido recibido exitosamente. Pronto te contactaremos con más información sobre las actividades y eventos.</p>

    <p>¡Juntos construimos el cambio!</p>

    <div class="footer">
      <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
      <p>&copy; Juventudes con Iván Cepeda</p>
    </div>
  </div>
</body>
</html>
`;
}
