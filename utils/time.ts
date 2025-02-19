export const elapsedTime = (lastTime: Date | string | number) : string => {
    const agora = new Date();
    const lastDate = new Date(lastTime);
    const diffMs = agora.getTime() - lastDate.getTime(); 
    const diffMin = Math.floor(diffMs / 60000);
    const diffHoras = Math.floor(diffMin / 60);
    const diffDias = Math.floor(diffHoras / 24);

    if (diffMin < 1) return "Agora mesmo";
    if (diffMin < 60) return `${diffMin} minutos atrás`;
    if (diffHoras < 24) return `${diffHoras} horas atrás`;

    return `${diffDias} dias atrás`;
}