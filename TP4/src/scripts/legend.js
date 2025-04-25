import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  const legendGroup = g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width + 5}, -30)`)

  const legend = d3Legend.legendColor()
    .title('Legend')
    .shape('path', d3.symbol().type(d3.symbolCircle).size(400)())
    .scale(colorScale)

  legendGroup.call(legend)
}
