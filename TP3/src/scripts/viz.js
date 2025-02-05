import { setRectHandler } from './hover.js';

/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain (colorScale, data) {
  const counts = data.map(d => d.Comptes)
  colorScale.domain([0, d3.max(counts)])
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
export function appendRects (data) {
  const svg = d3.select('.heatmap-svg')
  svg.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .append('rect')
    .attr('class', 'heatmap-rect')


}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
export function updateXScale (xScale, data, width, range) {
  const years = range(2010, 2020)
  xScale.domain(years).range([120, width])
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
export function updateYScale (yScale, neighborhoodNames, height) {
  neighborhoodNames.sort()
  yScale.domain(neighborhoodNames).range([height, 40])
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis (xScale) {
  const svg = d3.select('.heatmap-svg')
  svg.selectAll('.x.axis').remove()
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,0)')
    .call(d3.axisTop(xScale))
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis (yScale, width) {
  const svg = d3.select('.heatmap-svg')
  svg.selectAll('.y.axis').remove()
  svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', `translate(${width},0)`)
    .call(d3.axisRight(yScale))
}

/**
 * Rotates the ticks on the Y axis 30 degrees towards the left.
 */
export function rotateYTicks () {
  d3.selectAll('.y.axis text')
    .attr('transform', 'rotate(-30)')
    .style('text-anchor', 'start')
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
export function updateRects (xScale, yScale, colorScale) {
  const svg = d3.select('.heatmap-svg')
  svg.selectAll('.heatmap-rect')
    .attr('x', d => xScale(d.Plantation_Year))
    .attr('y', d => yScale(d.Arrond_Nom))
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .attr('fill', d => colorScale(d.Comptes))
}
