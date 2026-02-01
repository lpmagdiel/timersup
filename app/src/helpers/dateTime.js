const months = ["Ene", "Feb", "Mar", "Abr", "Mar", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const dateMonthShort = (date) => {
    const dp = date.split("-");
    return months[Number(dp[1])] + " " + dp[2];
}

export const dateShort = (date) => {
    const dp = date.split("-");
    return `${dp[2]} ${months[Number(dp[1])]} ${dp[0]}`;
}