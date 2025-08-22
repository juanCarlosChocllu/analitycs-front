import { Box, Checkbox, FormControlLabel, Grid, InputLabel, Stack, TextField } from "@mui/material";

interface FiltroFechaProps {
    etiqueta: string;
    activo: boolean;
    fechaInicio: string;
    fechaFin: string;
    onToggle: () => void;
    onFechaInicioChange: (fecha: string) => void;
    onFechaFinChange: (fecha: string) => void;
}

export const FiltroFecha = ({
    etiqueta,
    activo,
    fechaInicio,
    fechaFin,
    onToggle,
    onFechaInicioChange,
    onFechaFinChange,
}: FiltroFechaProps) => {
    return (
        <Stack spacing={2}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={activo}
                        onChange={onToggle}
                    />
                }
                label={etiqueta}
            />

            {activo && (
                <Box
                    sx={{
                        gap: 2,
                        pl: 3,
                        borderLeft: '2px solid',
                        borderColor: '#E0E0E0',
                    }}
                >
                    <Grid container spacing={2}>
                        <Stack spacing={1}>
                            <InputLabel>Fecha de Inicio</InputLabel>
                            <TextField
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => onFechaInicioChange(e.target.value)}
                                fullWidth
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <InputLabel>Fecha de Fin</InputLabel>
                            <TextField
                                type="date"
                                value={fechaFin}
                                onChange={(e) => onFechaFinChange(e.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                </Box>
            )}
        </Stack>
    );
}
