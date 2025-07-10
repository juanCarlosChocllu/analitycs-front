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

export const menuItems = [
    { 
    id: 1,
    text: 'Mi cuenta', 
    icon: <House className="text-white" />,
      items: [
        {text: 'Perfil', icon: <Circle className="text-white w-3 h-3" /> , link: '/perfil'}, 
      ] 
    },
    { 
    id: 2,
    text: 'Trafico', icon: <TrafficCone className="text-white" />,
      items: [
        {text: 'Trafico', icon: <Circle className="text-white w-3 h-3" /> , link: '/trafico'}, 
      ] 
    },
    { 
    id: 3,
    text: 'Gestion', icon: <Briefcase className="text-white" />,
      items: [
        {text: 'Indicadores por Sucursal', icon: <Circle className="text-white w-3 h-3" /> , link: '/indicadores/sucursal'}, 
        {text: 'Indicadores por Fecha', icon: <Circle className="text-white w-3 h-3" /> , link: '/indicadores/fecha'}, 
        {text: 'Rendimiento Asesores de Venta', icon: <Circle className="text-white w-3 h-3" /> , link: '/rendimiento'}, 
      ] 
     },
    { 
    id: 4,
    text: 'Comparativos', icon: <BarChartHorizontal className="text-white" />,
      items: [
        {text: 'Comparaciones', icon: <Circle className="text-white w-3 h-3" /> , link: '/comparaciones'}, 
      ] 
     },
    { 
    id: 5,
    text: 'Kpis', icon: <Activity className="text-white" />,
      items: [
        {text: 'Kpi sucursal', icon: <Circle className="text-white w-3 h-3" /> , link: '/kpi/lentes'}, 
        {text: 'Kpi asesor', icon: <Circle className="text-white w-3 h-3" /> , link: '/kpi/asesor/lente'}, 
        {text: 'Kpi material', icon: <Circle className="text-white w-3 h-3" /> , link: '/kpi/material'}, 
        {text: 'Kpi monturas vip', icon: <Circle className="text-white w-3 h-3" /> , link: '/kpi/monturas/vip'}, 
        {text: 'Kpi monturas', icon: <Circle className="text-white w-3 h-3" /> , link: '/kpi/monturas'}, 
        {text: 'Kpi lente de contacto', icon: <Circle className="text-white w-3 h-3" /> , link: '/kpi/lentes/contactos'}, 
        {text: 'Kpi gafa', icon: <Circle className="text-white w-3 h-3" /> , link: '/kpi/gafa'}, 
      ] 
     },
    { 
    id: 6,
    text: 'Medicos', icon: <Stethoscope className="text-white" />,
      items: [
        {text: 'Medicos', icon: <Circle className="text-white w-3 h-3" /> , link: '/kpi/medicos'},
        {text: 'Receta Medico', icon: <Circle className="text-white w-3 h-3" /> , link: '/kpi/receta/medico'}, 
      ] 
     },
    { 
    id: 7,
    text: 'Metas', icon: <Target className="text-white" />,
      items: [
        {text: 'Listar Dias', icon: <Circle className="text-white w-3 h-3" /> , link: '/dias/listar'}, 
        {text: 'Listar Metas', icon: <Circle className="text-white w-3 h-3" /> , link: '/metas/listar'}, 
        {text: 'Metas sucursal', icon: <Circle className="text-white w-3 h-3" /> , link: '/metas/sucursal'}, 
      ] 
     },
    { 
    id: 8,
    text: 'Usuarios', icon: <Users className="text-white" />,
      items: [
        {text: 'Listar Usuarios', icon: <Circle className="text-white w-3 h-3" /> , link: '/usuarios'}, 
      ] 
     },
    { 
    id: 9,
    text: 'Logs del sistema', icon: <FileText className="text-white" />,
      items: [
        {text: 'Logs de descargas', icon: <Circle className="text-white w-3 h-3" /> , link: '/log/descargas'}, 
      ] 
     },
  ];