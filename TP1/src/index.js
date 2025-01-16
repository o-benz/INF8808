'use strict'

import * as vizHelper from './scripts/viz-helper.js'
import * as init from './scripts/init.js'
import * as viz from './scripts/viz.js'

/**
 * @file This file is the entry-point for the the code for TP1 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

(function (d3) {
  const margin = { top: 85, right: 85, bottom: 80, left: 80 }
  const padding = 50

  const g = init.generateG(margin)

  init.appendXAxis(g)
  init.appendYAxis(g)

  init.appendGraphLabels(g)

  viz.updateData(g, vizHelper.generateData())

  vizHelper.updateHeader()
  vizHelper.updateInfoPanel()

  /**
   *   This function builds the graph and makes it interactive by setting up the click handler.
   */
  function build () {
    const maxWidth = d3.select('#example-graph').node().getBoundingClientRect().width

    const svgSize = {
      width: maxWidth - padding * 2,
      height: 450
    }

    const graphSize = {
      width: svgSize.width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    }

    viz.setCanvasSize(svgSize.width, svgSize.height)

    const xScale = viz.updateXScale(graphSize.width)
    const yScale = viz.updateYScale(graphSize.height)

    viz.drawXAxis(xScale, graphSize.height)
    viz.drawYAxis(yScale)

    viz.positionCircles(g, xScale, yScale)
    viz.positionLabels(g, graphSize.width, graphSize.height)

    vizHelper.styleCircles(g)

    viz.setClickHandler(g, xScale, yScale)
  }

  build()

  window.addEventListener('resize', () => {
    build()
  })
})(d3)
