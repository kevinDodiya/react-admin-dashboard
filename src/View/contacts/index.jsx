import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
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
    {
      field: "end_year",
      headerName: "End Year",
      valueFormatter: ({ value }) => value ? value : "NaN",
      flex: 0.7,
    },
    {
      field: "start_year",
      headerName: "Start Year",
      valueFormatter: ({ value }) => value ? value : "NaN",
      flex: 0.7,
    },
    {
      field: "intensity",
      headerName: "Intensity",
      valueFormatter: ({ value }) => value ? value : "NaN",
      flex: 1,
    },
    {
      field: "sector",
      headerName: "Sector",
      flex: 1,
      valueFormatter: ({ value }) => value ? value : "NaN",
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
      valueFormatter: ({ value }) => value ? value : "NaN",

      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "insight",
      headerName: "Insight",
      flex: 1,
      valueFormatter: ({ value }) => value ? value : "NaN",

      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "url",
      headerName: "URL",
      flex: 1,
      valueFormatter: ({ value }) => value ? value : "NaN",

      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
      valueFormatter: ({ value }) => value ? value : "NaN",

      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "impact",
      headerName: "Impact",
      valueFormatter: ({ value }) => value ? value : "NaN",
      flex: 1,
    },
    {
      field: "added",
      headerName: "Added",
      valueFormatter: ({ value }) => value ? value : "NaN",
      flex: 1,
    },
    {
      field: "published",
      headerName: "Published",
      valueFormatter: ({ value }) => value ? value : "NaN",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      valueFormatter: ({ value }) => value ? value : "NaN",

      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "relevance",
      headerName: "Relevance",
      valueFormatter: ({ value }) => value ? value : "NaN",
      flex: 1,
    },
    {
      field: "pestle",
      headerName: "Pestle",
      flex: 1,
      valueFormatter: ({ value }) => value ? value : "NaN",

      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
      valueFormatter: ({ value }) => value ? value : "NaN",

      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      valueFormatter: ({ value }) => value ? value : "NaN",

      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography noWrap>{params.value}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "likelihood",
      headerName: "Likelihood",
      valueFormatter: ({ value }) => value ? value : "NaN",
      flex: 1,
    },
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
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
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
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id} 
          />
        )}
      </Box>
    </Box>
  );
};

export default Contacts;
