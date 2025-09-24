import {
  Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import type { categoriaAgrupadaI } from '../interface/productos';
import { porcentaje } from '../../Medicos/utils/funcionesDeCalculo';



const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8020"];

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize={12}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export const GraficoProducto = ({dataAgrupada}:{dataAgrupada:categoriaAgrupadaI[]}) => {
   const dataSetTorta = dataAgrupada.map((item)=> ({name:item.categoria, value: porcentaje(item.ventaActual, dataAgrupada.reduce((acc, i)=> acc + i.ventaActual, 0 )) }))
   const dataSetBarra = dataAgrupada.map((item)=> ({name:item.categoria, totalVenta: item.ventaActual}))
   
  return (
    <div style={{
      display: "flex",
      width: "100%",
      gap: "24px",
      padding: "16px",
      boxSizing: "border-box",
    }}>
      {/* Gráfico de Pastel */}
      <div style={{
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
     
        flexDirection: "column",
      }}>
        <h3 style={{
          marginBottom: "16px",
          fontSize: "16px",
          color: "#333",
          textAlign: "center",
        }}>Share Venta Rango Precio</h3>
        <div style={{ flex: 1, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataSetTorta}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dataSetTorta.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}>
        <h3 style={{
          marginBottom: "16px",
          fontSize: "16px",
          color: "#333",
          textAlign: "center",
        }}>Volumen Ventas Unidad</h3>
        <div style={{ flex: 1, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataSetBarra} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalVenta" fill= "#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
