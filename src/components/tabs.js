import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs({tabs, styles}) {
    const [value, setValue] = React.useState(tabs[0].value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={Object.assign({ width: '100%', typography: 'body1' }, styles)}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" >
                    <Tab label={tabs[0].value} value={tabs[0].value} disabled={tabs[0].disabled} />
                    <Tab label={tabs[1].value} value={tabs[1].value} disabled={tabs[1].disabled}/>
                    <Tab label={tabs[2].value} value={tabs[2].value} disabled={tabs[2].disabled}/>
                </TabList>
                </Box>
                <TabPanel value={tabs[0].value}>{tabs[0].content}</TabPanel>
                <TabPanel value={tabs[1].value}>{tabs[1].content}</TabPanel>
                <TabPanel value={tabs[2].value}>{tabs[2].content}</TabPanel>
            </TabContext>
        </Box>
    );
}
