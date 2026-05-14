"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from "framer-motion";

const data = [
  { name: 'Jan', leads: 40, conversion: 24 },
  { name: 'Feb', leads: 30, conversion: 13 },
  { name: 'Mar', leads: 20, conversion: 98 },
  { name: 'Apr', leads: 27, conversion: 39 },
  { name: 'May', leads: 18, conversion: 48 },
  { name: 'Jun', leads: 23, conversion: 38 },
  { name: 'Jul', leads: 34, conversion: 43 },
];

export function LeadGrowthChart() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #1e293b',
              borderRadius: '8px',
              color: '#fff'
            }}
            itemStyle={{ color: '#d4af37' }}
          />
          <Area 
            type="monotone" 
            dataKey="leads" 
            stroke="#d4af37" 
            fillOpacity={1} 
            fill="url(#colorLeads)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConversionPieChart() {
  const pieData = [
    { name: 'Social', value: 400, color: '#d4af37' },
    { name: 'Search', value: 300, color: '#1e293b' },
    { name: 'Referral', value: 300, color: '#334155' },
    { name: 'Direct', value: 200, color: '#475569' },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={pieData} layout="vertical">
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #1e293b',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
