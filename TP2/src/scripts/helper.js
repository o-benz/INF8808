
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
  return d3.select('.graph')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Appends an SVG g element which will contain the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x axis')

  g.append('g')
    .attr('class', 'y axis')
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Line Count')
    .attr('class', 'y axis-text')
    .attr('transform', 'rotate(-90)')
    .attr('fill', '#898989')
    .attr('font-size', 12)

  g.append('text')
    .text('Lines per act')
    .attr('class', 'title')
    .attr('fill', '#898989')
}

/**
 * Defines the color scale used in the graph.
 *
 * @param {string[]} colors A sorted array of color hex strings to be used
 * @param {string[]} players A sorted array of player names to use as the domain
 * @returns {*} The color scale to be used inthe graph
 */
export function defineColorScale (colors, players) {
  return d3.scaleOrdinal().range(colors).domain(players)
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#bar-chart').select('svg')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (width, height) {
  d3.select('.y.axis-text')
    .attr('x', -50)
    .attr('y', height / 2)

  d3.select('.title')
    .attr('x', width / 2)
    .attr('y', -35)
}

/**
 * Updates the X scale to be used within each group of the grouped bar char
 *
 * @param {*} scale The scale used for the subgroups
 * @param {string[]} players The players in the subgroups
 * @param {*} xScale The graph's encompassing x scale
 */
export function updateXSubgroupScale (scale, players, xScale) {
  scale
    .domain(players)
    .range([0, xScale.bandwidth()])
}

/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
export function drawXAxis (xScale, height) {
  d3.select('.x.axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(xScale)
      .tickFormat(x => `Act ${x}`))
}

/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
export function drawYAxis (yScale) {
  d3.select('.y.axis').call(d3.axisLeft(yScale).ticks(5))
}
