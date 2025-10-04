/**
 * Calculate duration between entry and exit records
 * @param {Array} records - Array of access records sorted by date
 * @param {string} userID - User ID to calculate duration for
 * @returns {Object} - Object with duration statistics
 */
export const calculateAccessDuration = (records, userID) => {
    if (!records || records.length === 0) return null;

    const userRecords = records.filter(r => r.userID === userID)
        .sort((a, b) => {
            const dateA = a.date.seconds || a.date;
            const dateB = b.date.seconds || b.date;
            return dateA - dateB;
        });

    let durations = [];
    let entryRecord = null;

    userRecords.forEach(record => {
        if (record.type === "Entrada") {
            entryRecord = record;
        } else if (record.type === "Salida" && entryRecord) {
            const entryTime = entryRecord.date.seconds ? entryRecord.date.seconds * 1000 : entryRecord.date;
            const exitTime = record.date.seconds ? record.date.seconds * 1000 : record.date;
            const duration = exitTime - entryTime;
            durations.push({
                entry: entryRecord,
                exit: record,
                duration: duration,
                durationMinutes: Math.floor(duration / 60000),
                durationHours: Math.floor(duration / 3600000)
            });
            entryRecord = null;
        }
    });

    if (durations.length === 0) return null;

    const totalDuration = durations.reduce((sum, d) => sum + d.duration, 0);
    const avgDuration = totalDuration / durations.length;

    return {
        durations,
        totalDuration,
        avgDuration,
        avgDurationMinutes: Math.floor(avgDuration / 60000),
        avgDurationHours: (avgDuration / 3600000).toFixed(2),
        totalVisits: durations.length
    };
};

/**
 * Format duration in a human-readable format
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} - Formatted duration string
 */
export const formatDuration = (milliseconds) => {
    if (!milliseconds || milliseconds < 0) return "0 minutos";

    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);

    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else {
        return `${minutes}m`;
    }
};

/**
 * Get the current status of a user (inside or outside)
 * @param {Array} records - Array of access records for a user
 * @returns {string} - "Dentro" or "Fuera"
 */
export const getCurrentStatus = (records) => {
    if (!records || records.length === 0) return "Fuera";

    const sortedRecords = [...records].sort((a, b) => {
        const dateA = a.date.seconds || a.date;
        const dateB = b.date.seconds || b.date;
        return dateB - dateA;
    });

    const lastRecord = sortedRecords[0];
    return lastRecord.type === "Entrada" ? "Dentro" : "Fuera";
};
