export const changeTimeFormat = (datetime)=>{
    const date = datetime.split('T')[0].replaceAll('-', '.');
    const time = datetime.split('T')[1].split('.')[0];
    const hour = time.split(':')[0];
    const min = time.split(':')[1];

    return `${date} (${hour}:${min})`;
}

export const logout = ()=>{
    localStorage.clear();
    window.location.href='/';
}