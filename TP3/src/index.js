'use strict'

import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'
import * as util from './scripts/util.js'

import * as d3Chromatic from 'd3-scale-chromatic'

/**
 * @file This file is the entry-point for the the code for TP3 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

(function (d3) {
  let bounds
  let svgSize
  let graphSize

  const margin = { top: 35, right: 200, bottom: 35, left: 200 }

  const xScale = d3.scaleBand().padding(0.05)
  const yScale = d3.scaleBand().padding(0.2)
  const colorScale = d3.scaleSequential(d3Chromatic.interpolateYlGnBu)

  d3.csv('./arbres.csv', d3.autoType).then(function (data) {
    const neighborhoodNames = preproc.getNeighborhoodNames(data)
    data = preproc.filterYears(data, 2010, 2020)

    data = preproc.summarizeYearlyCounts(data)
    data = preproc.fillMissingData(data, neighborhoodNames, 2010, 2020, util.range)

    viz.setColorScaleDomain(colorScale, data)

    legend.initGradient(colorScale)
    legend.initLegendBar()
    legend.initLegendAxis()

    const g = helper.generateG(margin)

    helper.appendAxes(g)
    viz.appendRects(data)

    setSizing()
    build()

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      bounds = d3.select('.graph').node().getBoundingClientRect()

      svgSize = {
        width: bounds.width,
        height: 550
      }

      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      }

      helper.setCanvasSize(svgSize.width, svgSize.height)
    }

    /**
     *   This function builds the graph.
     */
    function build () {
      viz.updateXScale(xScale, data, graphSize.width, util.range)
      viz.updateYScale(yScale, neighborhoodNames, graphSize.height)

      viz.drawXAxis(xScale)
      viz.drawYAxis(yScale, graphSize.width)

      viz.rotateYTicks()

      viz.updateRects(xScale, yScale, colorScale)

      hover.setRectHandler(xScale, yScale, hover.rectSelected, hover.rectUnselected, hover.selectTicks, hover.unselectTicks)

      legend.draw(margin.left / 2, margin.top + 5, graphSize.height - 10, 15, 'url(#gradient)', colorScale)
    }

    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  })
})(d3)
