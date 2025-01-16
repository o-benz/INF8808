import { generateData, styleCircles, updateInfoPanel } from './viz-helper.js'

/**
 * Creates a linear scale to map the input domain to a position in x.
 *
 * @param {number} width The width of the graph
 * @returns {*} The x scale
 */
export function updateXScale (width) {
  return d3.scaleLinear()
    .domain([0, 100])
    .range([0, width])
}

/**
 * Creates a linear scale to map the input domain to a position in y.
 *
 * @param {number} height The height of the graph
 * @returns {*} The y scale
 */
export function updateYScale (height) {
  return d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])
}

/**
 * Draws the x axis at the bottom of the scatter plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
export function drawXAxis (xScale, height) {
  d3.select('.x.axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(xScale).ticks(5))
}

/**
 * Draws the y axis at the left of the scatter plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
export function drawYAxis (yScale) {
  d3.select('.y.axis').call(d3.axisLeft(yScale).ticks(5))
}

/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  g.select('.x.axis-text')
    .attr('x', width / 2)
    .attr('y', height + 50)

  g.select('.y.axis-text')
    .attr('x', -50)
    .attr('y', height / 2)

  g.select('.title')
    .attr('x', width / 2)
    .attr('y', -35)
}

/**
 * Binds the data to the scatter plot.
 *
 * @param {*} g  The d3 Selection of the graph's g SVG element
 * @param {object[]} data The data to use to generate the scatter plot
 */
export function updateData (g, data) {
  g.selectAll('.dot')
    .data(data)
    .join('circle')
    .attr('class', 'dot')
}

/**
 * Uses the data associated to each circle in the scatter plot to position it at its (x,y) coordinate.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} xScale The scale used to position the element in x
 * @param {*} yScale The scale used to position the element in x
 */
export function positionCircles (g, xScale, yScale) {
  g.selectAll('.dot')
    .attr('cx', function (d) { return xScale(d.x) })
    .attr('cy', function (d) { return yScale(d.y) })
}

/**
 * Handles clicks on the 'Actualiser" button. When clicked, the data is regenerated and
 * the display is updated.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} xScale The xScale used to display the graph
 * @param {*} yScale The xScale used to display the graph
 */
export function setClickHandler (g, xScale, yScale) {
  d3.select('#update-btn')
    .on('click', () => {
      updateData(g, generateData())
      positionCircles(g, xScale, yScale)
      styleCircles(g)
      updateInfoPanel()
    })
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#example-graph').select('svg')
    .attr('width', width)
    .attr('height', height)
}
