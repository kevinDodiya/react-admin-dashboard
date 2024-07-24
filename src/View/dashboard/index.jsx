import React, { useState, useEffect } from 'react';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Header from "../../components/Header";
import StatBox from "../../components/statbox"; 
import axios from 'axios';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import InsightsIcon from '@mui/icons-material/Insights';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [regionCount, setRegionCount] = useState(0);
  const [topicCount, setTopicCount] = useState(0);
  const [insightCount, setInsightCount] = useState(0);
  const [pestleCount, setPestleCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/crud/Data/fetch')
      .then(response => {
        const data = response.data;
        console.log(data)

        const uniqueRegions = new Set(data.map(item => item.region));
        const uniqueTopics = new Set(data.map(item => item.topic));
        const uniqueInsights = new Set(data.map(item => item.insight));
        const uniquePestles = new Set(data.map(item => item.pestle));

        setRegionCount(uniqueRegions.size);
        setTopicCount(uniqueTopics.size);
        setInsightCount(uniqueInsights.size);
        setPestleCount(uniquePestles.size);
      
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

       
      </Box>

      
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={insightCount}
            subtitle="Insights"
            progress="0.75"
            icon={
              <InsightsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={regionCount}
            subtitle="Regions"
            progress="0.50"
            icon={
              <PublicOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={pestleCount}
            subtitle="Pestles"
            progress="0.50"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={topicCount}
            subtitle="Topics"
            progress="0.30"
            icon={
              <TopicOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
        
      </Box>
    </Box>
  );
};

export default Dashboard;
