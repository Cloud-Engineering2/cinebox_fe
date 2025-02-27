import React, { useState, useEffect } from 'react';
import FooterCss from '../styles/templates/footer.css'

const Footer = () => {
    return <>
		<div class="footer">
			<footer>
				<img src={'/assets/cinebox_logo_gray.png'}/>
				<p>©2025 Cinebox, Inc. All rights reserved.</p>
			</footer>
		</div>
    </>;
};

export default Footer;