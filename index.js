document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE LA FLECHA DE SCROLL ---
    const scrollArrow = document.getElementById('scrollArrow');
    
    function toggleScrollArrow() {
        const needsScroll = document.documentElement.scrollHeight > window.innerHeight;
        
        if (needsScroll && window.scrollY < 40) {
            scrollArrow.classList.remove('hidden');
        } else {
            scrollArrow.classList.add('hidden');
        }
    }

    window.addEventListener('scroll', toggleScrollArrow);
    window.addEventListener('resize', toggleScrollArrow);
    
    setTimeout(toggleScrollArrow, 1500); 

    // --- LÓGICA DEL CALENDARIO ---
    const btn = document.getElementById('addToCalendarBtn');

    btn.addEventListener('click', () => {
        const originalText = btn.innerHTML;
        btn.innerHTML = 'GENERANDO...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
            // Ceremonia 1 PM (13:00 local Culiacán UTC-7) = 20:00 UTC
            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Save The Date Aida y Geovanny//ES
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Boda de Aida & Geovanny
DTSTART:20270123T200000Z
DTEND:20270124T060000Z
LOCATION:Culiacán, Sin.
DESCRIPTION:¡Reserva la fecha! Te invitamos a celebrar el mejor día de nuestras vidas. La invitación formal llegará pronto.
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
DESCRIPTION:Recordatorio Boda Aida & Geovanny
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

            const formattedIcs = icsContent.replace(/\n/g, "\r\n");

            const blob = new Blob([formattedIcs], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'boda_aida_geovanny.ics';
            
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);

            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        }, 500);
    });
});