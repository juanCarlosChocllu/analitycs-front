import { Card as MUICard, CardContent, Typography } from "@mui/material";

export const Card = ({ title, value }:{title:string, value:number}) => {
    return (
        <MUICard
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <CardContent sx={{ textAlign: 'center', paddingBottom: '8px !important' }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight="bold"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="subtitle1" color="primary" fontWeight="600">
          {value.toLocaleString('en-US')}
        </Typography>
      </CardContent>
    </MUICard>
    );
};

