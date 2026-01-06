import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      purpose, 
      searchStatus, 
      timing, 
      propertyPrice, 
      region, 
      holders, 
      holder1, 
      holder2, 
      savings, 
      contact 
    } = body;

    const { data, error } = await resend.emails.send({
      from: 'Credovia Web <onboarding@resend.dev>', // Usaremos el dominio de pruebas de Resend inicialmente
      to: ['ebanonrodriguez@gesternova.com'], // Aquí deberías poner tu email real, o usar una variable de entorno
      subject: `Nueva solicitud de hipoteca de ${contact.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0d3b91;">Nueva Solicitud de Hipoteca</h1>
          <p>Has recibido una nueva solicitud desde la web de Credovia.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #05c4a5; margin-top: 0;">Datos de Contacto</h2>
            <p><strong>Nombre:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Teléfono:</strong> ${contact.phone}</p>
          </div>

          <div style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0d3b91; margin-top: 0;">Detalles de la Operación</h2>
            <p><strong>Finalidad:</strong> ${purpose === 'new' ? 'Nueva Hipoteca' : 'Mejorar Hipoteca'}</p>
            <p><strong>Estado búsqueda:</strong> ${searchStatus}</p>
            <p><strong>Plazo previsto:</strong> ${timing}</p>
            <p><strong>Valor vivienda:</strong> ${propertyPrice}</p>
            <p><strong>Ubicación:</strong> ${region}</p>
            <p><strong>Ahorros aportados:</strong> ${savings} €</p>
          </div>

          <div style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
            <h2 style="color: #0d3b91; margin-top: 0;">Datos Económicos</h2>
            <p><strong>Número de titulares:</strong> ${holders}</p>
            
            <h3 style="color: #6b7280; font-size: 14px; text-transform: uppercase;">Titular 1</h3>
            <p><strong>Contrato:</strong> ${holder1.contractType}</p>
            <p><strong>Ingresos:</strong> ${holder1.monthlyIncome}</p>

            ${holders === 2 ? `
              <div style="margin-top: 15px; border-top: 1px dashed #e5e7eb; padding-top: 15px;">
                <h3 style="color: #6b7280; font-size: 14px; text-transform: uppercase;">Titular 2</h3>
                <p><strong>Contrato:</strong> ${holder2.contractType}</p>
                <p><strong>Ingresos:</strong> ${holder2.monthlyIncome}</p>
              </div>
            ` : ''}
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
