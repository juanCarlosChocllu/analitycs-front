import {
  House,
  TrafficCone,
  Briefcase,
  BarChartHorizontal,
  Activity,
  Stethoscope,
  Target,
  Users,
  FileText,
  Circle,
} from 'lucide-react';
import type { MenuItem } from '../../../interfaces/menu';


export const menuItems: MenuItem[] = [
  {
    id: 1,
    text: 'Mi cuenta',
    icon: <House className="text-white" />,
    roles: ['ADMINISTRADOR'],
    items: [
      { text: 'Perfil', icon: <Circle className="text-white w-3 h-3" />, link: 'https://analitycs-frontend.vercel.app/perfil' },
    ]
  },
  {
    id: 2,
    roles: ['ADMINISTRADOR'],
    text: 'Trafico', icon: <TrafficCone className="text-white" />,
    items: [
      { text: 'Trafico', icon: <Circle className="text-white w-3 h-3" />, link: 'https://analitycs-frontend.vercel.app/trafico' },
    ]
  },
  {
    id: 3,
    roles: ['ADMINISTRADOR'],
    text: 'Gestion', icon: <Briefcase className="text-white" />,
    items: [
      { text: 'Indicadores por Sucursal', icon: <Circle className="text-white w-3 h-3" />, link: '/indicadores/sucursal' },
      { text: 'Rendimiento Asesores de Venta', icon: <Circle className="text-white w-3 h-3" />, link: '/rendimiento' },
    ]
  },
  {
    id: 4,
    roles: ['ADMINISTRADOR'],
    text: 'Comparativos', icon: <BarChartHorizontal className="text-white" />,
    items: [
      { text: 'Comparaciones', icon: <Circle className="text-white w-3 h-3" />, link: '/comparaciones' },
    ]
  },
  {
    id: 5,
    roles: ['ADMINISTRADOR'],
    text: 'Kpis', icon: <Activity className="text-white" />,
    items: [
      { text: 'Kpi sucursal', icon: <Circle className="text-white w-3 h-3" />, link: '/kpi/lentes' },
      { text: 'Kpi asesor', icon: <Circle className="text-white w-3 h-3" />, link: '/kpi/asesores' },
      { text: 'Kpi material', icon: <Circle className="text-white w-3 h-3" />, link: 'https://analitycs-frontend.vercel.app/kpi/material' },
      { text: 'Kpi monturas vip', icon: <Circle className="text-white w-3 h-3" />, link: 'https://analitycs-frontend.vercel.app/kpi/monturas/vip' },
      { text: 'Kpi monturas', icon: <Circle className="text-white w-3 h-3" />, link: '/kpi/monturas' },
      { text: 'Kpi lente de contacto', icon: <Circle className="text-white w-3 h-3" />, link: 'https://analitycs-frontend.vercel.app/kpi/lentes/contactos' },
      { text: 'Kpi gafa', icon: <Circle className="text-white w-3 h-3" />, link: 'https://analitycs-frontend.vercel.app/kpi/gafa' },
    ]
  },
  {
    id: 6,
    roles: ['ADMINISTRADOR'],
    text: 'Medicos', icon: <Stethoscope className="text-white" />,
    items: [
      { text: 'Medicos', icon: <Circle className="text-white w-3 h-3" />, link: '/kpi/medicos' },
      { text: 'Receta Medico', icon: <Circle className="text-white w-3 h-3" />, link: '/kpi/receta/medico' },
    ]
  },
  {
    id: 7,
    roles: ['ADMINISTRADOR'],
    text: 'Metas', icon: <Target className="text-white" />,
    items: [
      { text: 'Listar Dias', icon: <Circle className="text-white w-3 h-3" />, link: 'https://analitycs-frontend.vercel.app/dias/listar' },
      { text: 'Listar Metas', icon: <Circle className="text-white w-3 h-3" />, link: 'https://analitycs-frontend.vercel.app/metas/listar' },
      { text: 'Metas sucursal', icon: <Circle className="text-white w-3 h-3" />, link: '/metas/sucursal' },
    ]
  },

  {
    id: 8,
    roles: ['ADMINISTRADOR', "GESTOR", "ASESOR"],
    text: 'Rendimiento asesor', icon: <Target className="text-white" />,
    items: [
      { text: 'Inicio', roles: ['ASESOR', 'GESTOR'], icon: <Circle className="text-white w-3 h-3" />, link: '/asesor/inicio' },
      { text: 'Listar', roles: ['ASESOR', 'GESTOR'], icon: <Circle className="text-white w-3 h-3" />, link: '/rendimiento/diario' },
      { text: 'Listar redimiento por sucursal',roles: ['ADMINISTRADOR'], icon: <Circle className="text-white w-3 h-3" />, link: '/listar/rendimiento/asesor' },

    ]
  },


  {
    id: 9,
    roles: ['ADMINISTRADOR'],
    text: 'Usuarios', icon: <Users className="text-white" />,
    items: [
      { text: 'Listar Usuarios', icon: <Circle className="text-white w-3 h-3" />, link: '/usuarios' },
    ]
  },
  {
    id: 9,
    roles: ['ADMINISTRADOR'],
    text: 'Logs del sistema', icon: <FileText className="text-white" />,
    items: [
      { text: 'Logs de descargas', icon: <Circle className="text-white w-3 h-3" />, link: '/log/descargas' },
    ]
  },
];