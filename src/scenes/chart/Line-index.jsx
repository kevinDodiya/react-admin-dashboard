import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Linechart from "../../components/Linechart";

const Bar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box backgroundColor={colors.primary[400]} p="20px" borderRadius="8px">
          <Typography variant="h5" mb="20px">
            Graph of intensity of sector
          </Typography>
          <Box height="400px">
            <Linechart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Bar;