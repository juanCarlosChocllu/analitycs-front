import { useEffect, useState } from "react";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { Award, Building2, Loader } from "lucide-react";
import { Top10Ticket } from "../components/Top10Ticket";
import type { DataAsesor } from "../interface/asersor.interface";
import { getIndicadoresPorAsesor } from "../service/sucursalService";
import { EmptyState } from "../../app/components/NoEncontrado/EmptyState";
import { TablaSucursales } from "../components/TablaSucursales";
import { Box } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BuscadorBase } from "../../app/components/Buscador/BuscadorBase";

const sugerencias = [
    "Verifica si ingresaste correctamente los filtros",
]

export const RendimientoAsesoresPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [filtro, setFiltro] = useState<filtroBuscadorI>({});
    const [data, setData] = useState<DataAsesor[]>([]);
    const [value, setValue] = useState('1');
    useEffect(() => {
        listarIndicadoresAsesor();
    }, [filtro]);
    const handleChange = (newValue: string) => {
        setValue(newValue);
      };
    const listarIndicadoresAsesor = async () => {
        try {
            setLoading(true);
            const response = await getIndicadoresPorAsesor(filtro);
            setData(response.filter((item)=> item.totalTicket > 0 ));
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener indicadores:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 ">

            <BuscadorBase setFiltro={setFiltro} filtro={filtro} />
            {data.length === 0 ? <EmptyState suggestions={sugerencias} /> : (
                <>
                    {loading ? <Loader className="animate-spin" />
                        :
                        <Box sx={{ width: '100%', typography: 'body1'}}>
                            <TabContext value={value} >
                                <Box
                                    sx={{
                                        borderColor: 'divider',
                                        p: 1,
                                        gap: 2,
                                    }}
                                >
                                    <TabList
                                        onChange={(_, newValue) => handleChange(newValue)}
                                        aria-label="Tabs"
                                        sx={{
                                            '& .MuiTab-root': {
                                                color: '#4c5663',
                                                backgroundColor: '#f7f9fa',
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                px: 2,
                                                py: 1,
                                                '&.Mui-selected': {
                                                    backgroundColor: '#2664eb',
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                },
                                            },
                                        }}
                                    >
                                        <Tab
                                            icon={<Award />}
                                            label="Top 10"
                                            value="1"
                                            sx={{
                                                width: '15%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 1,
                                            }}
                                        />
                                        <Tab
                                            icon={<Building2 />}
                                            label="Sucursales"
                                            value="2"
                                            sx={{
                                                width: '15%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 1,
                                            }}
                                        />
                                    </TabList>

                                </Box>
                                <TabPanel value="1">
                                    <Top10Ticket data={data} atributo="totalTicket" title="Top 10 Ticket" tipo="ticket" />
                                    <Top10Ticket data={data} atributo="ventaTotal" title="Top 10 Venta" tipo="venta" />
                                </TabPanel>
                                <TabPanel value="2">
                                    <TablaSucursales data={data} />
                                </TabPanel>
                            </TabContext>
                        </Box>
                    }
                </>
            )}



        </div>
    )
}
