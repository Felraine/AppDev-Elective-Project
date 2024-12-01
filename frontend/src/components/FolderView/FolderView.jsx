import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import Tasks from "./Tasks";
import Archive from "./ArchivedTasks";
import Home from "./Home";
import { useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/CottageOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import TaskIcon from '@mui/icons-material/AssignmentOutlined';

const FolderView = () => {
  const location = useLocation();

  const getActiveTab = () => {
    const path = window.location.pathname;
    if (path === "/home") return 0;
    if (path === "/home/tasks") return 1;
    if (path === "/home/archive") return 2;
    return 0;
  };

  const [activeTab, setActiveTab] = useState(getActiveTab(location.pathname));

  useEffect(() => {
    setActiveTab(getActiveTab(location.pathname));  // Update active tab when location changes
  }, [location]);  // Re-run when location changes

    if(activeTab === 0){
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
              to="/home/tasks"
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TaskIcon sx={{ marginRight: '8px'}} />
                  <span style={{ fontSize: '16px'}}>Tasks</span>
                </div>
              }
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
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ArchiveIcon sx={{ marginRight: '8px'}} />
                  <span style={{ fontSize: '16px'}}>Archive</span>
                </div>
              }
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
            <Tab
              component={Link}
              to="/home"
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <HomeIcon sx={{ marginRight: '8px' }} />
                  <span style={{ fontSize: '16px' }}>Home</span>
                </div>
              }
              className="home-tab"
              sx={{
                width: "12rem",
                fontSize: "16px",
                padding: "10px",
                backgroundColor: "#fffa9d",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                color: "black",
                textDecoration: "none",
                marginLeft: "33.3rem",
                ...(activeTab === 0 && {
                  color: "#fff",
                  backgroundColor: "#fffa9d",
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
    );} else if(activeTab === 1){
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
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <HomeIcon sx={{ marginRight: '8px' }} />
                  <span style={{ fontSize: '16px' }}>Home</span>
                </div>
              }
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
              to="/home/archive"
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ArchiveIcon sx={{ marginRight: '8px'}} />
                  <span style={{ fontSize: '16px'}}>Archive</span>
                </div>
              }
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

            <Tab
              component={Link}
              to="/home/tasks"
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TaskIcon sx={{ marginRight: '8px'}} />
                  <span style={{ fontSize: '16px'}}>Tasks</span>
                </div>
              }
              className="tasks-tab"
              sx={{
                width: "12rem",
                fontSize: "16px",
                padding: "10px",
                backgroundColor: "#ffe79f",
                color: "black",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                textDecoration: "none",
                marginLeft: "33.3rem",
                ...(activeTab === 1 && {
                  color: "#fff",
                  backgroundColor: "#ffe79f",
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
    }else{
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
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <HomeIcon sx={{ marginRight: '8px' }} />
                  <span style={{ fontSize: '16px' }}>Home</span>
                </div>
              }
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
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TaskIcon sx={{ marginRight: '8px'}} />
                  <span style={{ fontSize: '16px'}}>Tasks</span>
                </div>
              }
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
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ArchiveIcon sx={{ marginRight: '8px'}} />
                  <span style={{ fontSize: '16px'}}>Archive</span>
                </div>
              }
              className="archive-tab"
              sx={{
                width: "12rem",
                fontSize: "16px",
                padding: "10px",
                backgroundColor: "#cc915c",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                color: "black",
                textDecoration: "none",
                marginLeft: "33.3rem",
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
