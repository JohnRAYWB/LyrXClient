export const useScoreLength = (score: number) => {

    let favScore = score.toString(10)

    if(favScore.length > 3 && favScore.length < 7) {
        return `${favScore.slice(0, -3)}k`
    } else if (favScore.length > 6) {
        return `${favScore.slice(0, -6)}.${favScore[1]}m`
    }

    return favScore
}