import { Box, Grid, MenuList, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { getMe } from '../../apis/user';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorNotification } from '../../components/Notification';
import { updateUser } from '../../redux/userSlice';
import { COLOR } from '../../styles/color';
import { Circle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userInfor, setUserInfor] = React.useState({});
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getMe(access_token);
      if (userInfo.status === 0) {
        ErrorNotification('Error', userInfo.message);
        return;
      }

      const { result } = userInfo;
      setUserInfor(result.user);
      dispatch(updateUser({ user: result.user }));
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Box>
      <Grid container spacing={1} marginTop={2} paddingX={4}>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <Box
            display="flex"
            flexDirection="column"
            border={1}
            borderColor={COLOR.gray}
            padding={4}
          >
            <Typography variant="h6">
              Số lượng thiết bị: {userInfor?.userDevice?.length}
            </Typography>
            <MenuList>
              {userInfor?.userDevice?.map((device) => (
                <Box
                  boxShadow={1}
                  padding={2}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      background: COLOR.gray,
                    },
                  }}
                  onClick={() => navigate(`/device/${device.id}`)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      marginBottom: '4px',
                    }}
                  >
                    <Typography variant="subtitle1">
                      {device.deviceName}
                    </Typography>
                    <Circle
                      style={{
                        color:
                          device.connectState === 'ON'
                            ? COLOR.lightGreen
                            : COLOR.gray,
                      }}
                    />
                  </Box>
                  <Typography variant="subtitle2">ID: {device.id}</Typography>
                </Box>
              ))}
            </MenuList>
          </Box>
        </Grid>
      </Grid>
      <Box></Box>
    </Box>
  );
};

export default Home;
