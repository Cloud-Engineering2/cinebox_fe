import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Tabs({tabs, styles}) {
    const [value, setValue] = React.useState(tabs[0].value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={Object.assign({ width: '100%', typography: 'body1' }, styles)}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" >
                {
                    tabs.map(tab => {
                        return <Tab label={tab.value} value={tab.value} disabled={tab.disabled} />;
                    })
                }
                </TabList>
                </Box>
                {
                    tabs.map(tab=>{
                        return <TabPanel value={tab.value}>{tab.content}</TabPanel>;
                    })
                }
            </TabContext>
        </Box>
    );
}
