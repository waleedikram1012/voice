import { Section, SectionId } from './types';

export type { SectionId };

export const SECTIONS: Section[] = [
  { id: 'overview', title: 'Executive Summary', icon: 'Cpu', isOfflineAvailable: true },
  { id: 'architecture', title: 'System Architecture', icon: 'Network', isOfflineAvailable: false },
  { id: 'permissions', title: 'Permissions & Security', icon: 'ShieldAlert', isOfflineAvailable: true },
  { id: 'limitations', title: 'Android Limitations', icon: 'AlertOctagon', isOfflineAvailable: true },
  { id: 'folder-structure', title: 'Folder Structure', icon: 'FolderTree', isOfflineAvailable: true },
  { id: 'user-flow', title: 'Execution & User Flow', icon: 'Workflow', isOfflineAvailable: false },
  { id: 'metrics', title: 'System Metrics', icon: 'Activity', isOfflineAvailable: true },
  { id: 'roadmap', title: 'Phased Roadmap', icon: 'Map', isOfflineAvailable: true },
];

export const CONTENT_DATA = {
  overview: {
    title: 'JARVIS: Voice-First Android Assistant',
    content: `
Project JARVIS is a comprehensive, system-level AI assistant for Android 12+. Built with a **Voice-First** philosophy, it ensures users rarely need to touch the screen. JARVIS operates entirely in the background via Foreground and Accessibility Services, bridging a beautiful Flutter UI with deep Native Kotlin system integrations.

### Core Capabilities
*   **Omnipresence**: Always available via customizable Wake Word, continuously listening after activation.
*   **System Mastery**: Can navigate UI, type text, and extract context using Android Accessibility APIs.
*   **Action Execution**: Can open apps (WhatsApp, Instagram, Chrome), search YouTube, toggle flashlight/brightness, navigate via Maps, and send emails or photos.
*   **Contact Resolution**: Intelligently identifies contacts. If multiple match, it asks for voice clarification before proceeding.

### The Multi-Step Paradigm
JARVIS parses complex, compound instructions natively.
*Example:* \`"Open WhatsApp, send Ali 'I'm outside', then open Google Maps."\`
The system maps this into a sequential execution graph, utilizing Accessibility Node traversal to simulate human taps alongside native intents.
    `
  },
  architecture: {
    title: 'Modular System Architecture',
    content: `
The application follows a strictly modular architecture, separating specialized responsibilities into distinct engines.

### Core Modules
*   **Voice Engine**: Manages Wake Word detection (Porcupine) and Continuous Speech-to-Text (Local Whisper / Google STT). Also handles Text-to-Speech (TTS) to speak results back to the user.
*   **AI Intent Engine**: Routes transcriptions to Local LLM or Cloud AI (Gemini) to output structured JSON action arrays.
*   **Action Executor**: The central queue that executes parsed tasks sequentially.
*   **Permission Manager**: Securely gates actions and handles Android permission states.

### Specific Controllers
*   **App Controller**: Uses \`PackageManager\` and Intents to launch applications (e.g., Chrome, Instagram, YouTube) and deep-link directly into search views.
*   **Accessibility Controller**: The "hands and eyes" (\`JarvisAccessibilityService\`). Injects \`ACTION_CLICK\` and \`ACTION_SET_TEXT\` for in-app navigation.
*   **Contact Resolver**: Queries \`ContactsContract\`. If a name (e.g., "Ahmed") matches multiple entries, it interrupts the Action Executor to ask the user via TTS for clarification.
*   **Notification Controller**: Intercepts, reads, and replies to notifications via \`NotificationListenerService\`.
*   **File Manager & Email Manager**: Utilizes \`MediaStore\` and \`Storage Access Framework\` to find requested photos/PDFs, then uses \`Intent.ACTION_SEND\` to dispatch them via Email or Messaging apps.
    `
  },
  permissions: {
    title: 'Permissions & Security',
    content: `
To achieve JARVIS-level integration, the application requires an extensive suite of dangerous and special permissions.

### Special System Permissions
*   \`BIND_ACCESSIBILITY_SERVICE\`: Critical. Required to automate UI interactions and read screen nodes.
*   \`SYSTEM_ALERT_WINDOW\`: Critical. Required for the floating bubble UI and overlays.
*   \`BIND_NOTIFICATION_LISTENER_SERVICE\`: Required to read incoming messages.

### Dangerous Runtime Permissions
*   \`RECORD_AUDIO\`: For STT and wake word detection.
*   \`READ_CONTACTS\`: To resolve names (e.g., "Call Ali") to phone numbers/targets.
*   \`READ_EXTERNAL_STORAGE\` / \`READ_MEDIA_IMAGES\`: For File Manager to access photos and PDFs to send.
*   \`CALL_PHONE\` & \`SEND_SMS\`: For native communication.
*   \`ACCESS_FINE_LOCATION\`: For Google Maps navigation intents.

### Security Handling & Limitations
*   **Confirmation Gates**: Destructive actions (Sending SMS/Email) *must* require voice confirmation ("Are you sure?").
*   **System Settings Limitation**: Android 10+ restricts background toggling of Wi-Fi/Airplane Mode. JARVIS will instead launch the Settings Panel Intent. Flashlight (\`CameraManager\`) and Brightness (\`Settings.System\`) can be toggled directly if \`WRITE_SETTINGS\` is granted.
    `
  },
  limitations: {
    title: 'Android Limitations & Workarounds',
    content: `
Modern Android (12+) heavily restricts background operations. Here is how we bypass or adapt to these limitations:

### 1. Toggling System Settings (Wi-Fi, Bluetooth, Airplane Mode)
*   **Limitation**: Direct APIs to toggle Wi-Fi (\`WifiManager.setWifiEnabled\`) are deprecated or blocked for third-party apps in Android 10+. Airplane mode is completely blocked.
*   **Alternative**: Use Settings Panel Intents. JARVIS will say *"I cannot toggle Wi-Fi directly, opening the panel for you."* and launch \`Settings.Panel.ACTION_WIFI\`. (Flashlight and Brightness *can* be automated).

### 2. Continuous Background Listening (Battery Drain)
*   **Limitation**: Running Google STT or Whisper continuously drains the battery in hours.
*   **Alternative**: Use a lightweight DSP-optimized Wake Word engine (like Picovoice Porcupine). The heavy STT engine is *only* instantiated after the wake word is detected.

### 3. Screen Reading & File Access
*   **Limitation**: Apps marked with \`FLAG_SECURE\` block Accessibility Services. Scoped Storage restricts direct file paths.
*   **Alternative**: Use \`MediaStore\` queries to find "the latest PDF" or "this photo" and pass them via \`FileProvider\` URIs to the target app.

### 4. Background Activity Starts
*   **Limitation**: Android 10+ prevents apps from starting activities from the background.
*   **Alternative**: \`SYSTEM_ALERT_WINDOW\` grants an exemption, allowing JARVIS to launch intents (Maps, YouTube) seamlessly.
    `
  },
  'folder-structure': {
    title: 'Folder Structure',
    content: `
A clean, modular structure separating the Flutter UI presentation from the Native Kotlin engines.

\`\`\`text
jarvis_assistant/
âââ android/
â   âââ app/
â   â   âââ src/main/
â   â   â   âââ AndroidManifest.xml (Defines Services & Permissions)
â   â   â   âââ kotlin/com/example/jarvis/
â   â   â   â   âââ MainActivity.kt (Flutter Engine host)
â   â   â   â   âââ services/
â   â   â   â   â   âââ JarvisVoiceService.kt (Foreground & Wake Word)
â   â   â   â   â   âââ JarvisAccessibilityService.kt (Screen Reader & UI Automation)
â   â   â   â   â   âââ JarvisNotificationService.kt (Notification interception)
â   â   â   â   âââ ai/
â   â   â   â   â   âââ LLMClient.kt (Retrofit client for Gemini/OpenRouter)
â   â   â   â   â   âââ IntentParser.kt (Converts LLM JSON to Action Objects)
â   â   â   â   âââ actions/
â   â   â   â   â   âââ ActionExecutor.kt (Queue manager)
â   â   â   â   â   âââ AppLauncher.kt
â   â   â   â   â   âââ AccessibilityAutomator.kt (Handles UI clicks/typing)
â   â   â   â   âââ ui/
â   â   â   â       âââ FloatingBubbleView.kt (WindowManager Overlay)
â   â   â   âââ res/xml/
â   â   â       âââ accessibility_service_config.xml
âââ lib/ (Flutter UI)
â   âââ main.dart
â   âââ core/
â   â   âââ platform_channels.dart (MethodChannel definitions)
â   â   âââ theme.dart (Futuristic Dark Mode)
â   âââ features/
â   â   âââ onboarding/ (Permission request flows)
â   â   âââ chat_history/ (Transcript view)
â   â   âââ settings/ (Wake word config, API keys)
â   âââ widgets/
â       âââ neon_button.dart
âââ pubspec.yaml
\`\`\`
    `
  },
  'user-flow': {
    title: 'Execution & User Flow',
    content: `
### Multi-Step Command Execution (The "JARVIS" Magic)
How we process: *"Send a message to Ali saying I will arrive in 10 minutes."*

1. **Trigger**: User says "Jarvis". \`VoiceEngine\` pauses wake-word engine, starts STT.
2. **Transcription**: STT outputs the string.
3. **Intent Engine**: Sends text to Gemini. Outputs JSON:
   \`\`\`json
   [
     {"type": "RESOLVE_CONTACT", "name": "Ali"},
     {"type": "SEND_MESSAGE", "app": "whatsapp", "text": "I will arrive in 10 minutes"}
   ]
   \`\`\`
4. **Execution Queue**: \`ActionExecutor\` pops the first item.
5. **Contact Resolution**: 
   - \`ContactResolver\` queries the device.
   - *Branch A*: One "Ali" found. Returns URI.
   - *Branch B*: Multiple found. \`ActionExecutor\` pauses. \`VoiceEngine\` speaks: *"Which Ali? Ali Khan or Ali Smith?"*. Waits for response.
6. **App & Accessibility Automation**: 
   - \`AppController\` launches WhatsApp with the contact URI.
   - \`AccessibilityController\` finds the EditText, calls \`performAction(ACTION_SET_TEXT)\`.
   - Clicks Send.
7. **Feedback**: \`VoiceEngine\` speaks: *"Message sent to Ali."*
    `
  },
  metrics: {
    title: 'System Metrics & Telemetry',
    content: `
Real-time observation of device subsystems is crucial for JARVIS to manage its battery profile dynamically.
    `
  },
  roadmap: {
    title: 'Phased Development Roadmap',
    content: `
### Phase 1: Foundation & Presentation (Weeks 1-2)
*   Setup Flutter project with futuristic Dark Mode UI (Neon accents).
*   Implement \`PermissionManager\` onboarding flows.
*   Establish \`VoiceEngine\` (Porcupine Wake Word + STT/TTS).

### Phase 2: System Hooks & Automation (Weeks 3-4)
*   Build \`AccessibilityController\`. Implement node traversal and click/type actions.
*   Implement \`AppController\` for launching apps and standard Intents (Maps, Chrome, Flashlight).
*   Implement \`ContactResolver\` with disambiguation logic.

### Phase 3: AI Intent Engine & Handlers (Weeks 5-6)
*   Build the \`IntentEngine\` to connect to Gemini/OpenRouter API.
*   Develop the System Prompt for JSON Intent parsing and multi-step arrays.
*   Build \`FileManager\` and \`EmailManager\` for scoped storage queries and attachment handling.

### Phase 4: Executor & Refinement (Weeks 7-8)
*   Implement the \`ActionExecutor\` queue to handle arrays of sequential tasks and handle interruptions (like asking for clarification).
*   Add confirmation gates for destructive actions (Emails, SMS).
*   Beta testing, security audits, and battery optimization profiling.
    `
  }
};
