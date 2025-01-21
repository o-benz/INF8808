'use strict'

import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as helper from './scripts/helper.js'
import * as legend from './scripts/legend.js'
import * as tooltip from './scripts/tooltip.js'

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for TP2 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

(function (d3) {
  const margin = { top: 80, right: 0, bottom: 80, left: 55 }
  const barColors = ['#861388',
    '#d4a0a7',
    '#dbd053',
    '#1b998b',
    '#A0CED9',
    '#3e6680']

  let bounds
  let svgSize
  let graphSize

  const xScale = d3.scaleBand().padding(0.15)
  const xSubgroupScale = d3.scaleBand().padding([0.015])
  const yScale = d3.scaleLinear()

  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
  d3.select('.main-svg').call(tip)

  d3.csv('./romeo_and_juliet.csv').then(function (data) {
    data = preproc.cleanNames(data)

    const topPlayers = preproc.getTopPlayers(data)

    data = preproc.summarizeLines(data)
    data = preproc.replaceOthers(data, topPlayers)

    topPlayers.push('Other')
    topPlayers.sort((a, b) => a.localeCompare(b))

    const g = helper.generateG(margin)

    helper.appendAxes(g)
    helper.appendGraphLabels(g)

    const color = helper.defineColorScale(barColors, topPlayers)

    legend.draw(topPlayers, color)

    setSizing()
    build(data, topPlayers)

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
      helper.positionLabels(graphSize.width, graphSize.height)

      viz.updateGroupXScale(xScale, data, graphSize.width)
      helper.updateXSubgroupScale(xSubgroupScale, topPlayers, xScale)
      viz.updateYScale(yScale, data, graphSize.height)

      helper.drawXAxis(xScale, graphSize.height)
      helper.drawYAxis(yScale)

      viz.createGroups(data, xScale)
      viz.drawBars(yScale, xSubgroupScale, topPlayers, graphSize.height, color, tip)
    }

    window.addEventListener('resize', () => {
      setSizing()
      build(data, topPlayers)
    })
  })
})(d3)
