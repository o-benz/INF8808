/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
export function getNeighborhoodNames (data) {
  return new Set(data.map((d) => { return d.Arrond_Nom }))
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears (data, start, end) {
  return data.filter((d) => { return d.Date_Plantation.getFullYear() >= start && d.Date_Plantation.getFullYear() <= end })
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts (data) {
  const maps = new Map()
  data.forEach((d) => {
    // Create a unique id for each neighborhood and year combination
    const id = String(d.Arrond) + d.Date_Plantation.getFullYear()
    if (maps.has(id)) {
      const t = maps.get(id)
      t.Counts += 1
      maps.set(id, t)
    } else {
      maps.set(id, { Arrond_Nom: d.Arrond_Nom, Plantation_Year: d.Date_Plantation.getFullYear(), Counts: 1 })
    }
  })
  return Array.from(maps.values())
}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
export function fillMissingData (data, neighborhoods, start, end, range) {
  neighborhoods.forEach((n) => {
    range(start, end).forEach((y) => {
      if (!data.some((d) => { return d.Arrond_Nom === n && d.Plantation_Year === y })) {
        data.push({ Arrond_Nom: n, Plantation_Year: y, Counts: 0 })
      }
    })
  })
  return data
}
