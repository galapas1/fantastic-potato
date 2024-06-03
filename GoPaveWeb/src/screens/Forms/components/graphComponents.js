import React from 'react';

export const AxisLabel = ({ axisType, x=0, y=0, width, height, children }) => {
  const isVert = axisType === 'yAxis';

  const cx = isVert ? x : x + (width / 2);
  const cy = isVert ? (height / 2) + y : y + height + 10;
  const rot = isVert ? `270` : 0;
  return (
    <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke='#0FAFAF'>
      <tspan>{children}</tspan>
    </text>
  );
};

export const CustomTooltip = (props) => {
    const { payload, label, active, xAxisValue } = props;
    const payloadObject = payload[0];


    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="x-axis">{`${xAxisValue} : ${label}`}</p>
          <p className="y-axis">{`  ${payloadObject['name']} : ${payloadObject['value']} ${payloadObject['unit']}`}</p>
        </div>
      );
    }

    return null;
}
