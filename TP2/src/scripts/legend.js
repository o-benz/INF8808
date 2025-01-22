/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
export function draw (data, color) {
  // Tip : Append one div per legend element using class "legend-element".
  d3.select('div.legend')
    .selectAll('.legend-element')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'legend-element')
    .each(function (d) {
      d3.select(this)
        .append('div')
        .style('background-color', color(d))
        .style('width', '15px')
        .style('height', '15px')
        .style('border', '1px')
        .style('border-style', 'solid')
        .style('border-color', 'black')
        .style('margin-right', '4px')
      d3.select(this)
        .append('span')
        .text(d)
    })
}
