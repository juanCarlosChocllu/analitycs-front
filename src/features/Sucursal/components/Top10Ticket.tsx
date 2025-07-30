import { useMemo, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart3, TrendingUp, Award, Users, Filter, Download } from "lucide-react";
import type { DataAsesor, ProcesedData } from "../interface/asersor.interface";
import { TablaTop10 } from "./TablaTop10";

interface TablaTop10Props {
    data: DataAsesor[];
    atributo:  "totalTicket" | "ventaTotal";
    title: string;
    tipo: "ticket" | "venta";
}

export const Top10Ticket = ({ data, atributo, title, tipo }: TablaTop10Props) => {
    const [chartType, setChartType] = useState<string>("bar");

    const processedData = useMemo(() => {
        const sucursales: Record<string, DataAsesor[]> = {};
        const allAsesores: DataAsesor[] = [];

        data.forEach((item) => {
            if (!sucursales[item.sucursal]) {
                sucursales[item.sucursal] = [];
            }
            sucursales[item.sucursal].push(item);
            allAsesores.push(item);
        });

        Object.keys(sucursales).forEach((sucursal) => {
            sucursales[sucursal].sort((a, b) => b[atributo] - a[atributo]);
        });

        allAsesores.sort((a, b) => b[atributo] - a[atributo]);

        return {
            sucursales,
            allAsesores: allAsesores.slice(0, 10),
        } as ProcesedData;
    }, [data]);

    const formatName = (name: string) => {
        const words = name.split(' ');
        if (words.length > 2) {
            return `${words[0]} ${words[1]}...`;
        }
        return name;
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800 mb-2">{label}</p>
                    <p className="text-blue-600">
                        <span className="font-medium">Total {tipo}: </span>
                        {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                            <Award className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                            <p className="text-gray-600 mt-1">Ranking por cantidad de {tipo} procesados</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            <Filter className="h-4 w-4" />
                            <span>Filtros</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Download className="h-4 w-4" />
                            <span>Exportar</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Asesores</p>
                            <p className="text-2xl font-bold text-gray-900">{processedData.allAsesores.length}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Mejor Performer</p>
                            <p className="text-2xl font-bold text-gray-900">{processedData.allAsesores[0]?.totalTicket || 0}</p>
                            <p className="text-xs text-gray-500 mt-1">{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {processedData.allAsesores.reduce((sum, asesor) => sum + asesor.totalTicket, 0)}
                            </p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <BarChart3 className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Tabla de Rendimiento</h2>
                <div className="overflow-x-auto">
                    <TablaTop10 data={processedData.allAsesores} />
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Visualización de Datos {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setChartType("bar")}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${chartType === "bar"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                <BarChart3 className="h-4 w-4" />
                                <span>Barras</span>
                            </button>
                            <button
                                onClick={() => setChartType("line")}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${chartType === "line"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                <TrendingUp className="h-4 w-4" />
                                <span>Líneas</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6" style={{ height: '500px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === "bar" ? (
                            <BarChart
                                data={processedData.allAsesores}
                                layout="vertical"
                                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    type="number"
                                    stroke="#64748b"
                                    fontSize={12}
                                />
                                <YAxis
                                    dataKey="asesor"
                                    type="category"
                                    width={200}
                                    tick={{ fontSize: 11, fill: '#64748b' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar
                                    dataKey="totalTicket"
                                    fill="url(#gradient)"
                                    radius={[0, 4, 4, 0]}
                                    name={`Total ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        ) : (
                            <LineChart
                                data={processedData.allAsesores}
                                margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="asesor"
                                    stroke="#64748b"
                                    fontSize={10}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    tickFormatter={formatName}
                                />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="totalTicket"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                                    activeDot={{ r: 8, fill: '#8b5cf6' }}
                                    name="Total Tickets"
                                />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
