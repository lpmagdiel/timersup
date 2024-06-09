const defaultDate = () => new Date().toLocaleString().split(',')[0];

export const TimerStructure = {
    id : 'id',
    type: 'type',
    name : 'name',
    description: 'description',
    startTime: 0,
    time : 0,
    active : false,
    location : '',
    date : defaultDate()
}