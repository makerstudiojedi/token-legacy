import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface IData {
  value: number;
  fillColor: string;
}

interface DonutChartProps {
  width: number;
  height: number;
  className?: string;
  allocated: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ width, height, className, allocated }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef?.current) return;

    let checkedAllocated = allocated;

    if (allocated < 0) {
      checkedAllocated = 0;
    }

    if (allocated > 100) {
      checkedAllocated = 100;
    }

    const data: IData[] = [
      {
        fillColor: "#FFF4D9",
        value: 100 - checkedAllocated,
      },
      {
        fillColor: "#FF9152",
        value: allocated,
      },
    ];

    const innerWidth = width;
    const innerHeight = height;
    const radius = Math.min(innerWidth, innerHeight) / 2;

    const svg = d3.select(svgRef?.current);
    svg.selectAll("*").remove();

    const pieGenerator = d3
      .pie<IData>()
      .value(({ value }) => value)
      .sort(null);

    const arcGenerator: any = d3
      .arc<d3.PieArcDatum<IData>>()
      .innerRadius(radius)
      .outerRadius(radius * 0.7);

    const slices = pieGenerator([...data]);

    const g = svg
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .append("g")
      .attr("transform", `translate(${innerWidth / 2}, ${innerHeight / 2})`);

    g.selectAll("path")
      .data(slices)
      .enter()
      .append("path")
      .attr("fill", d => d?.data?.fillColor)
      .attr("d", arcGenerator);
  }, [allocated, height, width]);

  return <svg className={className} ref={svgRef} />;
};

export default DonutChart;
