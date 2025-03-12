'use strict'

import * as helper from './scripts/helper.js'
import * as viz from './scripts/viz.js'
import * as preprocess from './scripts/preprocess.js'
import * as legend from './scripts/legend.js'
import * as panel from './scripts/panel.js'

/**
 * @file This file is the entry-point for the the code for TP5 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

(function (d3) {
  const svgSize = {
    width: 800,
    height: 625
  }

  helper.setCanvasSize(svgSize.width, svgSize.height)
  helper.generateMapG(svgSize.width, svgSize.height)
  helper.generateMarkerG(svgSize.width, svgSize.height)
  helper.appendGraphLabels(d3.select('.main-svg'))
  helper.initPanelDiv()

  build()

  /**
   *   This function builds the graph.
   */
  function build () {
    var color = d3.scaleOrdinal(d3.schemeCategory10)

    var projection = helper.getProjection()

    var path = helper.getPath(projection)

    d3.json('./montreal.json').then(function (data) {
      data = preprocess.reverseGeoJsonCoordinates(data)
      viz.mapBackground(data, path, viz.showMapLabel)
    })

    d3.json('./projetpietonnisation2017.geojson').then(function (data) {
      preprocess.convertCoordinates(data, projection)
      preprocess.simplifyDisplayTitles(data)

      viz.colorDomain(color, data)
      viz.mapMarkers(data, color, panel)

      legend.drawLegend(color, d3.select('.main-svg'))

      const simulation = helper.getSimulation(data)
      helper.simulate(simulation)
    })
  }
})(d3)
