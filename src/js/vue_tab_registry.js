import LandingTab from "../components/tabs/LandingTab.vue";
import SetupTab from "../components/tabs/SetupTab.vue";
import SensorsTab from "../components/tabs/SensorsTab.vue";
import PortsTab from "../components/tabs/PortsTab.vue";
import ConfigurationTab from "../components/tabs/ConfigurationTab.vue";
import PowerTab from "../components/tabs/PowerTab.vue";
import FailsafeTab from "../components/tabs/FailsafeTab.vue";
import PidTuningTab from "../components/tabs/PidTuningTab.vue";
import ReceiverTab from "../components/tabs/ReceiverTab.vue";
import AuxiliaryTab from "../components/tabs/AuxiliaryTab.vue";
import ServosTab from "../components/tabs/ServosTab.vue";
import GpsTab from "../components/tabs/GpsTab.vue";
import MotorsTab from "../components/tabs/MotorsTab.vue";
import VtxTab from "../components/tabs/VtxTab.vue";
import LoggingTab from "../components/tabs/LoggingTab.vue";
import OnboardLoggingTab from "../components/tabs/OnboardLoggingTab.vue";
import BlackboxViewerTab from "../components/tabs/BlackboxViewerTab.vue";
import CliTab from "../components/tabs/CliTab.vue";

export const VueTabComponents = {
    landing: LandingTab,
    setup: SetupTab,
    sensors: SensorsTab,
    ports: PortsTab,
    configuration: ConfigurationTab,
    power: PowerTab,
    failsafe: FailsafeTab,
    pid_tuning: PidTuningTab,
    receiver: ReceiverTab,
    auxiliary: AuxiliaryTab,
    servos: ServosTab,
    gps: GpsTab,
    motors: MotorsTab,
    vtx: VtxTab,
    logging: LoggingTab,
    onboard_logging: OnboardLoggingTab,
    blackbox_viewer: BlackboxViewerTab,
    cli: CliTab,
};
