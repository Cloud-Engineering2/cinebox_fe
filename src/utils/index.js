export const changeTimeFormat = (datetime)=>{
    const date = datetime.split('T')[0].replaceAll('-', '.');
    const time = datetime.split('T')[1].split('.')[0];
    const hour = time.split(':')[0];
    const min = time.split(':')[1];

    return `${date} (${hour}:${min})`;
}

export const splitDateTime = (datetime)=>{
    const date = datetime.split('T')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];
    const time = datetime.split('T')[1].split('.')[0];
    const hour = time.split(':')[0];
    const min = time.split(':')[1];

    return {
        date: `${month}월 ${day}일`,
        time: `${hour}:${min}`
    };
}


export const logout = ()=>{
    localStorage.clear();
    window.location.href='/';
}