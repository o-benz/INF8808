import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  // TODO : Draw the legend using d3Legend
  // For help, see : https://d3-legend.susielu.com/
  const legendGroup = g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width + 20}, -40)`) // Position the legend

  console.log(colorScale.domain())
  console.log(colorScale.range())
  const legend = d3Legend.legendColor()
    .scale(colorScale)
    .shapePadding(2)
    .shapeRadius(10)
    .shape('circle')
    .orient('vertical')
    .labelAlign('start')
    .title('Legend')

  legendGroup.call(legend)
}
