export const sidebarItems = [
    { key: "landing", mode: "disconnected", i18n: "tabLanding", icon: "i-lucide-home" },
    { key: "setup", mode: "connected", i18n: "tabSetup", icon: "i-lucide-sliders-horizontal" },
    { key: "sensors", mode: "connected", i18n: "tabSensorConfig", icon: "i-lucide-cpu" },
    { key: "ports", mode: "connected", i18n: "tabPorts", icon: "i-lucide-cable" },
    { key: "configuration", mode: "connected", i18n: "tabConfiguration", icon: "i-lucide-settings" },
    { key: "power", mode: "connected", i18n: "tabPower", icon: "i-lucide-battery" },
    { key: "failsafe", mode: "connected", i18n: "tabFailsafe", icon: "i-lucide-shield-alert", expert: true },
    { key: "pid_tuning", mode: "connected", i18n: "tabPidTuning", icon: "i-lucide-gauge" },
    { key: "receiver", mode: "connected", i18n: "tabReceiver", icon: "i-lucide-radio" },
    { key: "auxiliary", mode: "connected", i18n: "tabAuxiliary", icon: "i-lucide-toggle-right" },
    { key: "servos", mode: "connected", i18n: "tabServos", icon: "i-lucide-rotate-ccw" },
    { key: "gps", mode: "connected", i18n: "tabGPS", icon: "i-lucide-map-pin" },
    { key: "motors", mode: "connected", i18n: "tabMotorTesting", icon: "i-lucide-fan" },
    { key: "vtx", mode: "connected", i18n: "tabVtx", icon: "i-lucide-radio-tower" },
    { key: "logging", mode: "connected", i18n: "tabLogging", icon: "i-lucide-file-text", expert: true },
    { key: "onboard_logging", mode: "connected", i18n: "tabOnboardLogging", icon: "i-lucide-database" },
    { key: "blackbox_viewer", mode: "shared", i18n: "tabBlackboxViewer", icon: "i-lucide-line-chart" },
    { key: "cli", mode: "cli", i18n: "tabCLI", icon: "i-lucide-terminal" },
    { key: "log", mode: "shared", i18n: "tabLog", icon: "i-lucide-file-text", expert: true, hideInSidebar: true },
];

export function isItemVisible(item, ctx) {
    if (item.expert && !ctx.expertMode) return false;
    return true;
}
