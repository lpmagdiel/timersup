export const convertSeconds = s => {
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s - hours * 3600) / 60);
    const seconds = s % 60;
    return { hours, minutes, seconds };
}

export const convertSecondsString = s => {
    const { hours, minutes, seconds } = convertSeconds(s);
    return `${hours}H ${minutes}M ${seconds}S`;
}