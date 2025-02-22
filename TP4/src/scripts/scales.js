/**
 * Defines the scale to use for the circle markers' radius.
 *
 * The radius of the circle is linearly proportinal to the population of the given country.
 *
 * The radius is a value defined in the interval [5, 20].
 *
 * @param {object} data The data to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
export function setRadiusScale (data) {
  // TODO : Set scale
  const minPop = Math.min(
    d3.min(data[2000], d => d.Population),
    d3.min(data[2015], d => d.Population)
  )

  const maxPop = Math.max(
    d3.max(data[2000], d => d.Population),
    d3.max(data[2015], d => d.Population)
  )

  return d3.scaleLinear()
    .domain([minPop, maxPop])
    .range([5, 20])
}

/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeSet1.
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
export function setColorScale (data) {
  // TODO : Set scale
  return d3.scaleOrdinal(d3.schemeSet1)
    .domain(data[2000].map(d => d.Continent))
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  // TODO : Set scale
  const minGDP = Math.min(
    d3.min(data[2000], d => d.GDP),
    d3.min(data[2015], d => d.GDP)
  )

  const maxGDP = Math.max(
    d3.max(data[2000], d => d.GDP),
    d3.max(data[2015], d => d.GDP)
  )

  return d3.scaleLog()
    .domain([minGDP, maxGDP])
    .range([0, width])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  // TODO : Set scale
  const minCO2 = Math.min(
    d3.min(data[2000], d => d.CO2),
    d3.min(data[2015], d => d.CO2)
  )

  const maxCO2 = Math.max(
    d3.max(data[2000], d => d.CO2),
    d3.max(data[2015], d => d.CO2)
  )

  return d3.scaleLog()
    .domain([minCO2, maxCO2])
    .range([height, 0])
}
