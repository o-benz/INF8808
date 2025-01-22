
/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  data.forEach((row) => { row.Player = row.Player[0] + row.Player.slice(1).toLowerCase() })
  return data
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  const NB_TOP_PLAYERS = 5

  const nbLinesMap = new Map()
  data.forEach((row) => {
    const playerLines = nbLinesMap.get(row.Player) || 0
    nbLinesMap.set(row.Player, playerLines + 1)
  })
  const sortedArrayLines = Array.from(nbLinesMap).sort((a, b) => a[1] - b[1]).reverse()
  const topPlayers = sortedArrayLines.slice(0, NB_TOP_PLAYERS).map((player) => player[0])
  return topPlayers
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  const actMaps = new Map()
  data.forEach((row) => {
    if (!actMaps.has(row.Act)) {
      actMaps.set(row.Act, new Map())
    }
    const actMap = actMaps.get(row.Act)
    const playerLines = actMap.get(row.Player) || 0
    actMap.set(row.Player, playerLines + 1)
  })

  const res = []
  actMaps.forEach((actMap, act) => {
    const players = []
    actMap.forEach((playerLines, player) => {
      players.push({
        Player: player,
        Count: playerLines
      })
    })
    res.push({ Act: act, Players: players })
  })
  return res
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  const res = []
  data.forEach((act) => {
    const filteredAct = { Act: act.Act, Players: [] }

    const otherLines = act.Players.reduce((acc, player) => {
      if (!top.includes(player.Player)) {
        acc += player.Count
      }
      return acc
    }, 0)

    filteredAct.Players = act.Players.filter((player) => top.includes(player.Player))
    filteredAct.Players.push({ Player: 'Other', Count: otherLines })

    res.push(filteredAct)
  })
  return res
}
