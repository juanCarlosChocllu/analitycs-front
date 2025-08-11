
import { Box } from "@mui/material";
import { TablaAsesores } from "./TablaAsesores";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import type { Asesores, Datum } from "../interface/asesor.interface";


interface TablaTotalAsesorProps {
    data: Asesores[];
    filtro: filtroBuscadorI;
}

export const TablaAsesorLentes = ({ data, filtro }: TablaTotalAsesorProps) => {

    console.log("data Asesor Lentes:", JSON.stringify(data));

    return (
        <Box className="h-full p-2">
            {data.map((item: Asesores) => {
                console.log("item Asesor Lentes:", JSON.stringify(item));
                if (item.empresa === 'OPTICENTRO') {
                    return (
                        <Box key={item.idEmpresa} className='mb-4 rounded-lg border-blue-800 border-2'>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{item.empresa}</h2>
                            {
                                item.data.map((data: Datum) => {
                                    return (
                                        <Box key={data.idSucursal}>
                                            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">{data.sucursal}</h2>
                                            <TablaAsesores
                                                data={data}
                                                filtro={filtro}
                                                empresa={item.idEmpresa}
                                                tipoTabla='sinFotosensibles'
                                            />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                    );
                } else if (item.empresa === 'ECONOVISION') {
                    return (
                        <Box key={item.idEmpresa} className='border-2 mb-4 rounded-lg border-blue-800'>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{item.empresa}</h2>
                            {
                                item.data.map((data: Datum) => {
                                    return (
                                        <Box key={data.idSucursal}>
                                            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">{data.sucursal}</h2>
                                        <TablaAsesores
                                            data={data}
                                            filtro={filtro}
                                            empresa={item.idEmpresa}
                                            tipoTabla='fotosensibles'
                                        />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                    );
                } else if (item.empresa === 'TU OPTICA') {
                    return (
                        <Box key={item.idEmpresa} className='mb-4 border-2 rounded-lg border-blue-800'>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{item.empresa}</h2>
                            {
                                item.data.map((data: Datum) => {
                                    return (
                                        <Box key={data.idSucursal}>
                                            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">{data.sucursal}</h2>
                                        <TablaAsesores
                                            data={data}
                                            filtro={filtro}
                                            empresa={item.idEmpresa}
                                            tipoTabla='fotosensibles'
                                        />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                    );
                } else if (item.empresa === 'OPTISERVICE S.R.L') {
                    return (
                        <Box key={item.idEmpresa} className='border-2 mb-4 rounded-lg border-blue-800'>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{item.empresa}</h2>
                            {
                                item.data.map((data: Datum) => {
                                    return (
                                        <Box key={data.idSucursal}>
                                            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">{data.sucursal}</h2>
                                        <TablaAsesores
                                            data={data}
                                            filtro={filtro}
                                            empresa={item.idEmpresa}
                                            tipoTabla='fotocromatico'
                                        />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                    );
                }
                return <div key={item.idEmpresa}>{JSON.stringify(item)}</div>;
            })}
        </Box>
    );
};