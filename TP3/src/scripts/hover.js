/**
 * Sets up an event handler for when the mouse enters and leaves the squares
 * in the heatmap. When the square is hovered, it enters the "selected" state.
 *
 * The tick labels for the year and neighborhood corresponding to the square appear
 * in bold.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
export function setRectHandler (xScale, yScale, rectSelected, rectUnselected, selectTicks, unselectTicks) {
  const svg = d3.select('.heatmap-svg')
  svg.selectAll('.heatmap-rect')
    .on('mouseover', function (event, d) {
      rectSelected(d3.select(this), xScale, yScale)
      selectTicks(d.Arrond_Nom, d.Plantation_Year)
    })
    .on('mouseout', function (event, d) {
      rectUnselected(d3.select(this))
      unselectTicks()
    })
}

/**
 * The function to be called when one or many rectangles are in "selected" state,
 * meaning they are being hovered
 *
 * The text representing the number of trees associated to the rectangle
 * is displayed in the center of the rectangle and their opacity is lowered to 75%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 */
export function rectSelected (element, xScale, yScale) {
  const data = element.datum()
  const treeCount = data.Comptes
  const svg = d3.select('.heatmap-svg')
  svg.selectAll('.tree-count').remove()
  svg.append('text')
    .attr('class', 'tree-count')
    .attr('x', xScale(data.Plantation_Year) + xScale.bandwidth() / 2)
    .attr('y', yScale(data.Arrond_Nom) + yScale.bandwidth() / 2)
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .attr('fill', treeCount >= 1000 ? 'white' : 'black')
    .style('font-size', '14px')
    .style('user-select', 'none')
    .style('pointer-events', 'none')
    .text(treeCount)
  element.style('opacity', 0.75)
}

/**
 * The function to be called when the rectangle or group
 * of rectangles is no longer in "selected state".
 *
 * The text indicating the number of trees is removed and
 * the opacity returns to 100%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 */
export function rectUnselected (element) {
  d3.selectAll('.tree-count').remove()
  element.style('opacity', 1)
}

/**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the neighborhood associated with the tick text to make bold
 * @param {number} year The year associated with the tick text to make bold
 */
export function selectTicks (name, year) {
  d3.selectAll('.x.axis text')
    .filter(d => d === year)
    .style('font-weight', 'bold')
  d3.selectAll('.y.axis text')
    .filter(d => d === name)
    .style('font-weight', 'bold')
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicks () {
  d3.selectAll('.x.axis text').style('font-weight', 'normal')
  d3.selectAll('.y.axis text').style('font-weight', 'normal')
}
