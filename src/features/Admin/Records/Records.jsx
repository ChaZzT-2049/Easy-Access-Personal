import styled from "styled-components";
import Btn from "../../../components/UI/Button/Index";
import { exportRecordsToCSV, exportRecordsWithDurationToCSV } from "../../../utils/exportCSV";
import { formatDuration } from "../../../utils/accessDuration";

const RecordsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ExportButtons = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
`;

const RecordsList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const RecordItem = styled.li`
    padding: 1rem;
    background: ${props => props.theme.bg2 || "#f5f5f5"};
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    border-left: 4px solid ${props => props.type === "Entrada" ? "#4caf50" : "#f44336"};
    
    & .record-info {
        flex: 1;
        min-width: 200px;
    }
    
    & .record-type {
        font-weight: bold;
        color: ${props => props.type === "Entrada" ? "#4caf50" : "#f44336"};
    }
    
    & .record-date {
        color: ${props => props.theme.onbg2 || "#666"};
        font-size: 0.9rem;
    }
    
    & .record-user {
        font-size: 1rem;
        margin: 0.25rem 0;
    }
`;

const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
`;

const StatCard = styled.div`
    padding: 1rem;
    background: ${props => props.theme.bg2 || "#f5f5f5"};
    border-radius: 0.5rem;
    text-align: center;
    
    & h4 {
        margin: 0 0 0.5rem 0;
        color: ${props => props.theme.onbg2 || "#666"};
        font-size: 0.9rem;
        font-weight: normal;
    }
    
    & p {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: ${props => props.theme.primary || "#1976d2"};
    }
`;

const RecordsInstalation = ({data}) => {
    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A";
        const date = timestamp.seconds 
            ? new Date(timestamp.seconds * 1000)
            : new Date(timestamp);
        return date.toLocaleString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate statistics
    const stats = {
        total: data?.length || 0,
        entries: data?.filter(r => r.type === "Entrada").length || 0,
        exits: data?.filter(r => r.type === "Salida").length || 0,
        uniqueUsers: new Set(data?.map(r => r.userID)).size || 0
    };

    // Calculate average duration for users with both entry and exit
    const calculateAvgDuration = () => {
        if (!data) return "N/A";
        
        const userRecords = {};
        data.forEach(record => {
            if (!userRecords[record.userID]) {
                userRecords[record.userID] = [];
            }
            userRecords[record.userID].push(record);
        });

        let totalDuration = 0;
        let completeSessions = 0;

        Object.keys(userRecords).forEach(userID => {
            const records = userRecords[userID].sort((a, b) => {
                const dateA = a.date.seconds || a.date;
                const dateB = b.date.seconds || b.date;
                return dateA - dateB;
            });

            let entryRecord = null;
            records.forEach(record => {
                if (record.type === "Entrada") {
                    entryRecord = record;
                } else if (record.type === "Salida" && entryRecord) {
                    const entryTime = entryRecord.date.seconds * 1000;
                    const exitTime = record.date.seconds * 1000;
                    totalDuration += (exitTime - entryTime);
                    completeSessions++;
                    entryRecord = null;
                }
            });
        });

        if (completeSessions === 0) return "N/A";
        const avgDuration = totalDuration / completeSessions;
        return formatDuration(avgDuration);
    };

    const handleExportAll = () => {
        exportRecordsToCSV(data, `registros_${new Date().toISOString().split('T')[0]}.csv`);
    };

    const handleExportWithDuration = () => {
        exportRecordsWithDurationToCSV(data, `registros_duracion_${new Date().toISOString().split('T')[0]}.csv`);
    };

    return (
        <RecordsContainer>
            <StatsContainer>
                <StatCard>
                    <h4>Total de Registros</h4>
                    <p>{stats.total}</p>
                </StatCard>
                <StatCard>
                    <h4>Entradas</h4>
                    <p>{stats.entries}</p>
                </StatCard>
                <StatCard>
                    <h4>Salidas</h4>
                    <p>{stats.exits}</p>
                </StatCard>
                <StatCard>
                    <h4>Usuarios Únicos</h4>
                    <p>{stats.uniqueUsers}</p>
                </StatCard>
                <StatCard>
                    <h4>Duración Promedio</h4>
                    <p>{calculateAvgDuration()}</p>
                </StatCard>
            </StatsContainer>

            <ExportButtons>
                <Btn 
                    colors="success" 
                    type="icon" 
                    icon="download" 
                    action="Exportar Todos los Registros" 
                    onClick={handleExportAll}
                />
                <Btn 
                    colors="primary" 
                    type="icon" 
                    icon="schedule" 
                    action="Exportar con Duración" 
                    onClick={handleExportWithDuration}
                />
            </ExportButtons>

            <RecordsList>
                {data && data.map(record => (
                    <RecordItem key={record.id} type={record.type}>
                        <div className="record-info">
                            <div className="record-user">{record.userDisplay}</div>
                            <div className="record-type">{record.type}</div>
                            <div className="record-date">{formatDate(record.date)}</div>
                        </div>
                    </RecordItem>
                ))}
            </RecordsList>
        </RecordsContainer>
    );
}

export default RecordsInstalation;