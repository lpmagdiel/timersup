const defaultDate = () => new Date().toLocaleString().split(',')[0];

export const TimerStructure = {
    id : 'id',
    name : 'name',
    description: 'description',
    startTime: 0,
    time : 0,
    status : 'status',
    date : defaultDate()
}