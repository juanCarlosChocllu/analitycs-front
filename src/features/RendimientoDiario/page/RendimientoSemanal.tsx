import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Backdrop,
    Stack,
    CircularProgress,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import { formatearMoneda } from "../utils/formatoMoneda";
import type { filtroBuscadorI } from "../../app/interfaces/BuscadorI";
import { BuscadorBase } from "../../app/components/Buscador/BuscadorBase";
import type { AsesorSemanal, DatosAsesor, RespuestaProcesadaPorSemanas, SemanaDatos, SucursalPorSemanas } from "../interface/RendimientoDiario";
import { listarRendimientoAsesor } from "../service/RendimientoDiarioService";
import { procesarDatosPorSemanas } from "../utils/procesarData";
import { tasaDeConversion, ticketPromedio } from "../../app/util/ticketPromedio";

export const RendimientoSemanal = () => {
    const [filtro, setFiltro] = useState<filtroBuscadorI>({});
    const [datos, setDatos] = useState<DatosAsesor[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultado, setResultado] = useState<RespuestaProcesadaPorSemanas>();

    useEffect(() => {
        listarRendimiento();
    }, [filtro]);

    useEffect(() => {
        setResultado(procesarDatosPorSemanas(datos));
    }, [datos]);

    const listarRendimiento = async () => {
        try {
            setLoading(true);
            const response = await listarRendimientoAsesor(filtro);
            setDatos(response.filter((item) => item.ventas.length > 0));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const calcularTotales = (numeros: number[]):number => {
        return Number(numeros.reduce((acumulador, numero) => acumulador + numero, 0).toFixed(2));
    }




    const Loader = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Stack alignItems="center" spacing={2}>
                        <CircularProgress color="inherit" />
                        <Typography variant="h6" component="div">
                            Cargando...
                        </Typography>
                    </Stack>
                </Backdrop>
            </Box>
        )
    }

    return (
        <>
            <BuscadorBase setFiltro={setFiltro} filtro={filtro} />
            {loading ? (
                <Loader />
            ) : (
                <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: { xs: 2.5, md: 4 } }}>
                    <Box sx={{ maxWidth: 1280, mx: "auto" }}>
                        {/* Header */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: { xs: "flex-start", md: "center" },
                                justifyContent: "space-between",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Box>
                                <Typography variant="h4" fontWeight={800} gutterBottom color="#353f4f" sx={{ textAlign: "center", textTransform: "uppercase" }}>
                                    Rendimiento Semanal
                                </Typography>
                            </Box>
                        </Box>

                        {/*Aqui tiene que estar los KPI*/}
                        {/* Tabla de desempeño detallado */}

                        {resultado?.map((data: SucursalPorSemanas) => (
                            <div key={data.sucursal}  >
                                <Typography variant="h6" fontWeight={700} style={{ marginTop: 16, backgroundColor: "#a9fce8", padding: 16, borderRadius: 16, alignItems: "center", display: "flex", justifyContent: "center", width: "100%", textAlign: "center", color: "#093d30" }}>
                                        {data.sucursal}
                                </Typography>

                                {data.semanas.map((semana: SemanaDatos) => (
                                    <Card
                                        key={semana.semana}
                                        component={Paper}
                                        sx={{ mt: 3, borderRadius: 3, bgcolor: "#f0fcf4" }}
                                    >
                                    <CardHeader
                                        title={
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <FlagIcon color="primary" fontSize="small" />
                                                <Typography variant="h6" fontWeight={700}>
                                                    Resumen de desempeño semanal: {semana.fechaInicio} - {semana.fechaFin}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                    <CardContent>
                                        <Box sx={{ overflowX: "auto" }}>
                                            <Table size="small" aria-label="tabla-semanal">
                                                <TableHead>
                                                    <TableRow sx={{ "& th": { fontWeight: 700, fontSize: 14 } }}>
                                                        <TableCell sx={{ textTransform: "uppercase" }}>
                                                            Asesores
                                                        </TableCell>
                                                        {/* Nombres de asesores */}
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>{asesor.asesor}</div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ bgcolor: "#22c55e", color: "#0f172a" }}
                                                        >
                                                            Total semanal
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ bgcolor: "#a3e635", color: "#0f172a" }}
                                                        >
                                                            Meta equipo
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {/* Monto total ventas */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Monto total ventas
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {formatearMoneda(asesor.montoTotalVentasSemanal)}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {formatearMoneda(calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => asesor.montoTotalVentasSemanal)))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>
                                                    {/* Atenciones */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Atenciones
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {asesor.atencionesSemanal}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => asesor.atencionesSemanal))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>
                                                    {/* Cantidad de tickets */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Cantidad de tickets
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {asesor.ticketSemanal}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => asesor.ticketSemanal))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>
                                                    {/* Ticket Promedio */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Ticket promedio
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {formatearMoneda(Number(ticketPromedio(asesor.ticketSemanal, asesor.montoTotalVentasSemanal)))}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {/*totalesSemanales.asesores*/} {formatearMoneda(Number(calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => Number(ticketPromedio(asesor.ticketSemanal, asesor.montoTotalVentasSemanal))))))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/}
                                                        </TableCell>
                                                    </TableRow>
                                                    {/* Tasa de conversion */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Tasa de conversion
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {tasaDeConversion(asesor.ticketSemanal, asesor.atencionesSemanal)}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {/*totalesSemanales.asesores*/} 
                                                            {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => Number(tasaDeConversion(asesor.ticketSemanal, asesor.atencionesSemanal))))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>

                                                    {/* Cantidad Total de Lentes */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Cantidad Total de Lentes
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {asesor.cantidadLenteSemanal}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {/*totalesSemanales.asesores*/} {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => Number(asesor.cantidadLenteSemanal)))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>

                                                    {/* Porcentaje AR */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Porcentaje AR
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {tasaDeConversion(asesor.antireflejoSemanal, asesor.ticketSemanal)}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {/*totalesSemanales.asesores*/} {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => Number(tasaDeConversion(asesor.antireflejoSemanal, asesor.ticketSemanal))))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>



{/*hasta Aqui esta listo*/}
                                                    {/* Porcentaje Progresivos */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Porcentaje Progresivos
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {tasaDeConversion(asesor.progresivosSemanal, asesor.ticketSemanal)}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {/*totalesSemanales.asesores*/} {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => Number(tasaDeConversion(asesor.progresivosSemanal, asesor.ticketSemanal))))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>

                                                    {/* Porcentaje segundos pares */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Porcentaje segundos pares
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {tasaDeConversion(asesor.segundoParSemanal, asesor.ticketSemanal)}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {/*totalesSemanales.asesores*/} {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => Number(tasaDeConversion(asesor.segundoParSemanal, asesor.ticketSemanal))))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>

                                                    {/* Porcentaje lentes de contacto */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Porcentaje lentes de contacto
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {tasaDeConversion(asesor.lcSemanal, asesor.ticketSemanal)}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {/*totalesSemanales.asesores*/} {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => Number(tasaDeConversion(asesor.lcSemanal, asesor.ticketSemanal))))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>
                                                      {/* Porcentaje lentes de contacto */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Porcentaje lentes de contacto
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {tasaDeConversion(asesor.lcSemanal, asesor.ticketSemanal)}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {/*totalesSemanales.asesores*/} {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => Number(tasaDeConversion(asesor.lcSemanal, asesor.ticketSemanal))))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>

                                                    {/* Entregados */}
                                                    <TableRow hover>
                                                        <TableCell sx={{ fontWeight: 600 }}>
                                                            Entregados
                                                        </TableCell>
                                                        {semana.asesores.map((asesor: AsesorSemanal) => (
                                                            <TableCell align="center" sx={{ minWidth: 88 }}>
                                                                <div key={asesor.idAsesor}>
                                                                    {asesor.entregasSemanal}
                                                                </div>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#daf0e1" }}
                                                        >
                                                            {/*totalesSemanales.asesores*/} {calcularTotales(semana.asesores.map((asesor: AsesorSemanal) => Number(asesor.entregasSemanal)))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ fontWeight: 700, bgcolor: "#e5f7dd" }}
                                                        >
                                                            {/*metasSemanales.advisors*/} 0
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </CardContent>
                                </Card>
                                ))}
                                </div>
                            ))}



                        {/* Progreso de metas + Resumen ejecutivo */}

                    </Box>
                </Box>
            )}
        </>
    );
};
