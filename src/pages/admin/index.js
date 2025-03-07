import React from 'react';
import UnderBarTitle from '../../components/underBarTitle.js';
import { Box } from '@mui/material';
import '../../styles/pages/admin.css';
import Tabs from '../../components/tabs.js';
import MovieList from './movieList.js';
import UserList from './userList.js';
import AuditoriumList from './auditoriumList.js';

const Admin = () => {
    return <>
        <UnderBarTitle title={'관리자 페이지'}/>
        <Box className='admin'>
            <Tabs tabs={[
                {
                    value:'영화 관리',
                    content: <MovieList/>
                },{
                    value:'회원 관리',
                    content:<UserList/>
                },{
                    value:'상영관 관리',
                    content:<AuditoriumList/>
                }
            ]}
            styles={{}}/>
        </Box>
    </>;
};

export default Admin;