/**
 * Simple notification utility for access events
 * This can be extended to use Firebase Cloud Messaging for real-time notifications
 */

/**
 * Send browser notification if user has granted permission
 * @param {string} title - Notification title
 * @param {object} options - Notification options
 */
export const sendBrowserNotification = (title, options = {}) => {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return;
    }

    // Check if permission is granted
    if (Notification.permission === "granted") {
        new Notification(title, {
            icon: "/logo192.png",
            badge: "/logo192.png",
            ...options
        });
    } else if (Notification.permission !== "denied") {
        // Request permission
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, {
                    icon: "/logo192.png",
                    badge: "/logo192.png",
                    ...options
                });
            }
        });
    }
};

/**
 * Request notification permission from the user
 * @returns {Promise<string>} - Permission status
 */
export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
        return "not-supported";
    }

    if (Notification.permission === "granted") {
        return "granted";
    }

    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission;
    }

    return "denied";
};

/**
 * Send access notification based on type
 * @param {object} accessData - Access record data
 */
export const notifyAccess = (accessData) => {
    const { type, userDisplay, pointDisplay } = accessData;
    
    const title = type === "Entrada" ? "✅ Entrada Registrada" : "🚪 Salida Registrada";
    const body = `${userDisplay} - ${pointDisplay}`;
    
    sendBrowserNotification(title, {
        body,
        tag: `access-${type}-${Date.now()}`,
        requireInteraction: false,
        vibrate: [200, 100, 200]
    });
};

/**
 * Send notification when a specific user enters/exits
 * Useful for tutors/parents monitoring students
 * @param {object} accessData - Access record data
 * @param {string} monitoredUserID - User ID to monitor
 */
export const notifyMonitoredUser = (accessData, monitoredUserID) => {
    if (accessData.userID !== monitoredUserID) {
        return;
    }

    const { type, userDisplay, pointDisplay } = accessData;
    const emoji = type === "Entrada" ? "🔔" : "🔕";
    
    const title = `${emoji} ${userDisplay}`;
    const body = `${type} registrada en ${pointDisplay}`;
    const timestamp = new Date().toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    sendBrowserNotification(title, {
        body: `${body} - ${timestamp}`,
        tag: `monitored-${type}-${accessData.userID}`,
        requireInteraction: true,
        vibrate: [300, 100, 300, 100, 300]
    });
};

/**
 * Send capacity warning notification
 * @param {object} installation - Installation data
 * @param {number} currentCount - Current number of people inside
 */
export const notifyCapacityWarning = (installation, currentCount) => {
    const maxCapacity = installation.maxCapacity || 100;
    const percentage = (currentCount / maxCapacity) * 100;
    
    if (percentage >= 90) {
        sendBrowserNotification("⚠️ Capacidad Crítica", {
            body: `${installation.name}: ${currentCount}/${maxCapacity} personas (${percentage.toFixed(0)}%)`,
            tag: `capacity-warning-${installation.id}`,
            requireInteraction: true,
            vibrate: [500, 200, 500]
        });
    } else if (percentage >= 75) {
        sendBrowserNotification("🟡 Capacidad Alta", {
            body: `${installation.name}: ${currentCount}/${maxCapacity} personas (${percentage.toFixed(0)}%)`,
            tag: `capacity-info-${installation.id}`,
            requireInteraction: false
        });
    }
};

/**
 * Example usage in AccessScanner component:
 * 
 * import { notifyAccess, requestNotificationPermission } from '../../../utils/notifications';
 * 
 * // On component mount, request permission
 * useEffect(() => {
 *   requestNotificationPermission();
 * }, []);
 * 
 * // After successful access registration
 * addDoc(collection(db, "records"), newAccess).then(() => {
 *   appToast.success("Registro exitoso", `Se ha registrado la ${accessType.toLowerCase()}`);
 *   notifyAccess(newAccess); // Send notification
 * });
 * 
 * 
 * Example for monitoring specific users:
 * 
 * import { notifyMonitoredUser } from '../../../utils/notifications';
 * 
 * // In a component that monitors users (e.g., parent dashboard)
 * const monitoredChildren = ["userID1", "userID2"];
 * 
 * // When a new access is registered
 * monitoredChildren.forEach(childID => {
 *   notifyMonitoredUser(newAccess, childID);
 * });
 */

export default {
    sendBrowserNotification,
    requestNotificationPermission,
    notifyAccess,
    notifyMonitoredUser,
    notifyCapacityWarning
};
