import {
  Box,
  TextField,
  Grid,
  Button,
  IconButton,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React, { useEffect } from 'react';
import { COLOR } from '../../styles/color';
import { Check, Memory } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDeviceDetail, testDevice } from '../../apis/device';
import {
  ErrorNotification,
  SuccessNotification,
} from '../../components/Notification';
import useWebSocket from 'react-use-websocket';
import ChartComponent from '../../components/ChartComponent';
import { getWarningByEmbedId } from '../../apis/warning';
import moment from 'moment';

const WS_URL = 'ws://127.0.0.1:8000';

const Device = () => {
  const [sensorDatas, setSensorDatas] = React.useState([]); // [1, 2, 3, 4, 5, 6, 7, 8
  const [deviceData, setDeviceData] = React.useState({});
  const [warningData, setWarningData] = React.useState({
    history: [],
    warning: [],
  });
  const { access_token } = useSelector((state) => state.user);
  const { id } = useParams();

  const fetchDeviceData = async () => {
    try {
      const deviceData = await getDeviceDetail(id, access_token);
      if (deviceData.status === 0) {
        ErrorNotification('Error', deviceData.message);
        return;
      }

      const { result } = deviceData;
      await fetchWarningData(result.device.embedId);
      setDeviceData(result.device);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWarningData = async (embedId) => {
    try {
      const res = await getWarningByEmbedId(embedId, access_token);
      if (res.status === 0) {
        ErrorNotification('Error', res.message);
        return;
      }

      console.log('res: ', res);
      const { warning } = res;
      setWarningData(warning);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTestDevice = async (type) => {
    try {
      const deviceData = await testDevice(type, access_token);
      if (deviceData.status === 0) {
        ErrorNotification('Error', deviceData.message);
        return;
      }

      SuccessNotification('Success', 'Đang thực thi lệnh test');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, []);

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (event) => {
      const { payload } = JSON.parse(event.data);
      const newSensorData = [...sensorDatas];
      if (newSensorData.length === 10) newSensorData.shift();
      newSensorData.push(payload);
      setSensorDatas(newSensorData);
    },
  });

  return (
    <Box display="flex" flexDirection="column" padding={4}>
      <Box width="100%">
        <Grid container display={'flex'} justifyContent="space-between">
          <Grid item xs={5}>
            <Box
              display="flex"
              flexDirection="column"
              border={1}
              borderColor={COLOR.grayV2[100]}
              borderRadius={2}
              padding={2}
              gap={2}
              width="100%"
            >
              <Box display="flex" gap={2} alignItems="center" width={'100%'}>
                <Memory />
                <TextField
                  variant="standard"
                  value={deviceData.deviceName}
                  onChange={(e) => {
                    setDeviceData({
                      ...deviceData,
                      deviceName: e.target.value,
                    });
                  }}
                />
                <IconButton>
                  <Check />
                </IconButton>
              </Box>
              <Typography variant="subtitle1">
                Status: {deviceData.connectState}
              </Typography>
              <Typography variant="subtitle1">
                Device MAC Address: {deviceData.embedId}
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleTestDevice('Check Leak')}
              >
                Test khi mức độ khói hoặc rò rỉ khí ga ở mức nhỏ
              </Button>
              <Button
                variant="contained"
                onClick={() => handleTestDevice('Check Leak High')}
              >
                Test khi mức độ khói hoặc rò rỉ khí ga ở mức nguy hiểm
              </Button>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <ChartComponent data={sensorDatas} />
          </Grid>
        </Grid>
      </Box>
      <Box width="100%" marginTop={2}>
        <Typography variant="h6">Lịch sử</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell>Giá trị đo được</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warningData?.history.map((warning) => (
              <TableRow key={warning.id}>
                <TableCell>
                  {moment(warning.time).format('HH:mm DD/MM/YYYY')}
                </TableCell>
                <TableCell>{warning.value}</TableCell>
                <TableCell>{warning.isTest ? 'Test' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Device;
