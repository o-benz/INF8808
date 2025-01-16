
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
  return d3.select('#example-graph')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Appends an SVG g element which will contain the x axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendXAxis (g) {
  g.append('g')
    .attr('class', 'x axis')
}

/**
 * Appends an SVG g element which will contain the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendYAxis (g) {
  g.append('g')
    .attr('class', 'y axis')
}
/**
 * Appends the labels for the x axis, the y axis and the title of the scatter graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Axe x')
    .attr('class', 'x axis-text')

  g.append('text')
    .text('Axe y')
    .attr('class', 'y axis-text')
    .attr('transform', 'rotate(-90)')

  g.append('text')
    .text('Mon premier graphique')
    .attr('class', 'title')
}
