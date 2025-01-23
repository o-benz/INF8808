/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  return `
    <div>
      <div style="font-family: 'Grenze Gotisch'; font-size: 24px; font-weight: normal;">
        Act ${d.Act}
      </div>
      <div>
        <strong>Player: </strong>${d.Player}
      </div>
      <div>
        <strong>Lines: </strong>${d.Count}
      </div>
    </div>
  `
}
