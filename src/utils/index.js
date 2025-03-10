export const isUpcoming = (releaseDate) => new Date(releaseDate) < new Date(); // true면 아직 개봉 됨

// datetime formatters
export const changeTimeFormat = (datetime) => {
    const date = datetime.split('T')[0].replaceAll('-', '.');
    const time = datetime.split('T')[1].split('.')[0];
    const hour = time.split(':')[0];
    const min = time.split(':')[1];

    return `${date} (${hour}:${min})`;
}

export const convertDateFormatter = (datetime) => {
    const date = new Date(datetime.replace(' ', 'T'));
    const pad = (num) => String(num).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export const splitDateTime = (datetime) => {
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

export const splitDateTime_v2 = (datetime)=>{
    const date = datetime.split('T')[0].replaceAll('-', '.');
    const time = datetime.split('T')[1].split('.')[0];
    const hour = time.split(':')[0];
    const min = time.split(':')[1];

    return {
        date: `${date}`,
        time: `${hour}:${min}`
    };
}

export const convertStartEndTimeFormatter = (start, end)=>{
    const date = splitDateTime_v2(start).date;
    const start_time = splitDateTime_v2(start).time;
    const end_time = splitDateTime_v2(end).time;
    
    return `${date} (${start_time}~${end_time})`;
}

export const getFullDateTime = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const pad = (num) => String(num).padStart(2, '0');
    return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(min)}:${pad(sec)}`;
}

export const convertISOString = (datetime) => {
    const date = new Date(datetime.replace(' ', 'T'));
    const pad = (num) => String(num).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}