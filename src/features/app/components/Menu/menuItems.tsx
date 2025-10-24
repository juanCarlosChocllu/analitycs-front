import {
  House,
  TrafficCone,
  Briefcase,
  BarChartHorizontal,
  Activity,
  Stethoscope,
  Target,
  Users,
  Circle,
} from "lucide-react";
import type { MenuItem } from "../../interfaces/menu";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    text: "Mi cuenta",
    icon: <House className="text-white" />,
    roles: ["ADMINISTRADOR", "GESTOR", "ASESOR"],
    items: [
      {
        text: "Perfil",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/inicio",
      },
    ],
  },
  {
    id: 2,
    roles: ["ADMINISTRADOR"],
    text: "Trafico",
    icon: <TrafficCone className="text-white" />,
    items: [
      {
        text: "Trafico",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/inicio",
      },
    ],
  },
  {
    id: 3,
    roles: ["ADMINISTRADOR"],
    text: "Gestion",
    icon: <Briefcase className="text-white" />,
    items: [
      {
        text: "Indicadores por Sucursal",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/indicadores/sucursal",
      },
      {
        text: "Rendimiento Asesores de Venta",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/rendimiento",
      },
       {
        text: "Reporte de cotizaciones",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/reporte/cotizacion",
      },
    ],
  },
  {
    id: 4,
    roles: ["ADMINISTRADOR"],
    text: "Comparativos",
    icon: <BarChartHorizontal className="text-white" />,
    items: [
      {
        text: "Comparaciones",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/comparaciones",
      },
    ],
  },
  {
    id: 5,
    roles: ["ADMINISTRADOR"],
    text: "Kpis",
    icon: <Activity className="text-white" />,
    items: [
      {
        text: "Kpi sucursal",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/kpi/lentes",
      },
      {
        text: "Kpi asesor",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/kpi/asesores",
      },
       {
        text: "Kpi material",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/kpi/material",
      },
      { text: 'Kpi Productos', icon: <Circle className="text-white w-3 h-3" />, link: '/kpi/producto' },
      
    ],
  },
  {
    id: 6,
    roles: ["ADMINISTRADOR"],
    text: "Medicos",
    icon: <Stethoscope className="text-white" />,
    items: [
      {
        text: "Medicos",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/kpi/medicos",
      },
      {
        text: "Receta Medico",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/kpi/receta/medico",
      },
    ],
  },
  {
    id: 7,
    roles: ["ADMINISTRADOR"],
    text: "Metas",
    icon: <Target className="text-white" />,

    items: [
      {
        text: "Listar Dias",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/dias/listar",
      },
      {
        text: "Listar Metas",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/metas/listar",
      },
      {
        text: "Metas sucursal",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/metas/sucursal",
      },
    ],
  },
  {
    id: 8,
    roles: ["ADMINISTRADOR"],
    text: "Productos",
    icon: <Target className="text-white" />,

    items: [
      {
        text: "Reporte de productos",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/producto/reporte",
      },
      {
        text: "Marcas",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/listar/marca",
      },
      
    ],
  },
  {
    id: 9,
    roles: ["ADMINISTRADOR", "GESTOR", "ASESOR"],
    text: "Planilla de rendimiento",
    icon: <Target className="text-white" />,
    items: [
      {
        text: "Dias de trabajo",
        roles: ["ADMINISTRADOR", "GESTOR"],
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/crear/jornada",
      },
      {
        text: "Resumen de Desempeño diario",
        roles: ["ADMINISTRADOR"],
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/listar/rendimiento/asesor",
      },
      {
        text: "Resumen de Desempeño Semanal",
        roles: ["ADMINISTRADOR"],
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/rendimiento/semanal/asesor",
      },

      {
        text: "Rendimiento diario",
        roles: ["ASESOR", "GESTOR"],
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/rendimiento/diario",
      },
    
      {
        text: "Rendimiento de ventas por asesor",
        roles: ["ADMINISTRADOR"],
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/avance/metas/asesor",
      },
      {
        text: "Rendimiento de ventas por asesor",
        roles: ["ADMINISTRADOR"],
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/avance/ventas/asesor",
      },
    ],
  },

  {
    id: 10,
    roles: ["ADMINISTRADOR"],
    text: "Usuarios",
    icon: <Users className="text-white" />,
    items: [
      {
        text: "Listar Usuarios",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/usuarios",
      },
      {
        text: "Asesores",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/asesor/usuarios",
      },
    ],
  },
  /*  {
    id: 10,
    roles: ["ADMINISTRADOR"],
    text: "Logs del sistema",
    icon: <FileText className="text-white" />,
    items: [
      {
        text: "Logs de descargas",
        icon: <Circle className="text-white w-3 h-3" />,
        link: "/log/descargas",
      },
    ],
  },*/
];
