/**
 * Export records to CSV format
 * @param {Array} records - Array of access records
 * @param {string} filename - Name of the file to download
 */
export const exportRecordsToCSV = (records, filename = "registros_acceso.csv") => {
    if (!records || records.length === 0) {
        alert("No hay registros para exportar");
        return;
    }

    // Define CSV headers
    const headers = ["Fecha", "Hora", "Usuario", "Tipo", "Instalación", "Punto de Acceso"];
    
    // Convert records to CSV rows
    const rows = records.map(record => {
        const date = record.date.seconds 
            ? new Date(record.date.seconds * 1000) 
            : new Date(record.date);
        
        const dateStr = date.toLocaleDateString('es-MX');
        const timeStr = date.toLocaleTimeString('es-MX');
        
        return [
            dateStr,
            timeStr,
            record.userDisplay || "N/A",
            record.type || "N/A",
            record.pointDisplay || "N/A",
            record.pointID || "N/A"
        ];
    });

    // Combine headers and rows
    const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Add BOM for Excel to recognize UTF-8 encoding
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create download link
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

/**
 * Export records with duration analysis to CSV
 * @param {Array} records - Array of access records
 * @param {string} filename - Name of the file to download
 */
export const exportRecordsWithDurationToCSV = (records, filename = "registros_con_duracion.csv") => {
    if (!records || records.length === 0) {
        alert("No hay registros para exportar");
        return;
    }

    // Group records by user
    const userRecords = {};
    records.forEach(record => {
        if (!userRecords[record.userID]) {
            userRecords[record.userID] = [];
        }
        userRecords[record.userID].push(record);
    });

    // Define CSV headers
    const headers = ["Usuario", "Fecha Entrada", "Hora Entrada", "Fecha Salida", "Hora Salida", "Duración (minutos)", "Instalación"];
    
    const rows = [];
    
    // Process each user's records
    Object.keys(userRecords).forEach(userID => {
        const userAccessRecords = userRecords[userID].sort((a, b) => {
            const dateA = a.date.seconds || a.date;
            const dateB = b.date.seconds || b.date;
            return dateA - dateB;
        });

        let entryRecord = null;

        userAccessRecords.forEach(record => {
            if (record.type === "Entrada") {
                entryRecord = record;
            } else if (record.type === "Salida" && entryRecord) {
                const entryDate = new Date(entryRecord.date.seconds * 1000);
                const exitDate = new Date(record.date.seconds * 1000);
                const duration = Math.floor((exitDate - entryDate) / 60000);

                rows.push([
                    entryRecord.userDisplay || "N/A",
                    entryDate.toLocaleDateString('es-MX'),
                    entryDate.toLocaleTimeString('es-MX'),
                    exitDate.toLocaleDateString('es-MX'),
                    exitDate.toLocaleTimeString('es-MX'),
                    duration,
                    entryRecord.pointDisplay || "N/A"
                ]);

                entryRecord = null;
            }
        });
    });

    if (rows.length === 0) {
        alert("No hay registros completos (entrada-salida) para exportar");
        return;
    }

    // Combine headers and rows
    const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Add BOM for Excel to recognize UTF-8 encoding
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create download link
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
