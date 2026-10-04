// Strings for the cookie banner, footer legal links and the privacy page.
// Kept apart from en.js / es.js so the legal text is easy to review as a unit.

const CONTACT_EMAIL = 'contact@deltaforgegold.com'
export const PRIVACY_UPDATED = '2026-10-04'

export const legal = {
  en: {
    banner: {
      title: 'Cookies and measurement',
      text: 'I use Google Analytics to understand how the site is used. It only runs if you accept, and it never uses advertising features.',
      accept: 'Accept',
      reject: 'Reject',
      more: 'Privacy & cookies',
    },
    footer: { privacy: 'Privacy & cookies', cookieSettings: 'Cookie settings' },
    privacy: {
      title: 'Privacy & cookies',
      back: 'Back to home',
      updatedLabel: 'Last updated',
      description: 'How DeltaForge Gold handles personal data, cookies and website analytics.',
      sections: [
        {
          h: 'Who is responsible',
          p: [`The person responsible for this website is Jonatan Marín, operating as DeltaForge Gold, based in Barcelona (Spain). You can contact me at ${CONTACT_EMAIL}.`],
        },
        {
          h: 'What data is processed and why',
          p: [
            'Website analytics (only if you accept): Google Analytics 4 collects pseudonymous usage data such as pages viewed, approximate location, device and browser type, how you arrived at the site and interactions such as clicks on "Book a Strategy Call". Advertising features and Google signals are disabled.',
            'Booking a call: the scheduling widget is provided by Calendly. Whatever you enter there is processed by Calendly under its own privacy policy and is shared with me so I can attend the call.',
            'Messages you send me: I use your email and message only to reply to you.',
          ],
        },
        {
          h: 'Legal basis',
          p: [
            'Analytics cookies are used only with your consent (Art. 6.1.a GDPR). You can withdraw it at any time with "Cookie settings" in the footer, and withdrawing does not affect anything done before.',
            'Handling a call booking or an enquiry is based on taking steps at your request before a possible contract, and on my legitimate interest in answering you.',
          ],
        },
        {
          h: 'Cookies',
          p: ['This site sets no cookies unless you accept analytics. If you accept, these are used:'],
        },
        {
          h: 'Recipients and international transfers',
          p: [
            'Google (analytics) and Calendly (bookings) act as service providers. They may process data outside the European Economic Area, including the United States, under safeguards such as the EU-US Data Privacy Framework or standard contractual clauses.',
          ],
        },
        {
          h: 'Retention',
          p: ['Analytics data is kept for the retention period configured in Google Analytics (up to 14 months). Messages and booking details are kept only as long as needed to handle your request.'],
        },
        {
          h: 'Your rights',
          p: [
            `You can request access, rectification, erasure, restriction, portability or object to processing by writing to ${CONTACT_EMAIL}. You also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD, www.aepd.es).`,
          ],
        },
      ],
      cookiesTable: {
        headers: ['Cookie', 'Purpose', 'Duration', 'Provider'],
        rows: [
          ['_ga', 'Distinguishes visitors to produce anonymous usage statistics', '2 years', 'Google Analytics'],
          ['_ga_<ID>', 'Keeps the session state for Google Analytics', '2 years', 'Google Analytics'],
        ],
      },
    },
  },
  es: {
    banner: {
      title: 'Cookies y medición',
      text: 'Uso Google Analytics para entender cómo se utiliza la web. Solo se activa si lo aceptas y nunca usa funciones de publicidad.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      more: 'Privacidad y cookies',
    },
    footer: { privacy: 'Privacidad y cookies', cookieSettings: 'Configurar cookies' },
    privacy: {
      title: 'Privacidad y cookies',
      back: 'Volver al inicio',
      updatedLabel: 'Última actualización',
      description: 'Cómo trata DeltaForge Gold los datos personales, las cookies y la analítica web.',
      sections: [
        {
          h: 'Responsable',
          p: [`El responsable de esta web es Jonatan Marín, que opera como DeltaForge Gold, con sede en Barcelona (España). Puedes contactar conmigo en ${CONTACT_EMAIL}.`],
        },
        {
          h: 'Qué datos se tratan y para qué',
          p: [
            'Analítica web (solo si aceptas): Google Analytics 4 recoge datos de uso seudonimizados, como las páginas vistas, la ubicación aproximada, el tipo de dispositivo y navegador, cómo llegaste a la web e interacciones como los clics en "Reservar una Llamada Estratégica". Las funciones de publicidad y las señales de Google están desactivadas.',
            'Reserva de llamada: el widget de agenda lo proporciona Calendly. Lo que introduzcas allí lo trata Calendly según su propia política de privacidad y se comparte conmigo para poder atender la llamada.',
            'Mensajes que me envíes: uso tu correo y tu mensaje únicamente para responderte.',
          ],
        },
        {
          h: 'Base jurídica',
          p: [
            'Las cookies de analítica se usan solo con tu consentimiento (art. 6.1.a RGPD). Puedes retirarlo en cualquier momento con "Configurar cookies" en el pie de página, y retirarlo no afecta a lo hecho antes.',
            'La gestión de una reserva o consulta se basa en la aplicación de medidas precontractuales a petición tuya y en mi interés legítimo en responderte.',
          ],
        },
        {
          h: 'Cookies',
          p: ['Esta web no instala cookies salvo que aceptes la analítica. Si la aceptas, se usan estas:'],
        },
        {
          h: 'Destinatarios y transferencias internacionales',
          p: [
            'Google (analítica) y Calendly (reservas) actúan como proveedores de servicios. Pueden tratar datos fuera del Espacio Económico Europeo, incluido Estados Unidos, con garantías como el Marco de Privacidad de Datos UE-EE. UU. o cláusulas contractuales tipo.',
          ],
        },
        {
          h: 'Conservación',
          p: ['Los datos de analítica se conservan durante el periodo configurado en Google Analytics (hasta 14 meses). Los mensajes y datos de reserva se conservan solo el tiempo necesario para atender tu solicitud.'],
        },
        {
          h: 'Tus derechos',
          p: [
            `Puedes solicitar el acceso, la rectificación, la supresión, la limitación, la portabilidad o oponerte al tratamiento escribiendo a ${CONTACT_EMAIL}. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD, www.aepd.es).`,
          ],
        },
      ],
      cookiesTable: {
        headers: ['Cookie', 'Finalidad', 'Duración', 'Proveedor'],
        rows: [
          ['_ga', 'Distingue a los visitantes para generar estadísticas de uso anónimas', '2 años', 'Google Analytics'],
          ['_ga_<ID>', 'Mantiene el estado de la sesión para Google Analytics', '2 años', 'Google Analytics'],
        ],
      },
    },
  },
}
