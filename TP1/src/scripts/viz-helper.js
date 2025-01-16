/**
 *   Builds the header for the webpage, including a title and welcome message.
 */
export function updateHeader () {
  const header = d3.select('header')

  header
    .append('h1')
    .text('TP1')

  header
    .append('div')
    .text('Bienvenue au cours INF8808 : Visualisation de données.')
}

/**
 *   Generates random data to be displayed in the scatter plot.
 *   The data must be a 2 X m array of randomly generated (x, y) coordinates, with :
 *
 *      - x : an integer in [1, 99],
 *      - y : an integer in [1, 99],
 *
 *   and where m is a random number in [1, 10]. Each coordinate is represented
 *   as an object with keys 'x' and 'y'. Each coordinate object is contained in the
 *   resulting array.
 *
 *   For example, the coordinates could be :
 *
 *             x  |  y
 *           ----------
 *             99 | 4
 *             27 | 89
 *             17 | 42
 *
 *   @returns {object[]} The generated data
 */
export function generateData () {
  const size = d3.randomUniform(1, 11)()

  const uniformGenerator = d3.randomUniform(1, 100)
  const data = Array.from({ length: size }, () => {
    return {
      x: uniformGenerator(), y: uniformGenerator()
    }
  })
  return data
}

/**
 * @returns {number} The current number of circles displayed in the scatter plot.
 */
export function getDotCount () {
  return d3.selectAll('.dot').nodes().length
}

/**
 * Updates the text in the info panel below the graph so it displays the current circle count,
 * with the number displayed in bold.
 */
export function updateInfoPanel () {
  const nbOfDots = getDotCount()

  d3.select('.dot-count')
    .text(nbOfDots)

  d3.select('.dot-label')
    .text(nbOfDots > 1 ? 'points' : 'point')
}

/**
 * Selects all the SVG circles and sets their visual appearance.
 * Sets their radius to 5 and their fill color to #07BEB8.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function styleCircles (g) {
  g.selectAll('.dot')
    .attr('r', 5)
    .attr('fill', '#07BEB8')
}
