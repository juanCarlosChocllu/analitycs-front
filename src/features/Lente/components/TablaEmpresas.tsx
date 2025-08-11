import { Box } from "@mui/material";
import { TablaSucursales } from "./TablaSucursales";

import type {  Kpisucursal } from "../interface/sucursal.interface";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { calculateFooterOpticentro } from "../utils/footerOptiCentro";
import { calculateFooterEconoVision } from "../utils/footerEconoVision";
import { calculateFooterTuOptica } from "../utils/footerTuOptica";
import { calculateFooterOferService } from "../utils/footerOferService";

interface TablaTotalEmpresaProps {
    data: Kpisucursal[];
    filtro: filtroBuscadorI;
}

export const TablaEmpresas = ({ data, filtro }: TablaTotalEmpresaProps) => {



    return (
        <Box className="h-full p-2">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4 ">EMPRESAS</h2>
            {data.map((item: Kpisucursal) => {
                if (item.empresa === 'OPTICENTRO') {
                    return (
                        <Box key={item.idEmpresa} className='mb-4 rounded-lg border-blue-800 border-2'>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{item.empresa}</h2>
                            <TablaSucursales
                                data={item.data}
                                filtro={filtro}
                                empresa={item.idEmpresa}
                                tipoTabla='sinFotosensibles'
                                footerValues={calculateFooterOpticentro(item.data)}
                            />
                        </Box>
                    );
                } else if (item.empresa === 'ECONOVISION') {
                    return (
                        <Box key={item.idEmpresa} className='border-2 mb-4 rounded-lg border-blue-800'>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{item.empresa}</h2>
                            <TablaSucursales
                                data={item.data}
                                filtro={filtro}
                                empresa={item.idEmpresa}
                                tipoTabla='fotosensibles'
                                footerValues={calculateFooterEconoVision(item.data)}
                            />
                        </Box>
                    );
                } else if (item.empresa === 'TU OPTICA') {
                    return (
                        <Box key={item.idEmpresa} className='mb-4 border-2 rounded-lg border-blue-800'>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{item.empresa}</h2>
                            <TablaSucursales
                                data={item.data}
                                filtro={filtro}
                                empresa={item.idEmpresa}
                                tipoTabla='fotosensibles'
                                footerValues={calculateFooterTuOptica(item.data)}
                            />
                        </Box>
                    );
                } else if (item.empresa === 'OPTISERVICE S.R.L') {
                    return (
                        <Box key={item.idEmpresa} className='border-2 mb-4 rounded-lg border-blue-800'>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{item.empresa}</h2>
                            <TablaSucursales
                                data={item.data}
                                filtro={filtro}
                                empresa={item.idEmpresa}
                                tipoTabla='fotocromatico'
                                footerValues={calculateFooterOferService(item.data) }
                            />
                        </Box>
                    );
                }
                return <div key={item.idEmpresa}>{JSON.stringify(item)}</div>;
            })}
        </Box>
    );
};