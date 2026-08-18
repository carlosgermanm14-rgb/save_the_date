document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('addToCalendarBtn');

    btn.addEventListener('click', () => {
        // Feedback visual
        const originalText = btn.innerHTML;
        btn.innerHTML = 'GENERANDO...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
            // Evento configurado a las 20:00 UTC (1:00 PM Culiacán UTC-7)
            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Save The Date Aida y Geovanny//ES
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Boda de Aida & Geovanny
DTSTART:20270123T200000Z
DTEND:20270124T060000Z
LOCATION:Parroquia de San Gabriel y Villa Real Salón y Jardín, Culiacán, Sin.
DESCRIPTION:¡Reserva la fecha! Te invitamos a celebrar nuestra boda. Ceremonia: 1 PM en Parroquia de San Gabriel. Recepción: 5 PM en Villa Real Salón y Jardín. Invitación formal próximamente.
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
DESCRIPTION:Recordatorio Boda Aida & Geovanny
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

            // Saltos de línea necesarios para el estándar
            const formattedIcs = icsContent.replace(/\n/g, "\r\n");

            // Crear el archivo para su descarga (nativo en celular)
            const blob = new Blob([formattedIcs], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'boda_aida_geovanny.ics';
            
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);

            // Restaurar botón
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        }, 500);
    });
});