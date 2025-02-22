/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  // TODO : Generate tooltip contents
  return '<b>Country:</b> ' + d['Country Name'] + '<br>' +
    '<b>Population:</b> ' + d.Population + '<br>' +
    '<b>GDP:</b> ' + (d.GDP).toFixed(2) + ' $ (USD)<br>' +
    '<b>CO2 Emissions:</b> ' + (d.CO2).toFixed(2) + ' metric tons'
}
