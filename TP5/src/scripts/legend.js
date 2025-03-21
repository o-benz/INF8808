import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g) {
  // TODO : Generate the legend
  // For help, see : https://d3-legend.susielu.com/
  const legendGroup = g.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(50, 125)')
    .style('font-family', 'Open Sans Condensed')
    .style('font-size', '16px')

  const legend = d3Legend.legendColor()
    .title('Légende')
    .shape('path', d3.symbol().type(d3.symbolCircle).size(400)())
    .shapePadding(4)
    .scale(colorScale)

  legendGroup.call(legend)
}
