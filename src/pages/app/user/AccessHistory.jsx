import { useState, useEffect } from "react";
import styled from "styled-components";
import { PageTitle } from "../../../styled";
import useAppContext from "../../../hooks/app/useAppContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { getCurrentStatus, formatDuration } from "../../../utils/accessDuration";
import Btn from "../../../components/UI/Button/Index";
import { exportRecordsToCSV } from "../../../utils/exportCSV";

const HistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const StatusCard = styled.div`
    padding: 1.5rem;
    background: ${props => props.status === "Dentro" ? "#4caf5020" : "#f5f5f5"};
    border-radius: 0.5rem;
    border-left: 4px solid ${props => props.status === "Dentro" ? "#4caf50" : "#9e9e9e"};
    
    & h3 {
        margin: 0 0 0.5rem 0;
        color: ${props => props.status === "Dentro" ? "#4caf50" : "#666"};
    }
    
    & p {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
    }
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
`;

const StatCard = styled.div`
    padding: 1rem;
    background: ${props => props.theme.bg2 || "#f5f5f5"};
    border-radius: 0.5rem;
    text-align: center;
    
    & h4 {
        margin: 0 0 0.5rem 0;
        font-size: 0.85rem;
        color: ${props => props.theme.onbg2 || "#666"};
        font-weight: normal;
    }
    
    & p {
        margin: 0;
        font-size: 1.3rem;
        font-weight: bold;
        color: ${props => props.theme.primary || "#1976d2"};
    }
`;

const RecordsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const RecordItem = styled.div`
    padding: 1rem;
    background: ${props => props.theme.bg2 || "#f5f5f5"};
    border-radius: 0.5rem;
    border-left: 4px solid ${props => props.type === "Entrada" ? "#4caf50" : "#f44336"};
    
    & .record-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    & .record-type {
        font-weight: bold;
        color: ${props => props.type === "Entrada" ? "#4caf50" : "#f44336"};
        font-size: 1rem;
    }
    
    & .record-date {
        color: ${props => props.theme.onbg2 || "#666"};
        font-size: 0.9rem;
    }
    
    & .record-location {
        font-size: 0.9rem;
        color: ${props => props.theme.onbg || "#333"};
    }
`;

const ExportButton = styled.div`
    margin-top: 1rem;
`;

const AccessHistory = () => {
    const { user } = useAppContext();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                setLoading(true);
                const q = query(
                    collection(db, "records"),
                    where("userID", "==", user?.uid),
                    orderBy("date", "desc")
                );
                const snapshot = await getDocs(q);
                const fetchedRecords = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecords(fetchedRecords);
            } catch (err) {
                console.error("Error fetching records:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user?.uid) {
            fetchRecords();
        }
    }, [user]);

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

    const calculateStats = () => {
        const entries = records.filter(r => r.type === "Entrada").length;
        const exits = records.filter(r => r.type === "Salida").length;
        
        // Calculate total time spent
        let totalDuration = 0;
        let completeSessions = 0;
        let entryRecord = null;

        const sortedRecords = [...records].sort((a, b) => {
            const dateA = a.date.seconds || a.date;
            const dateB = b.date.seconds || b.date;
            return dateA - dateB;
        });

        sortedRecords.forEach(record => {
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

        return {
            entries,
            exits,
            totalTime: formatDuration(totalDuration),
            avgTime: completeSessions > 0 ? formatDuration(totalDuration / completeSessions) : "N/A",
            completeSessions
        };
    };

    const handleExport = () => {
        exportRecordsToCSV(records, `mi_historial_${new Date().toISOString().split('T')[0]}.csv`);
    };

    if (loading) {
        return (
            <>
                <PageTitle>Mi Historial de Accesos</PageTitle>
                <p>Cargando historial...</p>
            </>
        );
    }

    if (error) {
        return (
            <>
                <PageTitle>Mi Historial de Accesos</PageTitle>
                <p>Error al cargar el historial: {error}</p>
            </>
        );
    }

    const currentStatus = getCurrentStatus(records);
    const stats = calculateStats();

    return (
        <>
            <PageTitle>Mi Historial de Accesos</PageTitle>
            <HistoryContainer>
                <StatusCard status={currentStatus}>
                    <h3>Estado Actual</h3>
                    <p>{currentStatus}</p>
                </StatusCard>

                {records.length > 0 && (
                    <>
                        <StatsGrid>
                            <StatCard>
                                <h4>Total Registros</h4>
                                <p>{records.length}</p>
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
                                <h4>Tiempo Total</h4>
                                <p>{stats.totalTime}</p>
                            </StatCard>
                            <StatCard>
                                <h4>Tiempo Promedio</h4>
                                <p>{stats.avgTime}</p>
                            </StatCard>
                        </StatsGrid>

                        <ExportButton>
                            <Btn 
                                colors="success" 
                                type="icon" 
                                icon="download" 
                                action="Exportar Mi Historial" 
                                onClick={handleExport}
                            />
                        </ExportButton>

                        <h3>Últimos Accesos</h3>
                        <RecordsList>
                            {records.slice(0, 20).map(record => (
                                <RecordItem key={record.id} type={record.type}>
                                    <div className="record-header">
                                        <span className="record-type">{record.type}</span>
                                        <span className="record-date">{formatDate(record.date)}</span>
                                    </div>
                                    <div className="record-location">{record.pointDisplay}</div>
                                </RecordItem>
                            ))}
                        </RecordsList>
                    </>
                )}

                {records.length === 0 && (
                    <p>No tienes registros de acceso aún.</p>
                )}
            </HistoryContainer>
        </>
    );
};

export default AccessHistory;
