import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Bubblechart from "../../components/Bubblehart";

const Line = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box
          backgroundColor={colors.primary[400]}
          p="20px"
          borderRadius="8px"
        >
          <Typography variant="h5" mb="20px">
           Bubble chart
          </Typography>
          <Box height="400px">
            <Bubblechart isDashboard={true} />
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
};

export default Line;
