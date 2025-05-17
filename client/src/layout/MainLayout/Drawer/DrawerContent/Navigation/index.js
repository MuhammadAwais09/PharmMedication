import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import NavGroup from './NavGroup';
import { ChromeOutlined, FileWordOutlined, QuestionOutlined, UserOutlined, SettingOutlined, UserAddOutlined, DashboardOutlined } from '@ant-design/icons';
import axios from 'axios';

const Navigation = () => {
  const userType = localStorage.getItem('role');
  const token = localStorage.getItem('easyMedication_token');
  const icons = {
    ChromeOutlined,
    QuestionOutlined,
    UserOutlined,
    FileWordOutlined,
    UserAddOutlined,
    DashboardOutlined,
    SettingOutlined,
  };

  const [pages, setPages] = useState({
    id: 'support',
    title: '',
    type: 'group',
    children: [],
  });
  const [hasPharmacy, setHasPharmacy] = useState(null);

  useEffect(() => {
    const checkPharmacy = async () => {
      if (userType === 'Pharm' && token) {
        try {
          await axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setHasPharmacy(true);
        } catch (err) {
          if (err.response?.status === 404) {
            setHasPharmacy(false);
          } else {
            setHasPharmacy(true); // Avoid blocking navigation on other errors
          }
        }
      } else {
        setHasPharmacy(true); // Non-Pharm users skip check
      }
    };
    checkPharmacy();
  }, [userType, token]);

  useEffect(() => {
    const support = {
      id: 'support',
      title: '',
      type: 'group',
      children: [],
    };

    if (userType === 'Admin') {
      support.children.push(
        {
          id: 'Dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/Dashboard',
          icon: icons.DashboardOutlined,
        },
        {
          id: 'Pharmacy',
          title: 'Pharmacy',
          type: 'item',
          url: '/Pharmacy',
          icon: icons.UserAddOutlined,
        },
        {
          id: 'Inventory',
          title: 'Inventory',
          type: 'item',
          url: '/Inventory',
          icon: icons.UserOutlined,
        }
      );
    } else if (userType === 'Pharm' && hasPharmacy) {
      support.children.push(
        {
          id: 'pharmacyDashboard',
          title: 'Pharmacy Dashboard',
          type: 'item',
          url: '/pharmacy-dashboard',
          icon: icons.DashboardOutlined,
        },
        {
          id: 'pharmacyProfile',
          title: 'Pharmacy Profile',
          type: 'item',
          url: '/pharmacy-profile',
          icon: icons.UserOutlined,
        },
        {
          id: 'prescriptionList',
          title: 'Prescription List',
          type: 'item',
          url: '/prescription-list',
          icon: icons.FileWordOutlined,
        }
      );
    }

    setPages(support);
  }, [userType, hasPharmacy]);

  if (hasPharmacy === null) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Box sx={{ pt: 2 }}>
      {pages.children.length > 0 ? (
        <NavGroup key={pages.id} item={pages} />
      ) : (
        <Typography variant="h6" color="error" align="center">
          No Navigation Items
        </Typography>
      )}
    </Box>
  );
};

export default Navigation;