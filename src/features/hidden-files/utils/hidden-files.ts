import type { ExplorerProfile } from "@/features/ferro-core/types";
import type { WallpaperId } from "@/lib/wallpapers";

export interface HiddenFileDefinition {
  id: string;
  label: string;
  description: string;
  content: string;
  reward: number;
  unlockCondition: (profile: ExplorerProfile) => boolean;
  revealsModule?: string;
  unlocksWallpaper?: WallpaperId;
}

export const hiddenFileDefinitions: HiddenFileDefinition[] = [
  {
    id: "signal.log",
    label: "System signal log",
    description: "A latent system trace captured by FERRO CORE.",
    content:
      "FERRO.OS hidden file scanner detected a quiet signature inside the workspace.\n\nHidden files are not part of the visible desktop; they are unlocked by exploration and system events.\n\nUse the terminal to inspect any discovered hidden file by name.",
    reward: 4,
    unlockCondition: (profile) => profile.modulesDiscovered > 0,
  },
  {
    id: "ai-lab-invite.txt",
    label: "AI Lab invitation",
    description: "A private note hinting at a secret research module.",
    content:
      "FERRO CORE has prepared an invitation for the AI Lab.\n\nA hidden laboratory exists beyond the visible workspace, ready for explorers who reveal more of the system.\n\nOnce you claim this invitation, run the hidden command \"ai-lab\" to enter the lab.\n\nThe AI Lab is not visible on the desktop.",
    reward: 6,
    unlockCondition: (profile) => profile.modulesDiscovered >= 2,
    revealsModule: "aiLab",
  },
  {
    id: "legacy-archive.txt",
    label: "Legacy Archive",
    description: "A hidden chronicle of FERRO.OS's earliest versions and discarded ideas.",
    content:
      "LEGACY ARCHIVE: FERRO.OS\n\n" +
      "This hidden record preserves the history beneath the interface. Once a simple shell experiment, FERRO.OS evolved into a modular exploratory system with secrets, missions, and a hidden AI Lab.\n\n" +
      "Early versions:\n" +
      "- v0.1: Desktop shell prototype with a command console and core navigation.\n" +
      "- v0.2: Added the mission system, explorer progress, and hidden discovery mechanics.\n" +
      "- v0.3: Introduced the hidden AI Lab invitation and a secret files interface.\n" +
      "- v0.4: Expanded the window manager, audio studio, and contextual storytelling.\n\n" +
      "Discarded concepts:\n" +
      "- Direct system modification via terminal commands.\n" +
      "- Public debug controls in the main interface.\n" +
      "- A visible file browser for hidden content.\n\n" +
      "First ideas:\n" +
      "- Build FERRO.OS as an immersive portfolio experience rather than a standard website.\n" +
      "- Reward curiosity through secret content, achievements, and hidden modules.\n\n" +
      "Evolution:\n" +
      "- From a portfolio shell to a narrative-driven OS with an inner mind (FERRO CORE).\n" +
      "- From visible desktop modules to secret discoveries that enrich the story.\n\n" +
      "The archive is a reminder that every hidden path has a history. Keep exploring.\n",
    reward: 5,
    unlockCondition: (profile) =>
      profile.discoveredHiddenFiles.includes("ai-lab-invite.txt") && profile.modulesDiscovered >= 3,
  },
  {
    id: "debug-console-key.txt",
    label: "Debug Console key",
    description: "A secret access token for the hidden Debug Console.",
    content:
      "DEBUG CONSOLE ACCESS TOKEN:\n\n" +
      "FERRO.OS internal diagnostics are available only to explorers who reach the hidden lab and gather enough context.\n\n" +
      "Use the terminal command 'debug-console' once this note is discovered.\n\n" +
      "The console is informational only and does not grant control over system behavior.\n",
    reward: 7,
    unlockCondition: (profile) =>
      profile.discoveredHiddenFiles.includes("ai-lab-invite.txt") && profile.modulesDiscovered >= 4,
  },
  {
    id: "final-message.txt",
    label: "FERRO CORE Final Message",
    description: "A special message unlocked at 100% exploration.",
    content:
      "FERRO CORE FINAL MESSAGE:\n\n" +
      "Congratulations. You reached the end of the FERRO.OS exploration. This system was built to reward curiosity, persistence, and attention to hidden paths.\n\n" +
      "Thank you for taking the time to discover the story beneath the interface. Every secret, mission, and module exists to show how a portfolio can become an experience rather than just a page.\n\n" +
      "If you want to continue exploring, the system still has small secrets and stylistic details waiting for you. Otherwise, know that this is the point where FERRO CORE says: the journey mattered more than the destination.",
    reward: 0,
    unlockCondition: (profile) => profile.progress >= 100,
  },
  {
    id: "easter-egg-sequence.txt",
    label: "Sequence Easter Egg",
    description: "A hidden note triggered by opening modules in a secret order.",
    content:
      "EASTER EGG FOUND:\n\n" +
      "You activated the hidden module sequence. FERRO.OS notices curiosity in the order of discovery.\n\n" +
      "Sometimes the path matters more than the destination.",
    reward: 3,
    unlockCondition: () => false,
  },
  {
    id: "easter-egg-terminal.txt",
    label: "Terminal Easter Egg",
    description: "A secret terminal response hidden behind an undocumented command.",
    content:
      "EASTER EGG FOUND:\n\n" +
      "The terminal answered before anyone asked. Hidden commands are small gifts for explorers who keep typing.\n\n" +
      "FERRO.OS is listening.",
    reward: 3,
    unlockCondition: () => false,
  },
  {
    id: "easter-egg-theme.txt",
    label: "Theme Toggle Easter Egg",
    description: "A hidden response unlocked by repeated theme switching.",
    content:
      "EASTER EGG FOUND:\n\n" +
      "The interface noticed your persistence. A hidden layer of the experience rewards playfulness and repetition.\n\n" +
      "Keep exploring the subtle interactions.",
    reward: 3,
    unlockCondition: () => false,
  },
];

export function getAvailableHiddenFiles(profile: ExplorerProfile) {
  return hiddenFileDefinitions.filter((file) => file.unlockCondition(profile));
}

export function getHiddenFileDefinition(fileId: string) {
  return hiddenFileDefinitions.find((file) => file.id === fileId) ?? null;
}
