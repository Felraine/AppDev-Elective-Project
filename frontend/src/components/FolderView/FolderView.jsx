import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import Tasks from "./Tasks";
import Archive from "./ArchivedTasks";
import Home from "./Home";

class FolderView extends React.Component {
  getActiveTab = () => {
    const path = window.location.pathname;
    if (path === "/home") return 0;
    if (path === "/home/tasks") return 1;
    if (path === "/home/archive") return 2;
    return false;
  };

  render() {
    const activeTab = this.getActiveTab();

    return (
      <Box
        className="folder-view"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "15px",
          width: "100%",
          maxWidth: "1500px",
          height: "100%",
        }}
      >
        <Box className="tab-container" sx={{ width: "80%", maxWidth: "90%" }}>
          <Tabs
            value={activeTab}
            TabIndicatorProps={{
              sx: {
                backgroundColor: "transparent",
                display: "none",
              },
            }}
          >
            <Tab
              component={Link}
              to="/home"
              label="Home"
              className="home-tab"
              sx={{
                width: "8rem",
                fontSize: "16px",
                padding: "10px",
                backgroundColor: "#fffa9d",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                color: "black",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#e29d3f",
                  color: "#fff",
                },
                ...(activeTab === 0 && {
                  color: "#fff",
                  backgroundColor: "#fffa9d",
                }),
                "&.MuiTab-root": {
                  color: "black",
                },
              }}
            />

            <Tab
              component={Link}
              to="/home/tasks"
              label="Tasks"
              className="tasks-tab"
              sx={{
                width: "8rem",
                fontSize: "16px",
                padding: "10px",
                backgroundColor: "#ffe79f",
                color: "black",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#e29d3f",
                  color: "#fff",
                },
                ...(activeTab === 1 && {
                  color: "#fff",
                  backgroundColor: "#ffe79f",
                }),
                "&.MuiTab-root": {
                  color: "black",
                },
              }}
            />

            <Tab
              component={Link}
              to="/home/archive"
              label="Archive"
              className="archive-tab"
              sx={{
                width: "8rem",
                fontSize: "16px",
                padding: "10px",
                backgroundColor: "#cc915c",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                color: "black",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#e29d3f",
                  color: "#fff",
                },
                ...(activeTab === 2 && {
                  color: "#fff",
                  backgroundColor: "#cc915c",
                }),
                "&.MuiTab-root": {
                  color: "black",
                },
              }}
            />
          </Tabs>
        </Box>
        <Box
          className="content"
          sx={{ width: "80%", flex: 1, minHeight: "400px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/archive" element={<Archive />} />
          </Routes>
        </Box>
      </Box>
    );
  }
}

export default FolderView;
