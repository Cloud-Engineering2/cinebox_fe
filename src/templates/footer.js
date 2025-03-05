import React from 'react';
import '../styles/templates/footer.css'
import { Box } from '@mui/material';

const Footer = () => {
    return <>
		<Box className="footer">
			<footer>
				<img src={'/assets/cinebox_logo_gray.png'}/>
				<p>©2025 Cinebox, Inc. All rights reserved.</p>
			</footer>
		</Box>
    </>;
};

export default Footer;