import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/crud/Data/fetch')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: "index",
      headerName: "No.",
      flex: 0.5,
      renderCell: (params) => params.api.getRowIndex(params.row._id) + 1,
    },
    { field: "end_year", headerName: "End Year" },
    { field: "intensity", headerName: "Intensity" },
    { field: "sector", headerName: "Sector", flex: 1 },
    { field: "topic", headerName: "Topic", flex: 1 },
    { field: "insight", headerName: "Insight", flex: 1 },
    { field: "url", headerName: "URL", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "start_year", headerName: "Start Year" },
    { field: "impact", headerName: "Impact" },
    { field: "added", headerName: "Added" },
    { field: "published", headerName: "Published" },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "relevance", headerName: "Relevance" },
    { field: "pestle", headerName: "Pestle", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "likelihood", headerName: "Likelihood" },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
           
          </Box>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id} // Ensure unique ID
          />
        )}
      </Box>
    </Box>
  );
};

export default Contacts;
