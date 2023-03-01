
export const formaterFecha = fecha => {
    const nuevaF = new Date(fecha.split('T')[0].split('-'));

    const op= {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return nuevaF.toLocaleDateString('es-ES',op);
}