import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({className, buttons}) {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
        className={className}
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        sx={{height:35}}
        >
            {
                buttons.map((button, idx) => {
                    return <ToggleButton value={button.value}>{button.label}</ToggleButton>;
                })
            }
        </ToggleButtonGroup>
    );
}
