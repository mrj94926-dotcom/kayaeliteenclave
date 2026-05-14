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
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#D4AF37', fontWeight: 600 }}
          />
          <Area 
            type="monotone" 
            dataKey="leads" 
            stroke="#D4AF37" 
            fillOpacity={1} 
            fill="url(#colorLeads)" 
            strokeWidth={2.5}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConversionPieChart() {
  const pieData = [
    { name: 'Social', value: 400, color: '#D4AF37' },
    { name: 'Search', value: 300, color: '#1E293B' },
    { name: 'Referral', value: 300, color: '#94A3B8' },
    { name: 'Direct', value: 200, color: '#E2E8F0' },
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
            tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip 
            cursor={{ fill: '#F8FAFC' }}
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              fontSize: '11px'
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
