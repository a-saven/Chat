import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chats from '../chats/chats';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    height: '75vh',
    maxHeight: "75vh",
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  tab: {
    minWidth: '33%',
    width: 9
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function IconTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab classes={{ root: classes.tab }} icon={<Tooltip title="All conversations"><AssignmentIcon /></Tooltip>} aria-label="All conversations" />
        <Tab classes={{ root: classes.tab }} icon={<Tooltip title="Assigned to me"><PersonPinIcon/></Tooltip>} aria-label="Assigned to me"/>
        <Tab classes={{ root: classes.tab }} icon={<Tooltip title="Resolved conversations"><CheckBoxIcon /></Tooltip>} aria-label="Resolved conversations" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Chats />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Assigned to me
      </TabPanel>
      <TabPanel value={value} index={2}>
        Resolved conversations
      </TabPanel>
    </Paper>
  );
}