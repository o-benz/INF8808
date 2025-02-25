import { color } from 'd3'
import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend(colorScale, g, width) {
  const legendGroup = g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width + 20}, -40)`);



    legendGroup.append("text")
    .attr("class", "legendTitle")
    .attr("x", 10)  // Position the title to the left
    .attr("y", -20)  // Position above the symbols
    .text("Legend")  // Replace with your desired title text
    .style("font-size", "18px")


    const symbol = d3.symbol().type(d3.symbolCircle).size(400);  

    legendGroup.selectAll(".legendSymbols")
      .data(colorScale.domain())
      .enter()
      .append("path")
        .attr("d", symbol)  
        .attr("transform", (d, i) => `translate(20, ${i * 25})`) 
        .style("fill", d => colorScale(d));

    // Add labels next to each symbol
    legendGroup.selectAll(".legendLabels")
      .data(colorScale.domain())
      .enter()
      .append("text")
        .attr("x", 40)  
        .attr("y", (d, i) => i * 25) 
        .text(d => d)  
        .style("font-size", "12px")
        .style("fill", "#000");  
}

