const RecordsInstalation = ({data}) => {
    return <ul>{data && data.map(record => <li key={record.id}>
            {record.userDisplay}, {record.type} - {JSON.stringify(new Date(record.date.seconds*1000))}
        </li>)}
    </ul>
}

export default RecordsInstalation;