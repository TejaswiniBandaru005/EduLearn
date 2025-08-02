import React from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';

export const ActivityChart = ({ data, title = 'Activity', className }) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const textColor = isDark ? '#f9fafb' : '#1f2937';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const tooltipBg = isDark ? '#374151' : '#ffffff';
  const tooltipBorder = isDark ? '#4b5563' : '#e5e7eb';

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="name" 
              stroke={textColor} 
              tickLine={false}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis 
              stroke={textColor}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                borderColor: tooltipBorder,
                color: textColor,
              }}
              labelStyle={{ color: textColor }}
              itemStyle={{ color: textColor }}
            />
            <Area 
              type="monotone" 
              dataKey="hours" 
              stroke="rgba(59, 130, 246, 0.8)" 
              fill="rgba(59, 130, 246, 0.2)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

ActivityChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      hours: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};
