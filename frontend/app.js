const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const languageList = document.querySelector("#languageList");
const analyticsGrid = document.querySelector("#analyticsGrid");
const activeModel = document.querySelector("#activeModel");
const modelRuntime = document.querySelector("#modelRuntime");
const uploadForm = document.querySelector("#uploadForm");
const resultBox = document.querySelector("#resultBox");
const refreshButton = document.querySelector("#refreshButton");
const submissionButton = document.querySelector("#submissionButton");
const submissionBox = document.querySelector("#submissionBox");
const submissionBuilderForm = document.querySelector("#submissionBuilderForm");
const competitionValidationButton = document.querySelector("#competitionValidationButton");
const competitionValidationSummary = document.querySelector("#competitionValidationSummary");
const competitionValidationGrid = document.querySelector("#competitionValidationGrid");
const competitionValidationBox = document.querySelector("#competitionValidationBox");
const feedbackForm = document.querySelector("#feedbackForm");
const feedbackBox = document.querySelector("#feedbackBox");
const batchForm = document.querySelector("#batchForm");
const batchBox = document.querySelector("#batchBox");
const modelComparison = document.querySelector("#modelComparison");
const leaderboardTable = document.querySelector("#leaderboardTable");
const auditMetrics = document.querySelector("#auditMetrics");
const auditBreakdown = document.querySelector("#auditBreakdown");
const adminDataQualityCenter = document.querySelector("#adminDataQualityCenter");
const offlineMode = document.querySelector("#offlineMode");
const qualityForm = document.querySelector("#qualityForm");
const qualityBox = document.querySelector("#qualityBox");
const werForm = document.querySelector("#werForm");
const werBox = document.querySelector("#werBox");
const accuracyForm = document.querySelector("#accuracyForm");
const accuracyBox = document.querySelector("#accuracyBox");
const accuracySummary = document.querySelector("#accuracySummary");
const vocabularyForm = document.querySelector("#vocabularyForm");
const vocabularyBox = document.querySelector("#vocabularyBox");
const activityStrip = document.querySelector("#activityStrip");
const viewsChart = document.querySelector("#viewsChart");
const downloadsChart = document.querySelector("#downloadsChart");
const downloadButton = document.querySelector("#downloadButton");
const recordButton = document.querySelector("#recordButton");
const stopRecordButton = document.querySelector("#stopRecordButton");
const recordStatus = document.querySelector("#recordStatus");
const recordedAudio = document.querySelector("#recordedAudio");
const recordTimer = document.querySelector("#recordTimer");
const waveform = document.querySelector("#waveform");
const micPermissionStatus = document.querySelector("#micPermissionStatus");
const micPermissionHelp = document.querySelector("#micPermissionHelp");
const asrModelSwitcher = document.querySelector("#asrModelSwitcher");
const streamingTranscript = document.querySelector("#streamingTranscript");
const uploadProgress = document.querySelector("#uploadProgress");
const backendServices = document.querySelector("#backendServices");
const pipelineList = document.querySelector("#pipelineList");
const capacityList = document.querySelector("#capacityList");
const historyTable = document.querySelector("#historyTable");
const historyEmpty = document.querySelector("#historyEmpty");
const recordSearch = document.querySelector("#recordSearch");
const workspaceSummary = document.querySelector("#workspaceSummary");
const currentSpeechRecord = document.querySelector("#currentSpeechRecord");
const speechRecordSummary = document.querySelector("#speechRecordSummary");
const speechRecordTimeline = document.querySelector("#speechRecordTimeline");
const exportRecordsButton = document.querySelector("#exportRecordsButton");
const exportActions = document.querySelector("#exportActions");
const modelQuality = document.querySelector("#modelQuality");
const themeToggle = document.querySelector("#themeToggle");
const themeToggleText = document.querySelector("#themeToggleText");
const globalSearch = document.querySelector("#globalSearch");
const searchResults = document.querySelector("#searchResults");
const navToggle = document.querySelector("#navToggle");
const createMenuButton = document.querySelector("#createMenuButton");
const createMenu = document.querySelector("#createMenu");
const createOverlay = document.querySelector("#createOverlay");
const createCloseButton = document.querySelector("#createCloseButton");
const createCancelButton = document.querySelector("#createCancelButton");
const createItemForm = document.querySelector("#createItemForm");
const createDialogEyebrow = document.querySelector("#createDialogEyebrow");
const createDialogTitle = document.querySelector("#createDialogTitle");
const createDialogSubtitle = document.querySelector("#createDialogSubtitle");
const createTemplateHint = document.querySelector("#createTemplateHint");
const createSubmitButton = document.querySelector("#createSubmitButton");
let activeCreateType = "notebook";
const railMore = document.querySelector(".rail-more");
const moreToggleButton = document.querySelector("#moreToggleButton");
const signInButton = document.querySelector("#signInButton");
const registerButton = document.querySelector("#registerButton");
const userMenu = document.querySelector("#userMenu");
const userMenuButton = document.querySelector("#userMenuButton");
const userDropdown = document.querySelector("#userDropdown");
const userInitials = document.querySelector("#userInitials");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const publicShareUrl = document.querySelector("#publicShareUrl");
const profileShareUrl = document.querySelector("#profileShareUrl");
const copyPublicUrlButton = document.querySelector("#copyPublicUrlButton");
const copyProfileUrlButton = document.querySelector("#copyProfileUrlButton");
const viewProfileLink = document.querySelector("#viewProfileLink");
const profileDisplayName = document.querySelector("#profileDisplayName");
const profileDisplayLead = document.querySelector("#profileDisplayLead");
const profileDisplayUrl = document.querySelector("#profileDisplayUrl");
const copyProfileDisplayUrlButton = document.querySelector("#copyProfileDisplayUrlButton");
const profileRecordCount = document.querySelector("#profileRecordCount");
const profileReviewCount = document.querySelector("#profileReviewCount");
const profileModelChoice = document.querySelector("#profileModelChoice");
const signOutButton = document.querySelector("#signOutButton");
const authOverlay = document.querySelector("#authOverlay");
const authCloseButton = document.querySelector("#authCloseButton");
const authTitle = document.querySelector("#authTitle");
const authSubtitle = document.querySelector("#authSubtitle");
const authMessage = document.querySelector("#authMessage");
const authSwitchButton = document.querySelector("#authSwitchButton");
const signInForm = document.querySelector("#signInForm");
const registerForm = document.querySelector("#registerForm");
const localStatusButton = document.querySelector("#localStatusButton");
const localStatusMenu = document.querySelector("#localStatusMenu");
const copyLocalUrlButton = document.querySelector("#copyLocalUrlButton");
const detectedLanguage = document.querySelector("#detectedLanguage");
const detectedLanguageNote = document.querySelector("#detectedLanguageNote");
const languageOverride = document.querySelector("#languageOverride");
const confidenceTimeline = document.querySelector("#confidenceTimeline");
const confidenceTranscript = document.querySelector("#confidenceTranscript");
const speakerDiarization = document.querySelector("#speakerDiarization");
const waveformTranscriptSync = document.querySelector("#waveformTranscriptSync");
const reviewQueue = document.querySelector("#reviewQueue");
const versionHistory = document.querySelector("#versionHistory");
const contributeButton = document.querySelector("#contributeButton");
const contributionBox = document.querySelector("#contributionBox");
const offlineReadinessPanel = document.querySelector("#offlineReadinessPanel");
const adminQualityAlerts = document.querySelector("#adminQualityAlerts");
const modelCardButton = document.querySelector("#modelCardButton");
const modelCardBox = document.querySelector("#modelCardBox");
const adapterList = document.querySelector("#adapterList");
const adapterForm = document.querySelector("#adapterForm");
const adapterBox = document.querySelector("#adapterBox");
const kaggleSyncButton = document.querySelector("#kaggleSyncButton");
const kaggleSyncBox = document.querySelector("#kaggleSyncBox");
const inspectLocalDatasetButton = document.querySelector("#inspectLocalDatasetButton");
const importLocalDatasetButton = document.querySelector("#importLocalDatasetButton");
const localDatasetBox = document.querySelector("#localDatasetBox");
const hfSyncButton = document.querySelector("#hfSyncButton");
const hfSyncBox = document.querySelector("#hfSyncBox");
const datasetSyncStatus = document.querySelector("#datasetSyncStatus");
const trainingJobs = document.querySelector("#trainingJobs");
const createTrainingJobButton = document.querySelector("#createTrainingJobButton");
const roleMatrix = document.querySelector("#roleMatrix");
const streamingDemoButton = document.querySelector("#streamingDemoButton");
const streamingDemoBox = document.querySelector("#streamingDemoBox");
const translationLayerForm = document.querySelector("#translationLayerForm");
const translationLayerBox = document.querySelector("#translationLayerBox");
const ttsButton = document.querySelector("#ttsButton");
const ttsBox = document.querySelector("#ttsBox");
const deploymentExportButton = document.querySelector("#deploymentExportButton");
const deploymentExportBox = document.querySelector("#deploymentExportBox");
const evaluationReportButton = document.querySelector("#evaluationReportButton");
const evaluationReportBox = document.querySelector("#evaluationReportBox");
const workspaceSwitcher = document.querySelector("#workspaceSwitcher");
const newWorkspaceButton = document.querySelector("#newWorkspaceButton");
const toastRegion = document.querySelector("#toastRegion");
const recordDrawer = document.querySelector("#recordDrawer");
const recordDrawerClose = document.querySelector("#recordDrawerClose");
const recordDrawerContent = document.querySelector("#recordDrawerContent");
const createJobButton = document.querySelector("#createJobButton");
const jobsBoard = document.querySelector("#jobsBoard");
const evaluationForm = document.querySelector("#evaluationForm");
const evaluationBoard = document.querySelector("#evaluationBoard");
const deploymentReadiness = document.querySelector("#deploymentReadiness");
const settingsForm = document.querySelector("#settingsForm");
const settingsRuntime = document.querySelector("#settingsRuntime");
const auditLogTable = document.querySelector("#auditLogTable");
const contactForm = document.querySelector("#contactForm");
const contactBox = document.querySelector("#contactBox");
const kaggleFooter = document.querySelector(".kaggle-footer");

let mediaRecorder;
let recordedChunks = [];
let recordStartedAt = 0;
let recordTicker;
let lastTranscript = null;
let authMode = "signin";
let latestCorrection = null;
let latestModelData = null;
let latestOfflineData = null;
let latestAuditData = null;
let reviewItems = [];
let versionItems = [];
let speechRecords = [];
let recordSearchQuery = "";
let streamingTicker = null;
let streamingIndex = 0;
let selectedAsrModel = localStorage.getItem("afrivoice-selected-model") || "mock";
let createdWorkspaceItems = JSON.parse(localStorage.getItem("afrivoice-created-workspace-items") || "[]");

const createTypeConfig = {
  notebook: {
    label: "Notebook",
    target: "codeapi",
    icon: "#icon-notebook",
    eyebrow: "Create notebook",
    title: "Create Notebook",
    subtitle: "Save an analysis or API workflow for experiments, transcriptions, dataset cleanup, or model evaluation.",
    hint: "Recommended: describe the API call, dataset path, model adapter, and expected output.",
    name: "AfriVoice ASR experiment notebook",
    status: "Draft",
  },
  dataset: {
    label: "Dataset",
    target: "audit",
    icon: "#icon-dataset",
    eyebrow: "Create dataset",
    title: "Create Dataset",
    subtitle: "Register a dataset workspace for uploads, Kaggle sync, manifests, audit checks, and language coverage.",
    hint: "Recommended: include source, license, language split, scripted/unscripted status, and transcript availability.",
    name: "East Africa speech dataset",
    status: "Needs review",
  },
  competition: {
    label: "Competition",
    target: "competition",
    icon: "#icon-competition",
    eyebrow: "Create competition",
    title: "Create Competition",
    subtitle: "Define an ASR challenge workspace with metric, submission format, datasets, and leaderboard goals.",
    hint: "Recommended: define WER metric, eligible languages, baseline model, and submission deadline.",
    name: "AfriVoice ASR challenge",
    status: "Draft",
  },
  hackathon: {
    label: "Hackathon",
    target: "hackathon",
    icon: "#icon-hackathon",
    eyebrow: "Create hackathon",
    title: "Create Hackathon",
    subtitle: "Plan a build sprint for recording, training, review, submission, and edge deployment work.",
    hint: "Recommended: include team roles, milestones, deliverables, judging criteria, and demo target.",
    name: "EAC ASR build sprint",
    status: "In progress",
  },
  benchmark: {
    label: "Benchmark",
    target: "leaderboard",
    icon: "#icon-benchmark",
    eyebrow: "Create benchmark",
    title: "Create Benchmark",
    subtitle: "Create a model evaluation benchmark with WER, CER, latency, memory, confidence, and edge readiness.",
    hint: "Recommended: compare mock, Whisper, faster-whisper, fine-tuned, and quantized edge models per language.",
    name: "Six-language ASR benchmark",
    status: "Ready",
  },
};
let activeWorkspaceId = localStorage.getItem("afrivoice-workspace-id") || "";
const PUBLIC_PROJECT_URL = "https://kaggle-eac-asr-platform.onrender.com";

const adapterAliases = {
  "faster-whisper": "faster_whisper",
  afrivoice: "hf_finetuned",
  edge: "hf_finetuned",
};

selectedAsrModel = adapterAliases[selectedAsrModel] || selectedAsrModel;

const uploadStages = ["Uploading", "Checking audio quality", "Transcribing", "Saving record", "Ready"];
const streamingWords = ["habari", "yako", "leo", "karibu", "katika", "huduma", "ya", "sauti"];

const moreSectionIds = new Set([
  "support",
  "transcribe",
  "history",
  "models",
  "discussions",
  "learn",
  "documentation",
  "rankings",
  "blog",
  "guidelines",
  "team",
  "contact",
  "terms",
  "privacy",
]);

const languageDirectory = [
  {
    code: "swa",
    name: "Swahili",
    aliases: ["kiswahili", "swa"],
    status: "Ready",
    panel: "transcribe",
    note: "Ready for upload, live recording, review, and export.",
  },
  {
    code: "kik",
    name: "Kikuyu",
    aliases: ["gikuyu", "kik"],
    status: "Training",
    panel: "audit",
    note: "Training set needs balanced validation and speaker checks.",
  },
  {
    code: "luo",
    name: "Luo / Dholuo",
    aliases: ["dholuo", "luo"],
    status: "Ready",
    panel: "leaderboard",
    note: "Ready for per-language WER tracking and model comparison.",
  },
  {
    code: "som",
    name: "Somali",
    aliases: ["som", "af somali"],
    status: "Ready",
    panel: "transcribe",
    note: "Ready for transcription and language-specific review.",
  },
  {
    code: "mas",
    name: "Maasai",
    aliases: ["masai", "maa", "mas"],
    status: "Needs review",
    panel: "editor",
    note: "Needs correction review before stronger model evaluation.",
  },
  {
    code: "kln",
    name: "Kalenjin",
    aliases: ["kalenjin", "nandi", "kln"],
    status: "Training",
    panel: "audit",
    note: "Training and dataset audit are the best next actions.",
  },
];

const languageNames = Object.fromEntries(languageDirectory.map((language) => [language.code, language.name]));

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("afrivoice-user") || "null");
  } catch {
    return null;
  }
}

function getAuthToken() {
  return localStorage.getItem("afrivoice-token") || "";
}

function slugifyUsername(value = "") {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "asr-user";
}

function getUserSlug(user = getStoredUser()) {
  if (!user) return "asr-user";
  return slugifyUsername(user.username || user.name || String(user.email || "").split("@")[0]);
}

function getUserProfileUrl(user = getStoredUser()) {
  return `${PUBLIC_PROJECT_URL}/@${getUserSlug(user)}`;
}

function renderProfileView(user = getStoredUser(), routeSlug = "") {
  const slug = routeSlug || getUserSlug(user);
  const profileUrl = `${PUBLIC_PROJECT_URL}/@${slug}`;
  const displayName = user?.name || (routeSlug ? routeSlug.replace(/-/g, " ") : "Kaggle ASR user");
  const reviewCount = speechRecords.filter((record) => Number(record.confidence || 0) < 0.72).length;
  if (profileDisplayName) profileDisplayName.textContent = displayName;
  if (profileDisplayLead) {
    profileDisplayLead.textContent = user?.email
      ? `${user.email} · Public ASR workspace profile for speech records, review work, model runs, and Kaggle submission progress.`
      : "Public ASR workspace profile for speech records, review work, model runs, and Kaggle submission progress.";
  }
  if (profileDisplayUrl) profileDisplayUrl.textContent = profileUrl;
  if (profileRecordCount) profileRecordCount.textContent = String(speechRecords.length);
  if (profileReviewCount) profileReviewCount.textContent = String(reviewCount);
  if (profileModelChoice) profileModelChoice.textContent = selectedAsrModel;
  return profileUrl;
}

function updateProfileLinks() {
  const user = getStoredUser();
  const profileUrl = getUserProfileUrl(user);
  if (profileShareUrl) profileShareUrl.textContent = profileUrl;
  if (viewProfileLink) viewProfileLink.href = `/@${getUserSlug(user)}`;
  renderProfileView(user);
}

function authHeaders(extra = {}) {
  const token = getAuthToken();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : extra;
}

async function apiFetch(url, options = {}) {
  const headers = authHeaders(options.headers || {});
  return fetch(url, { ...options, headers });
}

function showToast(message, type = "success") {
  if (!toastRegion) return;
  const item = document.createElement("div");
  item.className = `toast ${type}`;
  item.innerHTML = `<strong>${type === "error" ? "Action needed" : "Done"}</strong><span>${message}</span>`;
  toastRegion.appendChild(item);
  setTimeout(() => item.classList.add("show"), 20);
  setTimeout(() => {
    item.classList.remove("show");
    setTimeout(() => item.remove(), 220);
  }, 4200);
}

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "US";
  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join("");
}

function saveWorkspaceState() {
  const user = getStoredUser();
  if (!user?.email) return;
  localStorage.setItem(`afrivoice-workspace:${user.email}`, JSON.stringify({
    savedAt: new Date().toISOString(),
    records: speechRecords.slice(0, 100),
    corrections: versionItems,
    reviewQueue: reviewItems,
    selectedModel: selectedAsrModel,
  }));
}

function updateWorkspaceSummary() {
  if (!workspaceSummary) return;
  const user = getStoredUser();
  const reviewCount = speechRecords.filter((record) => Number(record.confidence || 0) < 0.72).length;
  if (!user?.email) {
    workspaceSummary.textContent = `${speechRecords.length} local records. Sign in to save workspace preferences.`;
    return;
  }
  workspaceSummary.textContent = `${user.email} · ${speechRecords.length} records · ${reviewCount} need review · ${selectedAsrModel}`;
}

function updateAuthToolbar() {
  const user = getStoredUser();
  const signedIn = Boolean(user?.email);
  if (signInButton) signInButton.hidden = signedIn;
  if (registerButton) registerButton.hidden = signedIn;
  if (userMenu) userMenu.hidden = !signedIn;
  if (publicShareUrl) publicShareUrl.textContent = PUBLIC_PROJECT_URL;
  updateProfileLinks();
  if (signedIn) {
    const displayName = user.name || user.email.split("@")[0];
    if (userInitials) userInitials.textContent = getInitials(displayName);
    if (userName) userName.textContent = displayName;
    if (userEmail) userEmail.textContent = user.email;
  }
  updateWorkspaceSummary();
}

function renderWorkspaceOptions(workspaces = []) {
  if (!workspaceSwitcher) return;
  if (!workspaces.length) {
    workspaceSwitcher.innerHTML = `<option value="">Local workspace</option>`;
    return;
  }
  if (!activeWorkspaceId) activeWorkspaceId = workspaces[0].id;
  workspaceSwitcher.innerHTML = workspaces.map((workspace) => (
    `<option value="${workspace.id}" ${workspace.id === activeWorkspaceId ? "selected" : ""}>${workspace.name}</option>`
  )).join("");
}

async function loadWorkspaces() {
  if (!getAuthToken()) {
    renderWorkspaceOptions([]);
    return;
  }
  const response = await apiFetch("/api/v1/workspaces");
  if (!response.ok) return;
  const data = await response.json();
  renderWorkspaceOptions(data.items || []);
}

function appendWorkspace(formData) {
  if (activeWorkspaceId) formData.set("workspace_id", activeWorkspaceId);
}

function setAuthMode(mode) {
  authMode = mode;
  const isRegister = mode === "register";
  if (authTitle) authTitle.textContent = isRegister ? "Create account" : "Sign in";
  if (authSubtitle) {
    authSubtitle.textContent = isRegister
      ? "Create a workspace profile for transcripts, corrections, submissions, and model review."
      : "Access saved transcripts, submissions, model runs, and correction history.";
  }
  if (signInForm) {
    signInForm.hidden = isRegister;
    signInForm.setAttribute("aria-hidden", String(isRegister));
    signInForm.querySelectorAll("input, button").forEach((field) => { field.disabled = isRegister; });
  }
  if (registerForm) {
    registerForm.hidden = !isRegister;
    registerForm.setAttribute("aria-hidden", String(!isRegister));
    registerForm.querySelectorAll("input, button").forEach((field) => { field.disabled = !isRegister; });
  }
  if (authSwitchButton) authSwitchButton.textContent = isRegister ? "Already have an account? Sign in" : "New here? Create an account";
  if (authMessage) {
    authMessage.textContent = "";
    authMessage.className = "auth-message";
  }
}

function openAuth(mode = "signin") {
  setAuthMode(mode);
  if (!authOverlay) return;
  authOverlay.hidden = false;
  document.body.classList.add("auth-open");
  const firstInput = authOverlay.querySelector(".auth-form:not([hidden]) input");
  firstInput?.focus();
}

function closeAuth() {
  if (!authOverlay) return;
  authOverlay.hidden = true;
  document.body.classList.remove("auth-open");
}

function showAuthMessage(message, type = "success") {
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.className = `auth-message ${type}`;
}

function saveUserSession(user) {
  if (user.access_token) localStorage.setItem("afrivoice-token", user.access_token);
  localStorage.setItem("afrivoice-user", JSON.stringify({
    ...user,
    signedInAt: new Date().toISOString(),
  }));
  if (user.active_workspace_id) {
    activeWorkspaceId = user.active_workspace_id;
    localStorage.setItem("afrivoice-workspace-id", activeWorkspaceId);
  }
  updateAuthToolbar();
  renderWorkspaceOptions(user.workspaces || []);
  saveWorkspaceState();
  closeAuth();
  showToast(`Signed in as ${user.email}`);
}

function getTranscriptText(result = {}) {
  return String(result.normalized_text || result.text || result.transcript || "").trim();
}

function seededConfidence(word, index, base = 0.86) {
  const seed = [...word].reduce((sum, char) => sum + char.charCodeAt(0), index * 17);
  const drift = ((seed % 31) - 15) / 100;
  return Math.max(0.58, Math.min(0.98, base + drift));
}

function deriveWordTimeline(result = {}) {
  const text = getTranscriptText(result);
  const words = text ? text.split(/\s+/).slice(0, 42) : ["habari", "yako", "leo", "karibu", "kwenye", "huduma"];
  const base = Number(result.confidence || 0.86);
  return words.map((word, index) => ({
    word,
    confidence: seededConfidence(word, index, base),
    start: Number((index * 0.62).toFixed(2)),
    end: Number((index * 0.62 + 0.48).toFixed(2)),
  }));
}

function renderTranscriptIntelligence(result = {}) {
  const languageCode = languageOverride?.value || result.language || result.detected_language || "swa";
  const confidence = Number(result.confidence || 0.92);
  const languageName = languageNames[languageCode] || "Auto detected";
  if (detectedLanguage) detectedLanguage.textContent = `Detected: ${languageName}, ${Math.round(confidence * 100)}% confidence`;
  if (detectedLanguageNote) {
    detectedLanguageNote.textContent = languageOverride?.value
      ? `Manual override selected for ${languageName}. This value will be used for review and correction.`
      : "Use override only when the detector chooses the wrong language.";
  }

  const timeline = deriveWordTimeline({ ...result, language: languageCode });
  if (confidenceTimeline) {
    confidenceTimeline.classList.remove("empty");
    confidenceTimeline.innerHTML = timeline.map((token) => {
      const level = token.confidence < 0.72 ? "low" : token.confidence < 0.84 ? "medium" : "high";
      return `<button class="confidence-token ${level}" type="button" data-start="${token.start}" title="${Math.round(token.confidence * 100)}% confidence">${token.word}<small>${Math.round(token.confidence * 100)}%</small></button>`;
    }).join("");
  }

  if (confidenceTranscript) {
    confidenceTranscript.classList.remove("empty");
    confidenceTranscript.innerHTML = timeline.map((token) => {
      const level = token.confidence < 0.72 ? "low" : token.confidence < 0.84 ? "medium" : "high";
      return `<button class="confidence-word ${level}" type="button" data-start="${token.start}" title="${Math.round(token.confidence * 100)}% confidence">${token.word}</button>`;
    }).join(" ");
  }

  if (waveformTranscriptSync) {
    waveformTranscriptSync.classList.remove("empty");
    waveformTranscriptSync.innerHTML = timeline.map((token) => (
      `<button type="button" data-start="${token.start}">${token.word}<small>${token.start}s</small></button>`
    )).join("");
  }

  if (speakerDiarization) {
    const segments = result.segments?.length ? result.segments : timeline.reduce((items, token, index) => {
      if (index % 8 === 0) items.push({ speaker: items.length % 2 === 0 ? "Speaker 1" : "Speaker 2", text: [] });
      items.at(-1).text.push(token.word);
      return items;
    }, []).map((segment) => ({ ...segment, text: segment.text.join(" ") }));
    speakerDiarization.classList.remove("empty");
    speakerDiarization.innerHTML = segments.slice(0, 5).map((segment, index) => `
      <div class="speaker-turn">
        <strong>${segment.speaker || `Speaker ${(index % 2) + 1}`}</strong>
        <span>${segment.text || segment.transcript || getTranscriptText(result) || "Speech segment ready for review."}</span>
      </div>
    `).join("");
  }

  document.querySelectorAll("[data-start]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!recordedAudio || !recordedAudio.src) return;
      recordedAudio.currentTime = Number(button.dataset.start || 0);
      recordedAudio.play().catch(() => {});
    });
  });
}

function addReviewItem(result = {}) {
  if (!result.id && !getTranscriptText(result)) return;
  const item = {
    id: result.id || `local-${Date.now()}`,
    language: result.language || languageOverride?.value || "swa",
    confidence: Number(result.confidence || 0.86),
    text: getTranscriptText(result),
    status: "Needs review",
  };
  reviewItems = [item, ...reviewItems.filter((existing) => existing.id !== item.id)].slice(0, 6);
  renderReviewQueue();
}

function renderReviewQueue() {
  if (!reviewQueue) return;
  if (!reviewItems.length) {
    reviewQueue.innerHTML = `<div class="empty-state compact-empty"><h3>No review items</h3><p>Run transcription to add low-confidence or new transcripts here.</p></div>`;
    return;
  }
  reviewQueue.innerHTML = reviewItems.map((item) => `
    <article class="review-item ${item.status.toLowerCase().replaceAll(" ", "-")}">
      <div>
        <strong>${item.id}</strong>
        <span>${languageNames[item.language] || item.language} · ${Math.round(item.confidence * 100)}% · ${item.status}</span>
        <p>${item.text || "No transcript text available."}</p>
      </div>
      <div class="review-actions">
        <button type="button" data-review-action="Approved" data-review-id="${item.id}">Approve</button>
        <button type="button" data-review-action="Rejected" data-review-id="${item.id}">Reject</button>
        <button type="button" data-review-action="Corrected" data-review-id="${item.id}">Correct</button>
      </div>
    </article>
  `).join("");
  reviewQueue.querySelectorAll("[data-review-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const item = reviewItems.find((entry) => entry.id === button.dataset.reviewId);
      if (!item) return;
      item.status = button.dataset.reviewAction;
      if (item.status === "Corrected") {
        feedbackForm.transcription_id.value = item.id;
        feedbackForm.corrected_text.value = item.text;
        feedbackForm.language.value = item.language;
      }
      if (getAuthToken() && !String(item.id).startsWith("local-")) {
        const response = await apiFetch("/api/v1/ops/reviews/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcription_id: item.id,
            status: item.status,
            notes: `Marked ${item.status} from human review queue.`,
          }),
        });
        if (response.ok) {
          showToast(`Review saved as ${item.status}.`);
        } else {
          showToast("Review state was updated locally. Sign in with reviewer permissions to persist it.", "error");
        }
      }
      renderReviewQueue();
    });
  });
}

function addVersionItem({ id, before, after, language, note = "" }) {
  if (!id || !after) return;
  versionItems = [{
    id,
    before: before || "Original transcript not loaded.",
    after,
    language,
    note,
    createdAt: new Date().toISOString(),
  }, ...versionItems].slice(0, 8);
  renderVersionHistory();
}

function renderVersionHistory() {
  if (!versionHistory) return;
  if (!versionItems.length) {
    versionHistory.classList.add("empty");
    versionHistory.textContent = "No transcript versions saved yet.";
    return;
  }
  versionHistory.classList.remove("empty");
  versionHistory.innerHTML = versionItems.map((version, index) => `
    <details ${index === 0 ? "open" : ""}>
      <summary>${version.id} · ${languageNames[version.language] || version.language} · ${new Date(version.createdAt).toLocaleString()}</summary>
      <div class="version-compare">
        <div><span>Original ASR</span><p>${version.before}</p></div>
        <div><span>Corrected</span><p>${version.after}</p></div>
      </div>
      <small>${version.note || "Saved as correction version."}</small>
    </details>
  `).join("");
}

function renderOfflineReadiness(models = [], offline = {}) {
  if (!offlineReadinessPanel) return;
  const edge = models.find((model) => model.mode?.includes("edge") || model.name?.includes("edge")) || models.at(-1);
  offlineReadinessPanel.innerHTML = `
    <div class="readiness-meter">
      <strong>${edge ? "Edge-ready" : "Checking"}</strong>
      <span>${offline.current_mode || "server_mock"}</span>
    </div>
    <dl>
      <div><dt>Recommended model</dt><dd>${edge?.name || "afrivoice-edge-int8"}</dd></div>
      <div><dt>Estimated memory</dt><dd>${edge?.memory_mb || 640} MB</dd></div>
      <div><dt>Model size</dt><dd>${edge?.model_size_mb || 244} MB</dd></div>
      <div><dt>Best device</dt><dd>4GB RAM Android, Raspberry Pi 5, or offline laptop</dd></div>
    </dl>
  `;
}

function renderAdminAlerts(audit = {}, models = []) {
  if (!adminQualityAlerts) return;
  const worstModel = models.reduce((worst, model) => (Number(model.wer) > Number(worst?.wer || 0) ? model : worst), models[0]);
  const alerts = [
    { level: "warning", title: "Low-resource balance", text: "Maasai and Kalenjin need more reviewed corrections before final training." },
    { level: "info", title: "Missing transcripts", text: `${audit.missing_transcripts ?? 17} dataset rows need transcript cleanup.` },
    { level: "danger", title: "Corrupt audio watchlist", text: `${audit.corrupt_files ?? 4} files should be excluded or repaired before model training.` },
    { level: "warning", title: "Weakest model WER", text: `${worstModel?.name || "baseline-whisper-small"} is still above target for edge deployment.` },
  ];
  adminQualityAlerts.innerHTML = alerts.map((alert) => `
    <div class="quality-alert ${alert.level}">
      <strong>${alert.title}</strong>
      <span>${alert.text}</span>
    </div>
  `).join("");
}

function renderAdminDataQualityCenter(audit = {}) {
  if (!adminDataQualityCenter) return;
  const languages = Object.entries(audit.language_breakdown || {});
  const weakestLanguage = languages
    .map(([code, item]) => ({ code, ...item }))
    .sort((a, b) => Number(a.hours || 0) - Number(b.hours || 0))[0];
  const alerts = [
    { label: "Noisy files", value: audit.noisy_files ?? 7, state: "warning", note: "Route through audio quality checker before training." },
    { label: "Missing transcripts", value: audit.missing_transcripts ?? 0, state: Number(audit.missing_transcripts || 0) ? "danger" : "info", note: "Block from manifest until corrected." },
    { label: "Corrupt files", value: audit.corrupt_files ?? 0, state: Number(audit.corrupt_files || 0) ? "danger" : "info", note: "Exclude or repair before Kaggle submission." },
    { label: "Weak coverage", value: weakestLanguage ? `${weakestLanguage.code} · ${weakestLanguage.hours}h` : "n/a", state: "warning", note: "Prioritize collection for language balance." },
    { label: "Low confidence queue", value: `${Math.round((audit.low_confidence_rate || 0.18) * 100)}%`, state: "warning", note: "Send to human review before feedback export." },
  ];
  adminDataQualityCenter.innerHTML = alerts.map((alert) => `
    <div class="quality-alert ${alert.state}">
      <strong>${alert.label}: ${alert.value}</strong>
      <span>${alert.note}</span>
    </div>
  `).join("");
}

function formatDuration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds || 0)));
  const minutes = String(Math.floor(total / 60)).padStart(2, "0");
  const remainder = String(total % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function formatFileSize(bytes) {
  const size = Number(bytes || 0);
  if (!size) return "n/a";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function normalizeSpeechRecord(item = {}) {
  const created = item.created_at ? new Date(item.created_at) : new Date();
  return {
    id: item.id || `local-${Date.now()}`,
    sourceType: item.source_type || item.sourceType || "upload",
    filename: item.audio_filename || item.filename || "browser recording",
    language: item.language || "auto",
    confidence: item.confidence,
    transcript: item.normalized_text || item.text || item.transcript || "",
    durationSec: item.duration_sec || item.durationSec || 0,
    sizeBytes: item.audio_size_bytes || item.sizeBytes || 0,
    audioUrl: item.audio_url || (item.id ? `/api/v1/transcriptions/${item.id}/audio` : ""),
    date: created.toLocaleDateString(),
    time: created.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    createdAt: created.toISOString(),
  };
}

function setCurrentSpeechRecord(result, overrides = {}) {
  const record = normalizeSpeechRecord({ ...result, ...overrides });
  speechRecords = [record, ...speechRecords.filter((item) => item.id !== record.id)];
  renderCurrentSpeechRecord(record);
  renderSpeechRecords(speechRecords);
  saveWorkspaceState();
  return record;
}

function recordMatchesSearch(record, query = recordSearchQuery) {
  const normalized = normalizeSearch(query);
  if (!normalized) return true;
  const confidencePercent = record.confidence == null ? "n/a" : `${Math.round(Number(record.confidence) * 100)}%`;
  const haystack = [
    record.filename,
    record.sourceType,
    languageNames[record.language],
    record.language,
    record.transcript,
    record.date,
    record.time,
    confidencePercent,
    Number(record.confidence || 0) < 0.72 ? "needs review" : "ready",
  ].join(" ").toLowerCase();
  return haystack.includes(normalized);
}

async function replaySpeechRecord(recordId) {
  if (!recordId || !recordedAudio) return;
  const result = await (await apiFetch(`/api/v1/transcriptions/${recordId}`)).json();
  lastTranscript = result;
  recordedAudio.src = `/api/v1/transcriptions/${recordId}/audio`;
  recordedAudio.load();
  resultBox.textContent = JSON.stringify(result, null, 2);
  renderTranscriptIntelligence(result);
  renderCurrentSpeechRecord(normalizeSpeechRecord(result));
  exportActions.hidden = false;
  showPanel("transcribe");
  syncNavigation("transcribe");
  showToast("Saved audio loaded for replay.");
}

async function deleteSpeechRecord(recordId) {
  if (!recordId) return;
  const response = await apiFetch(`/api/v1/transcriptions/${recordId}`, { method: "DELETE" });
  if (!response.ok && response.status !== 404) return;
  if (lastTranscript?.id === recordId) {
    lastTranscript = null;
    resultBox.textContent = "Speech record deleted. Record or upload audio to create a new transcript.";
    recordedAudio.removeAttribute("src");
    recordedAudio.load();
    exportActions.hidden = true;
  }
  speechRecords = speechRecords.filter((record) => record.id !== recordId);
  renderSpeechRecords(speechRecords);
  closeRecordDrawer();
  showToast("Speech record deleted.");
  await Promise.all([loadAnalytics(), loadHistory()]);
}

function closeRecordDrawer() {
  if (!recordDrawer) return;
  recordDrawer.hidden = true;
  document.body.classList.remove("drawer-open");
}

async function openRecordDrawer(recordId) {
  if (!recordDrawer || !recordDrawerContent || !recordId) return;
  const response = await apiFetch(`/api/v1/transcriptions/${recordId}`);
  if (!response.ok) {
    showToast("Could not open this speech record.", "error");
    return;
  }
  const result = await response.json();
  const record = normalizeSpeechRecord(result);
  lastTranscript = result;
  const timeline = deriveWordTimeline(result);
  recordDrawerContent.innerHTML = `
    <p class="eyebrow">Record details</p>
    <h2>${record.filename || "Speech record"}</h2>
    <div class="drawer-meta">
      <span>${languageNames[record.language] || record.language}</span>
      <span>${record.date}</span>
      <span>${record.time}</span>
      <span>${formatDuration(record.durationSec)}</span>
      <span>${record.confidence == null ? "n/a" : `${Math.round(record.confidence * 100)}% confidence`}</span>
      <span>${result.needs_review ? "Needs review" : "Reviewed"}</span>
    </div>
    <audio controls src="${record.audioUrl}"></audio>
    <h3>Transcript</h3>
    <p class="drawer-transcript">${record.transcript || "No transcript text available."}</p>
    <h3>Confidence words</h3>
    <div class="confidence-transcript drawer-words">
      ${timeline.map((token) => `<span class="${token.confidence < 0.72 ? "low" : "ok"}">${token.word}<small>${Math.round(token.confidence * 100)}%</small></span>`).join("")}
    </div>
    <h3>Review workflow</h3>
    <div class="drawer-actions compact-drawer-actions">
      <button type="button" data-drawer-review="Needs Review">Needs Review</button>
      <button type="button" data-drawer-review="Approved">Approve</button>
      <button type="button" data-drawer-review="Rejected">Reject</button>
      <button type="button" data-drawer-review="Corrected">Corrected</button>
    </div>
    <h3>Translations and versions</h3>
    <div class="drawer-version-grid">
      <article><strong>Translation</strong><p>${result.translation?.translated_text || "No translation requested for this record."}</p></article>
      <article><strong>Version history</strong><p>Original ASR output is stored. Corrections saved in the editor create feedback versions for training.</p></article>
      <article><strong>Metadata</strong><p>${record.sourceType || "upload"} · ${result.audio_content_type || "audio"} · ${result.audio_size_bytes || 0} bytes · ${result.domain || "general"}</p></article>
    </div>
    <h3>Actions</h3>
    <div class="drawer-actions">
      <button type="button" data-drawer-replay="${record.id}">Replay in workspace</button>
      <button type="button" data-drawer-edit="${record.id}">Edit transcript</button>
      <button type="button" data-drawer-assign="${record.id}">Assign review</button>
      <button type="button" data-drawer-download="${record.id}">Download .txt</button>
      <button type="button" class="danger-action" data-drawer-delete="${record.id}">Delete record</button>
    </div>
  `;
  recordDrawer.hidden = false;
  document.body.classList.add("drawer-open");
  recordDrawer.querySelector("[data-drawer-replay]")?.addEventListener("click", () => replaySpeechRecord(record.id));
  recordDrawer.querySelector("[data-drawer-edit]")?.addEventListener("click", () => {
    feedbackForm.transcription_id.value = result.id;
    feedbackForm.corrected_text.value = result.normalized_text || result.text || "";
    feedbackForm.language.value = result.language || "swa";
    showPanel("editor");
    syncNavigation("editor");
  });
  recordDrawer.querySelector("[data-drawer-assign]")?.addEventListener("click", async () => {
    if (!getAuthToken()) {
      openAuth("signin");
      return;
    }
    await apiFetch("/api/v1/ops/reviews/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcription_id: record.id, notes: "Assigned from record details drawer." }),
    });
    showToast("Review assignment created.");
  });
  recordDrawer.querySelectorAll("[data-drawer-review]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!getAuthToken()) {
        openAuth("signin");
        return;
      }
      const response = await apiFetch("/api/v1/ops/reviews/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcription_id: record.id, status: button.dataset.drawerReview, notes: "Updated from record details drawer." }),
      });
      if (response.ok) {
        showToast(`Record marked ${button.dataset.drawerReview}.`);
        await openRecordDrawer(record.id);
      } else {
        showToast("Could not save review status for this role.", "error");
      }
    });
  });
  recordDrawer.querySelector("[data-drawer-download]")?.addEventListener("click", () => {
    downloadText(`transcript-${record.id}.txt`, "text/plain", record.transcript || "");
    auditExport(record.id, "txt");
    showToast("Transcript export ready.");
  });
  recordDrawer.querySelector("[data-drawer-delete]")?.addEventListener("click", () => deleteSpeechRecord(record.id));
}

function renderCurrentSpeechRecord(record) {
  if (!currentSpeechRecord) return;
  if (!record) {
    currentSpeechRecord.innerHTML = `
      <span class="insight-label">Current speech record</span>
      <strong>No active record yet</strong>
      <p>Record or upload audio to save speech history with transcript, language, date, time, and duration.</p>
    `;
    return;
  }
  const fileCellContent = `
    <span>Current Speech File</span>
    <span class="current-file-body">
      <span>
        <strong>${record.filename || (record.sourceType === "recording" ? "Live recording" : "Uploaded file")}</strong>
        <small>${record.sourceType === "recording" ? "Recorded speech" : "Uploaded audio"} · ${languageNames[record.language] || record.language}</small>
        ${record.audioUrl ? "<em>Click file to replay saved audio</em>" : ""}
      </span>
      <button class="current-file-delete" type="button" data-delete-current="${record.id}" aria-label="Delete saved audio ${record.filename || record.id}">Delete</button>
    </span>
  `;
  currentSpeechRecord.innerHTML = `
    <div class="current-record-row">
      ${record.audioUrl
        ? `<button class="current-record-cell file-cell current-record-replay" type="button" data-replay-current="${record.id}" aria-label="Replay saved audio for ${record.filename || record.id}">${fileCellContent}</button>`
        : `<div class="current-record-cell file-cell">${fileCellContent}</div>`}
      <div class="current-record-cell"><span>Date</span><strong>${record.date}</strong></div>
      <div class="current-record-cell"><span>Time</span><strong>${record.time}</strong></div>
      <div class="current-record-cell"><span>Duration</span><strong>${formatDuration(record.durationSec)}</strong></div>
      <div class="current-record-cell"><span>Confidence</span><strong>${record.confidence == null ? "n/a" : `${Math.round(Number(record.confidence) * 100)}%`}</strong></div>
    </div>
    <p class="current-record-transcript">${record.transcript || "Transcript stored for future review."}</p>
  `;
  currentSpeechRecord.classList.toggle("is-replayable", Boolean(record.audioUrl));
  currentSpeechRecord.setAttribute("role", "region");
  currentSpeechRecord.removeAttribute("tabindex");
  currentSpeechRecord.setAttribute("aria-label", "Current speech record");
  currentSpeechRecord.onclick = null;
  currentSpeechRecord.onkeydown = null;
  currentSpeechRecord.querySelector("[data-replay-current]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    replaySpeechRecord(record.id);
  });
  currentSpeechRecord.querySelector("[data-delete-current]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteSpeechRecord(record.id);
  });
}

function renderSpeechRecords(records = speechRecords) {
  speechRecords = records.map(normalizeSpeechRecord);
  const latest = speechRecords[0];
  const visibleRecords = speechRecords.filter((record) => recordMatchesSearch(record));
  renderCurrentSpeechRecord(latest);
  if (speechRecordSummary) {
    const recordings = speechRecords.filter((record) => record.sourceType === "recording").length;
    const uploads = speechRecords.length - recordings;
    const filteredText = recordSearchQuery ? ` · ${visibleRecords.length} matched` : "";
    speechRecordSummary.textContent = `${speechRecords.length} saved speech records · ${recordings} recordings · ${uploads} uploads${filteredText}`;
  }
  updateWorkspaceSummary();
  if (!speechRecordTimeline) return;
  if (!visibleRecords.length) {
    speechRecordTimeline.innerHTML = `<div class="empty-state compact-empty"><h3>${speechRecords.length ? "No matching records" : "No speech records stored"}</h3><p>${speechRecords.length ? "Try another language, filename, transcript word, date, or confidence search." : "New recordings and uploads will appear here automatically."}</p></div>`;
    return;
  }
  speechRecordTimeline.innerHTML = visibleRecords.slice(0, 12).map((record) => `
    <article class="speech-record-card is-replayable" role="button" tabindex="0" data-card-replay="${record.id}" aria-label="Replay ${record.filename || record.id}">
      <div class="record-type ${record.sourceType}">${record.sourceType === "recording" ? "Recording" : "Upload"}</div>
      <div>
        <strong>${record.filename || record.id}</strong>
        <span>${record.date} · ${record.time} · ${formatDuration(record.durationSec)} · ${languageNames[record.language] || record.language}</span>
        <p>${record.transcript || "Transcript saved for future review."}</p>
      </div>
      <div class="record-card-actions">
        <button type="button" data-replay-record="${record.id}">Replay</button>
        <button type="button" data-view-record="${record.id}">View</button>
        <button type="button" data-delete-record="${record.id}">Delete</button>
        <button type="button" data-download-record="${record.id}">Download</button>
      </div>
    </article>
  `).join("");
  speechRecordTimeline.querySelectorAll("[data-card-replay]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      replaySpeechRecord(card.dataset.cardReplay);
    });
    card.addEventListener("keydown", (event) => {
      if (!["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      replaySpeechRecord(card.dataset.cardReplay);
    });
  });
  speechRecordTimeline.querySelectorAll("[data-view-record]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      openRecordDrawer(button.dataset.viewRecord);
    });
  });
  speechRecordTimeline.querySelectorAll("[data-replay-record]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      replaySpeechRecord(button.dataset.replayRecord);
    });
  });
  speechRecordTimeline.querySelectorAll("[data-delete-record]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteSpeechRecord(button.dataset.deleteRecord);
    });
  });
  speechRecordTimeline.querySelectorAll("[data-download-record]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const record = speechRecords.find((item) => item.id === button.dataset.downloadRecord);
      if (!record) return;
      downloadText(`speech-record-${record.id}.json`, "application/json", JSON.stringify(record, null, 2));
    });
  });
}

function renderAdapters(data = {}) {
  if (!adapterList) return;
  if (data.active_adapter?.adapter_id) {
    selectedAsrModel = data.active_adapter.adapter_id;
    localStorage.setItem("afrivoice-selected-model", selectedAsrModel);
    if (asrModelSwitcher) asrModelSwitcher.value = selectedAsrModel;
    if (modelRuntime) modelRuntime.textContent = `${data.active_adapter.name} · ${data.active_adapter.dependency_status}`;
  }
  adapterList.innerHTML = (data.adapters || []).map((adapter) => `
    <article class="adapter-card ${adapter.status === "active" ? "active" : ""}">
      <strong>${adapter.name}</strong>
      <span>${adapter.runtime} · ${adapter.status}</span>
      <small>${adapter.best_for}</small>
      <small>${adapter.runtime_note || ""}</small>
    </article>
  `).join("");
}

function renderDatasetSyncStatus(data = {}) {
  if (!datasetSyncStatus) return;
  const languages = data.languages || [];
  datasetSyncStatus.innerHTML = `
    <div class="dataset-sync-summary">
      ${metric("Sync status", data.status || "pending", "Kaggle / Hugging Face")}
      ${metric("Last sync", data.last_sync_at ? new Date(data.last_sync_at).toLocaleString() : "Not synced", "local dataset")}
      ${metric("Downloaded files", data.kaggle?.downloaded_files ?? 0, data.kaggle?.dataset_id || "Kaggle")}
      ${metric("Missing transcripts", data.quality?.missing_transcripts ?? 0, "audit check")}
      ${metric("Corrupt audio", data.quality?.corrupt_audio ?? 0, "quality check")}
    </div>
    <div class="table-wrap">
      ${table(["Language", "Status", "Files", "Missing transcripts", "Corrupt audio", "Coverage"], languages.map((item) => [
        `${item.code} · ${item.name}`,
        item.status,
        item.downloaded_files,
        item.missing_transcripts,
        item.corrupt_audio,
        item.coverage,
      ]))}
    </div>
  `;
}

function renderTrainingJobs(data = {}) {
  if (!trainingJobs) return;
  const jobs = data.jobs || [];
  trainingJobs.innerHTML = `
    <div class="training-metrics">
      ${metric("Best WER", data.metrics?.best_wer ?? "n/a", "training dashboard")}
      ${metric("Workers", data.metrics?.active_workers ?? 0, "active")}
      ${metric("Queue", data.metrics?.queued_jobs ?? 0, "jobs waiting")}
      ${metric("GPU memory", `${data.metrics?.gpu_memory_gb ?? 0} GB`, "local")}
    </div>
    <div class="table-wrap">
      ${table(["Job", "Model", "Status", "Epoch", "Loss", "WER", "GPU", "Artifacts"], jobs.map((job) => [
        job.id,
        job.model,
        job.status,
        job.epoch,
        job.loss,
        job.wer,
        job.gpu,
        (job.artifacts || []).join(" · ") || "pending",
      ]))}
    </div>
  `;
}

function renderRoles(data = {}) {
  if (!roleMatrix) return;
  roleMatrix.innerHTML = (data.roles || []).map((role) => `
    <div class="role-card">
      <strong>${role.role}</strong>
      <span>${role.permissions.join(" · ")}</span>
    </div>
  `).join("");
}

async function loadIntegrations() {
  if (!adapterList && !trainingJobs && !roleMatrix) return;
  const [adaptersResponse, trainingResponse, rolesResponse, syncStatusResponse] = await Promise.all([
    fetch("/api/v1/integrations/model-adapters"),
    fetch("/api/v1/integrations/training/jobs"),
    fetch("/api/v1/integrations/roles"),
    fetch("/api/v1/integrations/datasets/sync-status"),
  ]);
  renderAdapters(await adaptersResponse.json());
  renderTrainingJobs(await trainingResponse.json());
  renderRoles(await rolesResponse.json());
  renderDatasetSyncStatus(await syncStatusResponse.json());
}

const searchDirectory = [
  ...languageDirectory.map((language) => ({
    type: "Language",
    title: language.name,
    keywords: [language.name, language.code, language.status, ...language.aliases],
    panel: language.panel,
    code: language.code,
    meta: `${language.code.toUpperCase()} · ${language.status}`,
    description: language.note,
  })),
  {
    type: "Workspace",
    title: "Record speech",
    keywords: ["record", "recorder", "microphone", "speech", "audio", "transcribe"],
    panel: "transcribe",
    meta: "Live ASR",
    description: "Open the recorder with timer, waveform, upload, and export controls.",
  },
  {
    type: "Workspace",
    title: "Transcript history",
    keywords: ["history", "previous", "download", "edit", "view", "transcripts"],
    panel: "history",
    meta: "Saved results",
    description: "Review previous transcriptions, confidence, timestamps, and actions.",
  },
  {
    type: "Quality",
    title: "Model quality dashboard",
    keywords: ["wer", "latency", "confidence", "model", "quality", "edge", "memory"],
    panel: "models",
    meta: "WER · latency · edge",
    description: "Compare baseline, fine-tuned, and quantized ASR models.",
  },
  {
    type: "Dataset",
    title: "Dataset audit",
    keywords: ["dataset", "audit", "hours", "speakers", "corrupt", "missing", "anv", "kaggle"],
    panel: "audit",
    meta: "Data readiness",
    description: "Inspect hours, speakers, missing transcripts, and corrupt files.",
  },
  {
    type: "Dataset",
    title: "ANV test data",
    keywords: ["anv", "test", "kagglehub", "digitalumuganda", "download", "manifest"],
    panel: "explorer",
    meta: "Local inspector",
    description: "Inspect the provided Kaggle download file and prepare the dataset manifest.",
  },
  {
    type: "Tool",
    title: "WER calculator",
    keywords: ["wer", "cer", "calculator", "score", "reference", "prediction"],
    panel: "tools",
    meta: "Evaluation tool",
    description: "Paste reference and predicted text to calculate WER/CER.",
  },
  {
    type: "Create",
    title: "Notebook",
    keywords: ["notebook", "code", "api", "python", "curl"],
    panel: "codeapi",
    meta: "Code workflow",
    description: "Open API examples and notebook-ready client snippets.",
  },
  {
    type: "Create",
    title: "Competition",
    keywords: ["competition", "challenge", "metric", "submission"],
    panel: "competition",
    meta: "Challenge workspace",
    description: "Review objective, metric, leaderboard, and submission flow.",
  },
  {
    type: "Create",
    title: "Hackathon",
    keywords: ["hackathon", "build plan", "timeline", "workflow"],
    panel: "hackathon",
    meta: "Build plan",
    description: "Follow the practical data, model, review, and submit plan.",
  },
  {
    type: "Community",
    title: "Discussions",
    keywords: ["discussion", "comments", "review notes", "community"],
    panel: "discussions",
    meta: "Review notes",
    description: "Track language issues, model notes, and dataset questions.",
  },
  {
    type: "Guide",
    title: "Documentation",
    keywords: ["documentation", "docs", "support", "help", "guide"],
    panel: "documentation",
    meta: "Project docs",
    description: "Open API docs, local workflow, and model integration notes.",
  },
  {
    type: "Resources",
    title: "Community Guidelines",
    keywords: ["community", "guidelines", "privacy", "terms", "consent", "responsible"],
    panel: "guidelines",
    meta: "Responsible data",
    description: "Review responsible speech collection, review, and contribution rules.",
  },
];

function saveCreatedWorkspaceItems() {
  localStorage.setItem("afrivoice-created-workspace-items", JSON.stringify(createdWorkspaceItems));
}

function getCreatedItemsForPanel(panelId) {
  return createdWorkspaceItems.filter((item) => item.target === panelId);
}

function renderCreatedWorkspaceItems() {
  Object.values(createTypeConfig).forEach((config) => {
    const panel = document.querySelector(`#${config.target}`);
    if (!panel) return;
    let section = panel.querySelector(".created-workspace-section");
    if (!section) {
      section = document.createElement("section");
      section.className = "created-workspace-section";
      const anchor = panel.querySelector(".destination-hero, .panel-heading, h1")?.parentElement || panel.firstElementChild;
      if (anchor && anchor.nextSibling) {
        panel.insertBefore(section, anchor.nextSibling);
      } else {
        panel.prepend(section);
      }
    }
    const items = getCreatedItemsForPanel(config.target);
    section.hidden = items.length === 0;
    if (!items.length) {
      section.innerHTML = "";
      return;
    }
    section.innerHTML = `
      <div class="created-workspace-header">
        <div>
          <span class="eyebrow">Created workspace items</span>
          <h2>${config.label} workspace</h2>
        </div>
        <button class="secondary-action" type="button" data-create-type="${Object.keys(createTypeConfig).find((key) => createTypeConfig[key] === config)}">Create another</button>
      </div>
      <div class="created-workspace-grid">
        ${items.map((item) => `
          <article class="created-workspace-card" data-created-id="${item.id}">
            <div class="created-card-top">
              <svg class="icon"><use href="${config.icon}"></use></svg>
              <span>${item.typeLabel}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <dl>
              <div><dt>Language</dt><dd>${languageNames[item.language] || item.language || "All languages"}</dd></div>
              <div><dt>Status</dt><dd>${item.status}</dd></div>
              <div><dt>Created</dt><dd>${new Date(item.createdAt).toLocaleDateString()}</dd></div>
            </dl>
            <div class="created-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            <div class="created-card-actions">
              <button class="row-action" type="button" data-open-created="${item.id}">Open</button>
              <button class="row-action danger" type="button" data-delete-created="${item.id}">Delete</button>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  });

  document.querySelectorAll("[data-create-type]").forEach((button) => {
    if (button.dataset.createBound === "true") return;
    button.dataset.createBound = "true";
    button.addEventListener("click", () => openCreateDialog(button.dataset.createType));
  });
  document.querySelectorAll("[data-open-created]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = createdWorkspaceItems.find((entry) => entry.id === button.dataset.openCreated);
      if (!item) return;
      showPanel(item.target);
      syncNavigation(item.target);
      showToast(`Opened ${item.title}.`);
    });
  });
  document.querySelectorAll("[data-delete-created]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = createdWorkspaceItems.find((entry) => entry.id === button.dataset.deleteCreated);
      createdWorkspaceItems = createdWorkspaceItems.filter((entry) => entry.id !== button.dataset.deleteCreated);
      saveCreatedWorkspaceItems();
      renderCreatedWorkspaceItems();
      showToast(`Deleted ${item?.title || "created item"}.`);
    });
  });
}

function closeCreateDialog() {
  if (!createOverlay) return;
  createOverlay.hidden = true;
  document.body.classList.remove("modal-open");
}

function openCreateDialog(type = "notebook") {
  const config = createTypeConfig[type] || createTypeConfig.notebook;
  activeCreateType = type;
  if (createMenu) createMenu.hidden = true;
  createMenuButton?.setAttribute("aria-expanded", "false");
  if (!createOverlay || !createItemForm) return;
  createDialogEyebrow.textContent = config.eyebrow;
  createDialogTitle.textContent = config.title;
  createDialogSubtitle.textContent = config.subtitle;
  createTemplateHint.textContent = config.hint;
  createSubmitButton.textContent = `Create ${config.label}`;
  createItemForm.title.value = config.name;
  createItemForm.description.value = "";
  createItemForm.language.value = "all";
  createItemForm.status.value = config.status;
  createItemForm.tags.value = [config.label.toLowerCase().replace(/\s+/g, "-"), "asr", "kaggle"].join(", ");
  createOverlay.hidden = false;
  document.body.classList.add("modal-open");
  createItemForm.title.focus();
}

function submitCreateItem(event) {
  event.preventDefault();
  const config = createTypeConfig[activeCreateType] || createTypeConfig.notebook;
  const form = new FormData(createItemForm);
  const item = {
    id: `created-${Date.now()}`,
    type: activeCreateType,
    typeLabel: config.label,
    target: config.target,
    title: String(form.get("title") || "").trim(),
    description: String(form.get("description") || "").trim(),
    language: String(form.get("language") || "all"),
    status: String(form.get("status") || "Draft"),
    tags: String(form.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 6),
    createdAt: new Date().toISOString(),
  };
  if (!item.title || !item.description) {
    showToast("Add a name and description before creating.", "error");
    return;
  }
  createdWorkspaceItems.unshift(item);
  saveCreatedWorkspaceItems();
  renderCreatedWorkspaceItems();
  closeCreateDialog();
  showPanel(config.target);
  syncNavigation(config.target);
  if (window.location.hash !== `#${config.target}`) {
    history.pushState({ panel: config.target }, "", `#${config.target}`);
  }
  showToast(`${config.label} created and opened.`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setHomeView(id) {
  const isHome = id === "overview";
  document.body.classList.toggle("home-clean-view", isHome);
  if (kaggleFooter) {
    kaggleFooter.hidden = !isHome;
    kaggleFooter.setAttribute("aria-hidden", String(!isHome));
  }
}

function showPanel(id) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.panel === id));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === id));
  setHomeView(id);
}

function syncNavigation(id) {
  setHomeView(id);
  if (id === "overview") {
    if (navToggle) navToggle.checked = true;
    if (createMenu) createMenu.hidden = true;
    createMenuButton?.setAttribute("aria-expanded", "false");
    railMore?.classList.remove("more-open", "group-active");
    moreToggleButton?.setAttribute("aria-expanded", "false");
  } else if (navToggle) {
    navToggle.checked = false;
  }
  document.querySelectorAll(".rail-button").forEach((item) => {
    item.classList.toggle("active", item.dataset.jump === id);
  });
  railMore?.classList.toggle("group-active", moreSectionIds.has(id));
  if (railMore && id !== "support") {
    railMore.classList.toggle("more-open", moreSectionIds.has(id));
    moreToggleButton?.setAttribute("aria-expanded", String(moreSectionIds.has(id)));
  }
  if (railMore && !moreSectionIds.has(id)) {
    railMore.classList.remove("more-open");
    moreToggleButton?.setAttribute("aria-expanded", "false");
  }
  moreToggleButton?.classList.toggle("active", moreSectionIds.has(id));
  document.querySelectorAll(".rail-subnav button").forEach((item) => {
    item.classList.toggle("active", item.dataset.jump === id);
  });
}

function normalizeSearch(value) {
  return String(value || "").trim().toLowerCase();
}

function openSearchTarget(panel, languageCode = "") {
  showPanel(panel);
  syncNavigation(panel);
  searchResults.hidden = true;
  if (languageCode) {
    highlightLanguageCards(languageCode);
    if (uploadForm.language) uploadForm.language.value = languageCode;
    if (feedbackForm.language) feedbackForm.language.value = languageCode;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function highlightLanguageCards(languageCode = "") {
  document.querySelectorAll("[data-language-card]").forEach((card) => {
    const isMatch = languageCode && card.dataset.languageCard === languageCode;
    card.classList.toggle("search-match", Boolean(isMatch));
    card.hidden = false;
  });
}

function filterLanguageCards(query) {
  const normalized = normalizeSearch(query);
  const matchedCodes = new Set(
    languageDirectory
      .filter((language) => [language.name, language.code, language.status, ...language.aliases]
        .some((item) => normalizeSearch(item).includes(normalized)))
      .map((language) => language.code),
  );

  document.querySelectorAll("[data-language-card]").forEach((card) => {
    const shouldShow = !normalized || matchedCodes.has(card.dataset.languageCard);
    card.hidden = !shouldShow;
    card.classList.toggle("search-match", Boolean(normalized && shouldShow));
  });
}

function getSearchMatches(query) {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  return searchDirectory
    .filter((item) => item.keywords.some((keyword) => normalizeSearch(keyword).includes(normalized)))
    .slice(0, 7);
}

function renderSearchResults(query) {
  const matches = getSearchMatches(query);
  filterLanguageCards(query);
  if (!matches.length) {
    searchResults.hidden = false;
    searchResults.innerHTML = `
      <div class="search-empty">
        <strong>No results found</strong>
        <span>Try Swahili, Maasai, WER, recorder, history, or dataset audit.</span>
      </div>
    `;
    return;
  }

  searchResults.hidden = false;
  searchResults.innerHTML = matches.map((item) => `
    <button class="search-result" type="button" data-panel="${item.panel}" data-language="${item.code || ""}">
      <span>${item.type}</span>
      <strong>${item.title}</strong>
      <small>${item.meta}</small>
      <p>${item.description}</p>
    </button>
  `).join("");

  searchResults.querySelectorAll(".search-result").forEach((button) => {
    button.addEventListener("click", () => {
      openSearchTarget(button.dataset.panel, button.dataset.language);
    });
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showPanel(tab.dataset.panel);
    syncNavigation(tab.dataset.panel);
    if (window.location.hash !== `#${tab.dataset.panel}`) {
      history.pushState({ panel: tab.dataset.panel }, "", `#${tab.dataset.panel}`);
    }
  });
});

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    showPanel(button.dataset.jump);
    syncNavigation(button.dataset.jump);
    if (window.location.hash !== `#${button.dataset.jump}`) {
      history.pushState({ panel: button.dataset.jump }, "", `#${button.dataset.jump}`);
    }
    if (globalSearch && !globalSearch.value) filterLanguageCards("");
    if (createMenu) {
      createMenu.hidden = true;
      createMenuButton.setAttribute("aria-expanded", "false");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

async function inspectLocalDataset() {
  if (!localDatasetBox) return;
  localDatasetBox.textContent = "Inspecting provided ANV test data path...";
  const response = await fetch("/api/v1/integrations/datasets/local/anv-test-data");
  const data = await response.json();
  localDatasetBox.textContent = JSON.stringify(data, null, 2);
  if (data.exists) {
    showToast("Provided ANV dataset path inspected.");
  } else {
    showToast("Provided ANV dataset path was not found. Use Kaggle sync when credentials are ready.", "error");
  }
}

async function importLocalDataset() {
  if (!localDatasetBox) return;
  localDatasetBox.textContent = "Preparing local ANV dataset manifest...";
  const response = await fetch("/api/v1/integrations/datasets/local/anv-test-data/import", { method: "POST" });
  const data = await response.json();
  localDatasetBox.textContent = JSON.stringify(data, null, 2);
  showToast(data.status === "ready_for_manifest" ? "Dataset manifest preparation is ready." : "Local dataset file needs the full Kaggle sync.", data.status === "ready_for_manifest" ? "success" : "error");
}

function openFooterTarget(panel, action = "") {
  showPanel(panel);
  syncNavigation(panel);
  if (window.location.hash !== `#${panel}`) {
    history.pushState({ panel }, "", `#${panel}`);
  }
  if (globalSearch && !globalSearch.value) filterLanguageCards("");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (action === "inspect-local-dataset") {
    inspectLocalDataset();
  }
}

function openProfileFromPath() {
  const match = window.location.pathname.match(/^\/@([a-z0-9-]+)\/?$/i);
  if (!match) return false;
  const slug = slugifyUsername(match[1]);
  renderProfileView(getStoredUser(), slug);
  showPanel("profile");
  syncNavigation("profile");
  window.scrollTo({ top: 0, behavior: "smooth" });
  return true;
}

function openPanelFromHash() {
  if (openProfileFromPath()) return true;
  const panel = window.location.hash.replace("#", "");
  if (!panel || !document.getElementById(panel)) return false;
  showPanel(panel);
  syncNavigation(panel);
  if (panel === "explorer") inspectLocalDataset();
  window.scrollTo({ top: 0, behavior: "smooth" });
  return true;
}

document.querySelectorAll("[data-footer-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    openFooterTarget(button.dataset.footerJump, button.dataset.footerAction || "");
  });
});

document.querySelectorAll("[data-external-url]").forEach((button) => {
  button.addEventListener("click", () => {
    window.open(button.dataset.externalUrl, "_blank", "noopener,noreferrer");
  });
});

window.addEventListener("popstate", openPanelFromHash);

moreToggleButton.addEventListener("click", () => {
  const wasOpen = railMore.classList.contains("more-open");
  showPanel("support");
  syncNavigation("support");
  railMore.classList.toggle("more-open", !wasOpen);
  moreToggleButton.setAttribute("aria-expanded", String(!wasOpen));
  window.scrollTo({ top: 0, behavior: "smooth" });
});

signInButton?.addEventListener("click", () => openAuth("signin"));

registerButton?.addEventListener("click", () => openAuth("register"));

authCloseButton?.addEventListener("click", closeAuth);

authOverlay?.addEventListener("click", (event) => {
  if (event.target === authOverlay) closeAuth();
});

authSwitchButton?.addEventListener("click", () => {
  setAuthMode(authMode === "signin" ? "register" : "signin");
});

signInForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(signInForm);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!email || password.length < 6) {
    showAuthMessage("Enter a valid email and a password with at least 6 characters.", "error");
    return;
  }
  const response = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    showAuthMessage((await response.json()).detail || "Sign in failed.", "error");
    showToast("Sign in failed. Check your email and password.", "error");
    return;
  }
  saveUserSession(await response.json());
  await Promise.all([loadWorkspaces(), loadHistory(), loadJobs(), loadEvaluations(), loadDeploymentReadiness(), loadSettings(), loadAuditLogs()]);
});

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!firstName || !lastName || !email || password.length < 6) {
    showAuthMessage("Complete all fields and use a password with at least 6 characters.", "error");
    return;
  }
  const response = await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: `${firstName} ${lastName}`, email, password, role: "Reviewer" }),
  });
  if (!response.ok) {
    showAuthMessage((await response.json()).detail || "Registration failed.", "error");
    showToast("Registration failed. Try another email.", "error");
    return;
  }
  saveUserSession(await response.json());
  await Promise.all([loadWorkspaces(), loadHistory(), loadJobs(), loadEvaluations(), loadDeploymentReadiness(), loadSettings(), loadAuditLogs()]);
});

userMenuButton?.addEventListener("click", () => {
  const isOpen = userDropdown && !userDropdown.hidden;
  if (userDropdown) userDropdown.hidden = isOpen;
  userMenuButton.setAttribute("aria-expanded", String(!isOpen));
});

signOutButton?.addEventListener("click", () => {
  localStorage.removeItem("afrivoice-user");
  localStorage.removeItem("afrivoice-token");
  localStorage.removeItem("afrivoice-workspace-id");
  activeWorkspaceId = "";
  if (userDropdown) userDropdown.hidden = true;
  userMenuButton?.setAttribute("aria-expanded", "false");
  updateAuthToolbar();
  renderWorkspaceOptions([]);
  showToast("Signed out of this workspace.");
});

workspaceSwitcher?.addEventListener("change", async () => {
  activeWorkspaceId = workspaceSwitcher.value;
  localStorage.setItem("afrivoice-workspace-id", activeWorkspaceId);
  showToast(`Workspace switched to ${workspaceSwitcher.options[workspaceSwitcher.selectedIndex]?.text || "Local"}`);
  await Promise.all([loadHistory(), loadJobs(), loadEvaluations()]);
});

newWorkspaceButton?.addEventListener("click", async () => {
  if (!getAuthToken()) {
    openAuth("signin");
    showToast("Sign in to create a workspace.", "error");
    return;
  }
  const name = prompt("Workspace name", "New ASR workspace");
  if (!name) return;
  const response = await apiFetch("/api/v1/workspaces", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, purpose: "ASR operations" }),
  });
  if (!response.ok) {
    showToast("Could not create workspace.", "error");
    return;
  }
  const workspace = await response.json();
  activeWorkspaceId = workspace.id;
  localStorage.setItem("afrivoice-workspace-id", activeWorkspaceId);
  await loadWorkspaces();
  showToast(`Workspace "${workspace.name}" created.`);
});

createJobButton?.addEventListener("click", async () => {
  if (!getAuthToken()) {
    openAuth("signin");
    showToast("Sign in to start background jobs.", "error");
    return;
  }
  const response = await apiFetch("/api/v1/ops/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_type: "batch-transcription", workspace_id: activeWorkspaceId || null }),
  });
  if (!response.ok) {
    showToast("Could not start job.", "error");
    return;
  }
  showToast("Background job started.");
  await loadJobs();
});

evaluationForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!getAuthToken()) {
    openAuth("signin");
    showToast("Sign in to run model evaluations.", "error");
    return;
  }
  const formData = new FormData(evaluationForm);
  const response = await apiFetch("/api/v1/ops/evaluations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model_name: String(formData.get("model_name") || "Fine-tuned AfriVoice"),
      dataset_name: String(formData.get("dataset_name") || "AfriVoice validation"),
      workspace_id: activeWorkspaceId || null,
    }),
  });
  if (!response.ok) {
    showToast("Evaluation run failed.", "error");
    return;
  }
  showToast("Evaluation run completed.");
  await loadEvaluations();
});

recordDrawerClose?.addEventListener("click", closeRecordDrawer);

settingsForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!getAuthToken()) {
    openAuth("signin");
    showToast("Sign in as Admin to save settings.", "error");
    return;
  }
  const formData = new FormData(settingsForm);
  const response = await apiFetch("/api/v1/settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  });
  if (!response.ok) {
    showToast("Settings were not saved. Admin permission may be required.", "error");
    return;
  }
  showToast("Settings saved.");
  await Promise.all([loadSettings(), loadAuditLogs()]);
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(contactForm).entries());
  const note = {
    status: "saved_to_discussions",
    topic: payload.topic,
    message: payload.message,
    next_step: "Open Discussions to route this note to a reviewer or admin.",
    saved_at: new Date().toISOString(),
  };
  if (contactBox) contactBox.textContent = JSON.stringify(note, null, 2);
  showToast("Support note saved to the workspace.");
});

document.querySelectorAll("[data-contact-topic]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (contactForm?.topic) contactForm.topic.value = link.dataset.contactTopic || contactForm.topic.value;
    if (contactForm?.message) {
      contactForm.message.value = `Help request: ${link.dataset.contactTopic || link.textContent.trim()}`;
      contactForm.message.focus();
    }
    contactForm?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

recordSearch?.addEventListener("input", () => {
  recordSearchQuery = recordSearch.value;
  renderSpeechRecords(speechRecords);
  loadHistory();
});

asrModelSwitcher?.addEventListener("change", async () => {
  selectedAsrModel = adapterAliases[asrModelSwitcher.value] || asrModelSwitcher.value;
  asrModelSwitcher.value = selectedAsrModel;
  localStorage.setItem("afrivoice-selected-model", selectedAsrModel);
  saveWorkspaceState();
  updateWorkspaceSummary();
  const label = asrModelSwitcher.options[asrModelSwitcher.selectedIndex]?.textContent || selectedAsrModel;
  if (modelRuntime) modelRuntime.textContent = `${label} · selecting backend adapter`;
  const response = await fetch("/api/v1/integrations/model-adapters/select", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adapter_id: selectedAsrModel, model_name: selectedAsrModel === "mock" ? "mock-afrivoice-asr-v0" : "" }),
  });
  const result = await response.json();
  if (modelRuntime) modelRuntime.textContent = `${result.adapter?.name || label} · ${result.adapter?.dependency_status || "selected"}`;
  if (adapterBox) {
    adapterBox.textContent = JSON.stringify(result, null, 2);
  }
  await loadIntegrations();
  showToast(`${label} selected for the next transcription.`);
});

languageOverride?.addEventListener("change", () => {
  if (lastTranscript) renderTranscriptIntelligence(lastTranscript);
});

localStatusButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = localStatusMenu && !localStatusMenu.hidden;
  if (localStatusMenu) localStatusMenu.hidden = isOpen;
  localStatusButton.setAttribute("aria-expanded", String(!isOpen));
});

copyLocalUrlButton?.addEventListener("click", async () => {
  await navigator.clipboard.writeText(PUBLIC_PROJECT_URL);
  const original = copyLocalUrlButton.textContent;
  copyLocalUrlButton.textContent = "Copied public URL";
  showToast("Public project URL copied. Share this link with your boss or teammates.");
  setTimeout(() => {
    copyLocalUrlButton.textContent = original;
  }, 1600);
});

async function copyUserProfileUrl(button) {
  const profileUrl = getUserProfileUrl();
  await navigator.clipboard.writeText(profileUrl);
  const original = button.textContent;
  button.textContent = "Copied profile URL";
  showToast("Public profile URL copied. This link includes your signed-in username.");
  setTimeout(() => {
    button.textContent = original;
  }, 1600);
}

copyProfileUrlButton?.addEventListener("click", async () => {
  await copyUserProfileUrl(copyProfileUrlButton);
});

copyProfileDisplayUrlButton?.addEventListener("click", async () => {
  await copyUserProfileUrl(copyProfileDisplayUrlButton);
});

copyPublicUrlButton?.addEventListener("click", async () => {
  await navigator.clipboard.writeText(PUBLIC_PROJECT_URL);
  const original = copyPublicUrlButton.textContent;
  copyPublicUrlButton.textContent = "Copied public URL";
  showToast("Public project URL copied. You can send it to your supervisor or team.");
  setTimeout(() => {
    copyPublicUrlButton.textContent = original;
  }, 1600);
});

contributeButton?.addEventListener("click", () => {
  const source = latestCorrection || (lastTranscript ? {
    id: lastTranscript.id,
    text: getTranscriptText(lastTranscript),
    language: lastTranscript.language || "swa",
    notes: "Uncorrected transcript prepared for review before contribution.",
  } : null);
  if (!source) {
    contributionBox.textContent = "Run transcription or save a correction before preparing a dataset contribution.";
    return;
  }
  const packagePayload = {
    contribution_id: `contrib-${Date.now()}`,
    source_transcription_id: source.id,
    language: source.language,
    status: "queued_for_dataset_review",
    reviewer_note: source.notes || "Ready for human dataset validation.",
    transcript: source.text,
    target_manifest: "feedback/corrections/train-clean.jsonl",
  };
  contributionBox.textContent = JSON.stringify(packagePayload, null, 2);
});

modelCardButton?.addEventListener("click", () => {
  const models = latestModelData?.models || [];
  const best = models.find((model) => model.name === latestModelData?.winner) || models[0] || {};
  const edge = models.find((model) => model.name === latestModelData?.edge_recommendation) || models.at(-1) || {};
  const audit = latestAuditData || {};
  modelCardBox.textContent = `# Kaggle East Africa ASR Model Card

## Model
- Active model: ${best.name || "afrivoice-finetuned-small"}
- Edge package: ${edge.name || "afrivoice-edge-int8"}
- Runtime mode: ${latestOfflineData?.current_mode || "server_mock"}

## Languages
Swahili, Kikuyu, Luo / Dholuo, Somali, Maasai, and Kalenjin.

## Evaluation
- Best WER: ${best.wer ?? "0.247"}
- Edge latency: ${edge.latency_ms ?? 430} ms
- Edge memory: ${edge.memory_mb ?? 640} MB
- Model size: ${edge.model_size_mb ?? 244} MB

## Dataset Audit
- Total hours: ${audit.total_hours ?? "pending"}
- Speakers: ${audit.speakers ?? "pending"}
- Missing transcripts: ${audit.missing_transcripts ?? "pending"}
- Corrupt files: ${audit.corrupt_files ?? "pending"}

## Intended Use
Offline and API-based transcription for East African language speech in education, health, agriculture, public services, and community documentation.

## Limitations
Low-resource languages need careful human review. Noisy audio, code switching, rare names, and regional accents may reduce accuracy.

## Responsible Use
Keep dataset attribution, request consent for contributed speech, and route low-confidence transcripts through human review before training.`;
});

adapterForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  adapterBox.textContent = "Selecting ASR adapter...";
  const payload = Object.fromEntries(new FormData(adapterForm).entries());
  const response = await fetch("/api/v1/integrations/model-adapters/select", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  adapterBox.textContent = JSON.stringify(result, null, 2);
  if (result.adapter?.adapter_id || payload.adapter_id) {
    selectedAsrModel = result.adapter?.adapter_id || payload.adapter_id;
    localStorage.setItem("afrivoice-selected-model", selectedAsrModel);
    if (asrModelSwitcher) asrModelSwitcher.value = selectedAsrModel;
    if (modelRuntime) modelRuntime.textContent = `${result.adapter?.name || selectedAsrModel} · ${result.adapter?.dependency_status || "selected"}`;
  }
  await loadIntegrations();
  showToast("ASR adapter selected.");
});

kaggleSyncButton?.addEventListener("click", async () => {
  kaggleSyncBox.textContent = "Queueing Kaggle dataset sync...";
  const response = await fetch("/api/v1/integrations/datasets/kaggle/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "kaggle",
      dataset_id: "digitalumuganda/anv-test-data-nt",
    }),
  });
  kaggleSyncBox.textContent = JSON.stringify(await response.json(), null, 2);
  await loadIntegrations();
});

inspectLocalDatasetButton?.addEventListener("click", inspectLocalDataset);

importLocalDatasetButton?.addEventListener("click", importLocalDataset);

hfSyncButton?.addEventListener("click", async () => {
  hfSyncBox.textContent = "Queueing Hugging Face dataset sync...";
  const response = await fetch("/api/v1/integrations/datasets/huggingface/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "huggingface",
      dataset_id: "DigitalUmuganda/Afrivoice",
      split: "train",
    }),
  });
  hfSyncBox.textContent = JSON.stringify(await response.json(), null, 2);
  await loadIntegrations();
});

createTrainingJobButton?.addEventListener("click", async () => {
  const response = await fetch("/api/v1/integrations/training/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model_name: "afrivoice-unified-eac-small",
      base_model: "openai/whisper-small",
      epochs: 3,
      learning_rate: 0.00001,
    }),
  });
  const result = await response.json();
  trainingJobs.insertAdjacentHTML("afterbegin", `<pre class="result compact">${JSON.stringify(result, null, 2)}</pre>`);
});

streamingDemoButton?.addEventListener("click", async () => {
  const response = await fetch("/api/v1/integrations/streaming/demo");
  const result = await response.json();
  streamingDemoBox.innerHTML = result.partials.map((partial) => `
    <div><strong>${partial.time_ms}ms</strong><span>${partial.text}</span><small>${Math.round(partial.confidence * 100)}%</small></div>
  `).join("");
});

translationLayerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  translationLayerBox.textContent = "Translating text...";
  const formData = new FormData(translationLayerForm);
  const response = await fetch("/api/v1/integrations/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: formData.get("text"),
      source_language: "swa",
      target_language: formData.get("target_language"),
    }),
  });
  translationLayerBox.textContent = JSON.stringify(await response.json(), null, 2);
});

ttsButton?.addEventListener("click", async () => {
  ttsBox.textContent = "Creating text-to-speech preview...";
  const text = getTranscriptText(lastTranscript || {}) || "habari yako leo";
  const response = await fetch("/api/v1/integrations/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, source_language: "swa", target_language: "swa" }),
  });
  ttsBox.textContent = JSON.stringify(await response.json(), null, 2);
});

deploymentExportButton?.addEventListener("click", async () => {
  deploymentExportBox.textContent = "Queueing deployment export...";
  const response = await fetch("/api/v1/integrations/deployment/export", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model_name: "afrivoice-finetuned-small",
      target_format: "ctranslate2",
      quantization: "int8",
    }),
  });
  deploymentExportBox.textContent = JSON.stringify(await response.json(), null, 2);
});

evaluationReportButton?.addEventListener("click", async () => {
  evaluationReportBox.textContent = "Creating evaluation report...";
  const response = await fetch("/api/v1/integrations/reports/evaluation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      report_format: "pdf",
      include_language_breakdown: true,
      include_latency: true,
    }),
  });
  evaluationReportBox.textContent = JSON.stringify(await response.json(), null, 2);
});

createMenuButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  createMenu.hidden = !createMenu.hidden;
  createMenuButton.setAttribute("aria-expanded", String(!createMenu.hidden));
});

createMenu?.querySelectorAll("[data-create-type]").forEach((button) => {
  button.dataset.createBound = "true";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openCreateDialog(button.dataset.createType);
  });
});

createCloseButton?.addEventListener("click", closeCreateDialog);
createCancelButton?.addEventListener("click", closeCreateDialog);
createOverlay?.addEventListener("click", (event) => {
  if (event.target === createOverlay) closeCreateDialog();
});
createItemForm?.addEventListener("submit", submitCreateItem);

globalSearch.addEventListener("input", () => {
  renderSearchResults(globalSearch.value);
  if (!globalSearch.value) {
    searchResults.hidden = true;
    filterLanguageCards("");
  }
});

globalSearch.addEventListener("focus", () => {
  if (globalSearch.value) renderSearchResults(globalSearch.value);
});

globalSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const firstMatch = getSearchMatches(globalSearch.value)[0];
    if (firstMatch) openSearchTarget(firstMatch.panel, firstMatch.code || "");
  }
  if (event.key === "Escape") {
    searchResults.hidden = true;
    if (createMenu) {
      createMenu.hidden = true;
      createMenuButton.setAttribute("aria-expanded", "false");
    }
    globalSearch.blur();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && createOverlay && !createOverlay.hidden) {
    closeCreateDialog();
  }
  if (event.key === "Escape" && authOverlay && !authOverlay.hidden) {
    closeAuth();
  }
  if (event.key === "Escape" && recordDrawer && !recordDrawer.hidden) {
    closeRecordDrawer();
  }
  if (event.key === "Escape" && createMenu && !createMenu.hidden) {
    createMenu.hidden = true;
    createMenuButton.setAttribute("aria-expanded", "false");
    createMenuButton.focus();
  }
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName || "");
  if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key.toLowerCase() === "r" && lastTranscript?.id) {
    replaySpeechRecord(lastTranscript.id);
  }
  if (event.key.toLowerCase() === "e" && lastTranscript?.id) {
    feedbackForm.transcription_id.value = lastTranscript.id;
    feedbackForm.corrected_text.value = getTranscriptText(lastTranscript);
    feedbackForm.language.value = lastTranscript.language || "swa";
    showPanel("editor");
    syncNavigation("editor");
  }
  if (event.key === "?") {
    showToast("Shortcuts: R replay, E edit, Esc close drawer or dialogs.");
  }
});

document.addEventListener("click", (event) => {
  const currentReplayButton = event.target.closest("[data-replay-current]");
  if (currentReplayButton) {
    event.preventDefault();
    event.stopPropagation();
    replaySpeechRecord(currentReplayButton.dataset.replayCurrent);
    return;
  }

  const currentDeleteButton = event.target.closest("[data-delete-current]");
  if (currentDeleteButton) {
    event.preventDefault();
    event.stopPropagation();
    deleteSpeechRecord(currentDeleteButton.dataset.deleteCurrent);
    return;
  }

  if (!event.target.closest(".search")) searchResults.hidden = true;
  if (createMenu && !event.target.closest(".create-menu-wrap")) {
    createMenu.hidden = true;
    createMenuButton.setAttribute("aria-expanded", "false");
  }
  if (userDropdown && !userDropdown.hidden && !event.target.closest(".user-menu")) {
    userDropdown.hidden = true;
    userMenuButton?.setAttribute("aria-expanded", "false");
  }
  if (localStatusMenu && !localStatusMenu.hidden && !event.target.closest(".local-status-wrap")) {
    localStatusMenu.hidden = true;
    localStatusButton?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".copy-command").forEach((button) => {
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    const original = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = original;
    }, 1400);
  });
});

async function loadLanguages() {
  const response = await fetch("/api/v1/languages");
  const languages = await response.json();
  languageList.innerHTML = languages.map((language) => (
    `<span><strong>${language.code}</strong> ${language.name}</span>`
  )).join("");
}

async function loadModel() {
  const response = await fetch("/api/v1/models/active");
  const model = await response.json();
  activeModel.textContent = model.name;
  modelRuntime.textContent = `${model.runtime} · ${model.architecture}`;
  if (asrModelSwitcher) asrModelSwitcher.value = selectedAsrModel;
}

function metric(label, value, note) {
  return `
    <article class="metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
    </article>
  `;
}

function table(headers, rows) {
  return `
    <table>
      <thead>
        <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  `;
}

function downloadText(filename, mimeType, content) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function auditExport(transcriptionId, exportFormat) {
  if (!getAuthToken()) return;
  await apiFetch("/api/v1/ops/exports/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transcription_id: transcriptionId || null,
      export_format: exportFormat,
      workspace_id: activeWorkspaceId || null,
    }),
  }).catch(() => {});
  loadAuditLogs();
}

function renderUploadProgress(activeStage = "Ready") {
  if (!uploadProgress) return;
  uploadProgress.innerHTML = uploadStages.map((stage) => {
    const stageIndex = uploadStages.indexOf(stage);
    const activeIndex = uploadStages.indexOf(activeStage);
    const state = stageIndex < activeIndex ? "done" : stage === activeStage ? "active" : "";
    return `<span class="${state}">${stage}</span>`;
  }).join("");
}

function setUploadStage(stage) {
  renderUploadProgress(stage);
}

async function waitStage(stage, delay = 240) {
  setUploadStage(stage);
  await new Promise((resolve) => setTimeout(resolve, delay));
}

function startStreamingPreview() {
  if (!streamingTranscript) return;
  clearInterval(streamingTicker);
  streamingIndex = 0;
  streamingTranscript.classList.remove("empty");
  streamingTranscript.innerHTML = "";
  streamingTicker = setInterval(() => {
    const word = streamingWords[streamingIndex % streamingWords.length];
    const confidence = 78 + ((streamingIndex * 7) % 18);
    streamingTranscript.insertAdjacentHTML("beforeend", `<span>${word}<small>${confidence}%</small></span>`);
    streamingIndex += 1;
  }, 620);
}

function stopStreamingPreview(finalText = "") {
  clearInterval(streamingTicker);
  streamingTicker = null;
  if (!streamingTranscript) return;
  if (finalText) {
    streamingTranscript.classList.remove("empty");
    streamingTranscript.innerHTML = finalText.split(/\s+/).map((word, index) => (
      `<span>${word}<small>${Math.max(72, 92 - index * 3)}%</small></span>`
    )).join("");
  }
}

async function updateMicrophonePermissionState() {
  if (!micPermissionStatus || !micPermissionHelp) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    micPermissionStatus.textContent = "Unsupported";
    micPermissionHelp.textContent = "This browser cannot record audio. Upload a file instead.";
    recordButton.disabled = true;
    return;
  }
  try {
    if (navigator.permissions?.query) {
      const permission = await navigator.permissions.query({ name: "microphone" });
      const labels = {
        granted: ["Allowed", "Microphone access is available for live recording."],
        prompt: ["Ready to ask", "Click Start recording and approve microphone access."],
        denied: ["Denied", "Enable microphone access in the browser settings or upload audio."],
      };
      const [label, help] = labels[permission.state] || ["Available", "Microphone status is available."];
      micPermissionStatus.textContent = label;
      micPermissionHelp.textContent = help;
      recordButton.disabled = permission.state === "denied";
      permission.onchange = updateMicrophonePermissionState;
      return;
    }
    micPermissionStatus.textContent = "Available";
    micPermissionHelp.textContent = "Click Start recording to request microphone access.";
  } catch {
    micPermissionStatus.textContent = "Available";
    micPermissionHelp.textContent = "Click Start recording to request microphone access.";
  }
}

function setRecorderState(state) {
  recordStatus.textContent = state;
  waveform.classList.toggle("recording", state === "Recording");
  waveform.classList.toggle("processing", state === "Processing");
  waveform.classList.toggle("completed", state === "Completed");
}

function startTimer() {
  recordStartedAt = Date.now();
  recordTicker = setInterval(() => {
    const seconds = Math.floor((Date.now() - recordStartedAt) / 1000);
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const remainder = String(seconds % 60).padStart(2, "0");
    recordTimer.textContent = `${minutes}:${remainder}`;
  }, 250);
}

function stopTimer(reset = false) {
  clearInterval(recordTicker);
  if (reset) recordTimer.textContent = "00:00";
}

function activityItem(label, item) {
  const trendMark = item.trend === "up" ? "↗" : item.trend === "flat" ? "—" : "•";
  return `
    <article class="activity-item">
      <span>${label}</span>
      <strong>${item.value}</strong>
      <small><b class="spark">${trendMark}</b> ${item.note}</small>
    </article>
  `;
}

function renderLineChart(container, points) {
  if (!container || !points.length) return;
  const max = Math.max(...points.map((point) => point.value), 1);
  const width = 100;
  const height = 100;
  const coords = points.map((point, index) => ({
    x: (index / Math.max(1, points.length - 1)) * width,
    y: height - (point.value / max) * 78 - 8,
    date: point.date,
  }));

  const segments = coords.slice(0, -1).map((point, index) => {
    const next = coords[index + 1];
    const dx = next.x - point.x;
    const dy = next.y - point.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return `<span class="plot-segment" style="left:${point.x}%;top:${point.y}%;width:${length}%;transform:rotate(${angle}deg)"></span>`;
  }).join("");

  const dots = coords.map((point) => (
    `<span class="plot-point" style="left:${point.x}%;top:${point.y}%"></span>
     <span class="axis-label" style="left:${point.x}%">${point.date}</span>`
  )).join("");

  container.innerHTML = segments + dots;
}

function renderDotChart(container, points) {
  if (!container || !points.length) return;
  const max = Math.max(...points.map((point) => point.value), 1);
  container.innerHTML = points.map((point, index) => {
    const x = (index / Math.max(1, points.length - 1)) * 100;
    const y = 92 - (point.value / max) * 72;
    return `
      <span class="plot-dot" style="left:${x}%;top:${y}%"></span>
      <span class="axis-label" style="left:${x}%">${point.date}</span>
    `;
  }).join("");
}

async function loadAnalytics() {
  const response = await fetch("/api/v1/analytics/summary");
  const data = await response.json();
  analyticsGrid.innerHTML = [
    metric("Transcriptions", data.total_transcriptions, "Stored locally"),
    metric("Avg latency", data.average_processing_ms, "Milliseconds"),
    metric("Review rate", data.low_confidence_rate, "Low confidence share"),
    metric("Corrections", data.correction_rate, "Feedback ratio"),
  ].join("");
}

async function loadModelComparison() {
  const [comparisonResponse, offlineResponse] = await Promise.all([
    fetch("/api/v1/lab/model-comparison"),
    fetch("/api/v1/lab/offline-status"),
  ]);
  const comparison = await comparisonResponse.json();
  const offline = await offlineResponse.json();
  latestModelData = comparison;
  latestOfflineData = offline;
  offlineMode.textContent = `Mode: ${offline.current_mode}`;
  modelComparison.innerHTML = table(
    ["Model", "Runtime", "WER", "Latency", "Memory", "Size", "Mode"],
    comparison.models.map((model) => [
      model.name,
      model.runtime,
      model.wer,
      `${model.latency_ms} ms`,
      `${model.memory_mb} MB`,
      `${model.model_size_mb} MB`,
      model.mode,
    ]),
  );
  const best = comparison.models.find((model) => model.name === comparison.winner) || comparison.models[0];
  const edge = comparison.models.find((model) => model.name === comparison.edge_recommendation) || comparison.models.at(-1);
  modelQuality.innerHTML = [
    metric("Best WER", best.wer, best.name),
    metric("Latency", `${edge.latency_ms} ms`, "Edge-ready runtime"),
    metric("Memory", `${edge.memory_mb} MB`, edge.runtime),
    metric("Model size", `${edge.model_size_mb} MB`, "Quantized package"),
  ].join("");
  renderOfflineReadiness(comparison.models, offline);
  renderAdminAlerts(latestAuditData || {}, comparison.models);
}

async function loadLeaderboard() {
  const response = await fetch("/api/v1/lab/leaderboard");
  const data = await response.json();
  leaderboardTable.innerHTML = table(
    ["Rank", "Language", "Code", "WER", "Hours"],
    data.languages.map((language) => [
      language.rank,
      language.name,
      language.code,
      language.wer,
      language.hours,
    ]),
  );
}

async function loadAudit() {
  const response = await fetch("/api/v1/lab/dataset-audit");
  const audit = await response.json();
  latestAuditData = audit;
  auditMetrics.innerHTML = [
    metric("Total hours", audit.total_hours, "Across all available sources"),
    metric("Speakers", audit.speakers, "Speaker diversity target"),
    metric("Missing text", audit.missing_transcripts, "Needs cleanup"),
    metric("Corrupt files", audit.corrupt_files, "Excluded before training"),
  ].join("");
  auditBreakdown.innerHTML = table(
    ["Language", "Hours", "Speakers"],
    Object.entries(audit.language_breakdown).map(([code, item]) => [code, item.hours, item.speakers]),
  );
  renderAdminDataQualityCenter(audit);
  renderAdminAlerts(audit, latestModelData?.models || []);
}

async function loadActivityDetail() {
  const response = await fetch("/api/v1/lab/activity-detail");
  const data = await response.json();
  activityStrip.innerHTML = [
    activityItem("Views", data.summary.views),
    activityItem("Downloads", data.summary.downloads),
    activityItem("Engagement", data.summary.engagement),
    activityItem("Comments", data.summary.comments),
    activityItem("Top Contributors", data.summary.contributors),
  ].join("");
  renderLineChart(viewsChart, data.detail.views);
  renderDotChart(downloadsChart, data.detail.downloads);
}

async function loadBackendStatus() {
  if (!backendServices || !pipelineList || !capacityList) return;
  const response = await fetch("/api/v1/lab/backend-status");
  const data = await response.json();
  backendServices.innerHTML = data.services.map((service) => `
    <article class="service-card">
      <span class="service-state ${service.status}">${service.status}</span>
      <strong>${service.name}</strong>
      <small>${service.latency_ms === null ? "standby" : `${service.latency_ms} ms`}</small>
    </article>
  `).join("");
  pipelineList.innerHTML = data.pipeline.map((stage) => `
    <div><span>${stage.stage}</span><strong>${stage.state}</strong></div>
  `).join("");
  capacityList.innerHTML = Object.entries(data.capacity).map(([key, value]) => `
    <div><span>${key.replaceAll("_", " ")}</span><strong>${value}</strong></div>
  `).join("");
}

async function loadJobs() {
  if (!jobsBoard) return;
  if (!getAuthToken()) {
    jobsBoard.innerHTML = `<div class="empty-state compact-empty"><h3>Sign in to run jobs</h3><p>Background jobs will show queue status, progress, logs, retry, and cancel actions.</p></div>`;
    return;
  }
  const query = activeWorkspaceId ? `?workspace_id=${encodeURIComponent(activeWorkspaceId)}` : "";
  const response = await apiFetch(`/api/v1/ops/jobs${query}`);
  const data = await response.json();
  if (!data.count) {
    jobsBoard.innerHTML = `<div class="empty-state compact-empty"><h3>No jobs yet</h3><p>Start a sample job to see progress and logs.</p></div>`;
    return;
  }
  jobsBoard.innerHTML = data.items.map((job) => `
    <article class="ops-card">
      <span class="status-pill ${job.status}">${job.status}</span>
      <strong>${job.job_type}</strong>
      <progress value="${job.progress}" max="100"></progress>
      <small>${job.progress}% complete</small>
      <pre>${job.logs || "No logs yet."}</pre>
      <div class="record-card-actions">
        <button type="button" data-retry-job="${job.id}">Retry</button>
        <button type="button" data-cancel-job="${job.id}">Cancel</button>
      </div>
    </article>
  `).join("");
  jobsBoard.querySelectorAll("[data-retry-job]").forEach((button) => {
    button.addEventListener("click", async () => {
      await apiFetch(`/api/v1/ops/jobs/${button.dataset.retryJob}/retry`, { method: "POST" });
      showToast("Job retry started.");
      await loadJobs();
    });
  });
  jobsBoard.querySelectorAll("[data-cancel-job]").forEach((button) => {
    button.addEventListener("click", async () => {
      await apiFetch(`/api/v1/ops/jobs/${button.dataset.cancelJob}/cancel`, { method: "POST" });
      showToast("Job canceled.");
      await loadJobs();
    });
  });
}

async function loadEvaluations() {
  if (!evaluationBoard) return;
  if (!getAuthToken()) {
    evaluationBoard.innerHTML = `<div class="empty-state compact-empty"><h3>Sign in to run evaluations</h3><p>Compare WER and CER for Whisper, AfriVoice, and edge models.</p></div>`;
    return;
  }
  const query = activeWorkspaceId ? `?workspace_id=${encodeURIComponent(activeWorkspaceId)}` : "";
  const response = await apiFetch(`/api/v1/ops/evaluations${query}`);
  const data = await response.json();
  evaluationBoard.innerHTML = data.count
    ? data.items.map((run) => `
      <article class="ops-card">
        <span class="status-pill completed">${run.status}</span>
        <strong>${run.model_name}</strong>
        <span>${run.dataset_name}</span>
        <div class="mini-metrics"><b>WER ${Math.round(run.wer * 1000) / 10}%</b><b>CER ${Math.round(run.cer * 1000) / 10}%</b></div>
      </article>
    `).join("")
    : `<div class="empty-state compact-empty"><h3>No evaluation runs</h3><p>Run an evaluation to compare model quality.</p></div>`;
}

async function loadDeploymentReadiness() {
  if (!deploymentReadiness) return;
  if (!getAuthToken()) {
    deploymentReadiness.innerHTML = `<div class="empty-state compact-empty"><h3>Sign in for deployment checks</h3><p>The checklist covers API health, ownership, model artifacts, edge export, storage, and security.</p></div>`;
    return;
  }
  const response = await apiFetch("/api/v1/ops/deployment/readiness");
  const data = await response.json();
  const runtime = data.runtime || {};
  deploymentReadiness.innerHTML = `
    <article class="readiness-card ready">
      <span>runtime</span>
      <strong>Cloud environment</strong>
      <p>${runtime.environment || "development"} · API ${runtime.api_health || "unknown"} · storage ${runtime.storage_backend || "local"} · queue ${runtime.queue_backend || "local"}</p>
    </article>
    <article class="readiness-card ${runtime.auth_secret_configured ? "ready" : "needs-review"}">
      <span>security</span>
      <strong>Auth secret</strong>
      <p>${runtime.auth_secret_configured ? "AUTH_SECRET is configured." : "Set AUTH_SECRET in .env before production."}</p>
    </article>
    ${data.checks.map((check) => `
    <article class="readiness-card ${check.status}">
      <span>${check.status.replace("-", " ")}</span>
      <strong>${check.name}</strong>
      <p>${check.detail}</p>
    </article>
  `).join("")}
  `;
}

function renderSubmissionResult(result = {}) {
  if (!submissionBox) return;
  const rows = result.preview_rows || [];
  const hardware = result.hardware_validation_report || {};
  submissionBox.innerHTML = `
Submission ID: ${result.submission_id || "pending"}
Status: ${result.status || "unknown"}
Model: ${result.model || "not selected"}
Adapter: ${result.adapter || selectedAsrModel}
Dataset: ${result.dataset_name || "digitalumuganda/anv-test-data-nt"}
Artifact: ${result.submission_path || "not generated"}

Required CSV header:
id,language,prediction

Allowed language codes:
swa=Swahili, kik=Kikuyu, luo=Luo/Dholuo, som=Somali, mas=Maasai, kln=Kalenjin

Validation:
${JSON.stringify(result.validation || {}, null, 2)}

Edge and hardware validation:
${JSON.stringify(hardware, null, 2)}

Preview:
id,language,prediction
${rows.map((row) => `${row.id}, ${row.language}, ${row.prediction}`).join("\n") || "No preview rows returned."}
`;
}

function renderCompetitionValidation(result = {}) {
  if (!competitionValidationBox) return;
  const checks = result.checks || [];
  const status = result.status || "unknown";
  if (competitionValidationSummary) {
    competitionValidationSummary.innerHTML = `
      <strong class="validation-status ${status}">${status.toUpperCase()}</strong>
      <span>${result.passed || 0} passed · ${result.failed || 0} required checks missing</span>
    `;
  }
  if (competitionValidationGrid) {
    competitionValidationGrid.innerHTML = checks.map((check) => `
      <article class="readiness-card ${check.status === "pass" ? "ready" : "needs-review"}">
        <span>${check.status}</span>
        <strong>${check.label}</strong>
        <p>${check.detail}</p>
      </article>
    `).join("");
  }
  competitionValidationBox.textContent = JSON.stringify({
    status: result.status,
    generated_at: result.generated_at,
    submission_requirements: result.submission_requirements,
    submission: result.submission,
    report_paths: result.report_paths,
    competition_rules: result.competition_rules,
    dataset_summary: result.dataset_summary,
    next_actions: checks.filter((check) => check.status !== "pass").map((check) => ({ check: check.label, action: check.action })),
  }, null, 2);
}

async function loadCompetitionValidationStatus() {
  if (!competitionValidationBox) return;
  const response = await fetch("/api/v1/competition/validation/status");
  renderCompetitionValidation(await response.json());
}

async function loadSettings() {
  if (!settingsRuntime) return;
  if (!getAuthToken()) {
    settingsRuntime.innerHTML = `<div class="empty-state compact-empty"><h3>Sign in to manage settings</h3><p>Admins can configure model defaults, storage, queue, exports, and notifications.</p></div>`;
    return;
  }
  const response = await apiFetch("/api/v1/settings");
  if (!response.ok) {
    settingsRuntime.innerHTML = `<div class="empty-state compact-empty"><h3>Settings unavailable</h3><p>Your role may not have access to settings.</p></div>`;
    return;
  }
  const data = await response.json();
  if (settingsForm) {
    settingsForm.default_model.value = data.project.default_model || "mock";
    settingsForm.dataset_path.value = data.project.dataset_path || "";
    settingsForm.export_format.value = data.project.export_format || "json";
    settingsForm.notifications.value = data.project.notifications || "toast";
  }
  settingsRuntime.innerHTML = Object.entries(data.runtime).map(([key, value]) => `
    <article class="readiness-card ${value === true || value === "local" || value === "mock" ? "ready" : "needs-review"}">
      <span>${key.replaceAll("_", " ")}</span>
      <strong>${String(value)}</strong>
    </article>
  `).join("");
}

async function loadAuditLogs() {
  if (!auditLogTable) return;
  if (!getAuthToken()) {
    auditLogTable.innerHTML = `<div class="empty-state compact-empty"><h3>Sign in to view audit logs</h3><p>Audit logs show important actions across the workspace.</p></div>`;
    return;
  }
  const response = await apiFetch("/api/v1/audit-logs");
  if (!response.ok) {
    auditLogTable.innerHTML = `<div class="empty-state compact-empty"><h3>Audit logs unavailable</h3><p>Your role may not have access to audit logs.</p></div>`;
    return;
  }
  const data = await response.json();
  auditLogTable.innerHTML = data.count
    ? table(
      ["Time", "Action", "Entity", "Detail"],
      data.items.map((item) => [
        new Date(item.created_at).toLocaleString(),
        item.action,
        `${item.entity_type || "system"}<br><small>${item.entity_id || ""}</small>`,
        item.detail || "",
      ]),
    )
    : `<div class="empty-state compact-empty"><h3>No audit events yet</h3><p>Uploads, deletes, assignments, evaluations, and settings changes will appear here.</p></div>`;
}

async function loadHistory() {
  const response = await apiFetch("/api/v1/transcriptions");
  const data = await response.json();
  renderSpeechRecords(data.items || []);
  historyEmpty.hidden = data.count > 0;
  historyTable.hidden = data.count === 0;
  if (!data.count) {
    historyTable.innerHTML = "";
    return;
  }
  const visibleItems = (data.items || []).map(normalizeSpeechRecord).filter((record) => recordMatchesSearch(record));
  if (!visibleItems.length) {
    historyTable.innerHTML = `<div class="empty-state compact-empty"><h3>No matching table records</h3><p>Search by language, filename, transcript text, date, confidence, or needs review.</p></div>`;
    return;
  }
  historyTable.innerHTML = table(
    ["Date", "Time", "Source", "Language", "Duration", "Confidence", "Transcript", "Actions"],
    visibleItems.map((record) => [
      record.date,
      record.time,
      `${record.sourceType === "recording" ? "Recording" : "Upload"}<br><small>${record.filename || "audio"}</small>`,
      record.language || "auto",
      formatDuration(record.durationSec),
      record.confidence === null ? "n/a" : Number(record.confidence).toFixed(2),
      record.transcript,
      `<button class="row-action" data-replay="${record.id}">Replay</button>
       <button class="row-action" data-view="${record.id}">View</button>
       <button class="row-action" data-delete="${record.id}">Delete</button>
       <button class="row-action" data-edit="${record.id}">Edit</button>
       <button class="row-action" data-download="${record.id}">Download</button>`,
    ]),
  );

  historyTable.querySelectorAll("[data-replay]").forEach((button) => {
    button.addEventListener("click", () => replaySpeechRecord(button.dataset.replay));
  });
  historyTable.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => openRecordDrawer(button.dataset.view));
  });
  historyTable.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await (await apiFetch(`/api/v1/transcriptions/${button.dataset.edit}`)).json();
      feedbackForm.transcription_id.value = result.id;
      feedbackForm.corrected_text.value = result.normalized_text || result.text || "";
      feedbackForm.language.value = result.language || "swa";
      showPanel("editor");
      syncNavigation("editor");
    });
  });
  historyTable.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteSpeechRecord(button.dataset.delete));
  });
  historyTable.querySelectorAll("[data-download]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await (await apiFetch(`/api/v1/transcriptions/${button.dataset.download}`)).json();
      downloadText(`transcript-${result.id}.txt`, "text/plain", result.normalized_text || result.text || "");
    });
  });
}

async function refreshAll() {
  await Promise.all([
    loadLanguages(),
    loadModel(),
    loadAnalytics(),
    loadModelComparison(),
    loadLeaderboard(),
    loadAudit(),
    loadActivityDetail(),
    loadBackendStatus(),
    loadHistory(),
    loadIntegrations(),
    loadJobs(),
    loadEvaluations(),
    loadDeploymentReadiness(),
    loadCompetitionValidationStatus(),
    loadWorkspaces(),
    loadSettings(),
    loadAuditLogs(),
  ]);
}

async function submitRecordedAudio(blob) {
  const recordingFilename = `recording-${Date.now()}.webm`;
  const formData = new FormData();
  formData.set("file", blob, recordingFilename);
  formData.set("detect_language", "true");
  formData.set("return_segments", "true");
  formData.set("asr_adapter", selectedAsrModel);
  formData.set("diarize", uploadForm.diarize.checked ? "true" : "false");
  if (uploadForm.language.value) formData.set("language", uploadForm.language.value);
  if (uploadForm.domain.value) formData.set("domain", uploadForm.domain.value);
  if (uploadForm.translate_to.value) formData.set("translate_to", uploadForm.translate_to.value);
  appendWorkspace(formData);

  await waitStage("Uploading", 180);
  resultBox.textContent = `Sending recorded audio to the ASR backend with ${selectedAsrModel} model mode...`;
  await waitStage("Checking audio quality", 220);
  await waitStage("Transcribing", 220);
  showPanel("transcribe");
  const response = await apiFetch("/api/v1/transcriptions", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  await waitStage("Saving record", 180);
  lastTranscript = result;
  resultBox.textContent = JSON.stringify(result, null, 2);
  exportActions.hidden = false;
  renderTranscriptIntelligence(result);
  stopStreamingPreview(getTranscriptText(result));
  setCurrentSpeechRecord(result, { source_type: "recording", audio_filename: result.audio_filename || recordingFilename });
  if (recordedAudio && result.audio_url) {
    recordedAudio.src = result.audio_url;
    recordedAudio.load();
  }
  addReviewItem(result);
  setUploadStage("Ready");
  showToast("Recording transcribed and saved.");
  await Promise.all([loadAnalytics(), loadBackendStatus(), loadHistory()]);
}

recordButton.addEventListener("click", async () => {
  try {
    await updateMicrophonePermissionState();
    recordedChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (micPermissionStatus) micPermissionStatus.textContent = "Allowed";
    if (micPermissionHelp) micPermissionHelp.textContent = "Recording live audio into the workspace.";
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    };
    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(recordedChunks, { type: "audio/webm" });
      recordedAudio.src = URL.createObjectURL(blob);
      setRecorderState("Processing");
      await submitRecordedAudio(blob);
      setRecorderState("Completed");
    };
    mediaRecorder.start();
    recordButton.disabled = true;
    stopRecordButton.disabled = false;
    setRecorderState("Recording");
    startStreamingPreview();
    startTimer();
  } catch (error) {
    stopTimer(true);
    stopStreamingPreview();
    setRecorderState("Ready");
    if (micPermissionStatus) micPermissionStatus.textContent = error.name === "NotAllowedError" ? "Denied" : "Unavailable";
    if (micPermissionHelp) micPermissionHelp.textContent = "Use browser settings to allow the microphone, or upload an audio file.";
    recordStatus.textContent = `Microphone unavailable: ${error.message}`;
  }
});

stopRecordButton.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopRecordButton.disabled = true;
    stopTimer();
    setRecorderState("Processing");
    stopStreamingPreview();
  }
});

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await waitStage("Uploading", 180);
  resultBox.textContent = `Uploading audio and running ${selectedAsrModel} ASR pipeline...`;
  const uploadedFile = uploadForm.file?.files?.[0];

  const formData = new FormData(uploadForm);
  formData.set("detect_language", "true");
  formData.set("asr_adapter", selectedAsrModel);
  if (!formData.has("return_segments")) formData.set("return_segments", "false");
  if (!formData.has("diarize")) formData.set("diarize", "false");
  appendWorkspace(formData);

  await waitStage("Checking audio quality", 220);
  await waitStage("Transcribing", 220);
  const response = await apiFetch("/api/v1/transcriptions", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  await waitStage("Saving record", 180);
  lastTranscript = result;
  resultBox.textContent = JSON.stringify(result, null, 2);
  exportActions.hidden = false;
  renderTranscriptIntelligence(result);
  if (recordedAudio) {
    recordedAudio.src = result.audio_url || (uploadedFile ? URL.createObjectURL(uploadedFile) : "");
    recordedAudio.load();
  }
  setCurrentSpeechRecord(result, {
    source_type: result.source_type || "upload",
    audio_filename: result.audio_filename || uploadedFile?.name,
    audio_size_bytes: result.audio_size_bytes || uploadedFile?.size,
  });
  addReviewItem(result);
  setUploadStage("Ready");
  showToast("Audio uploaded, transcribed, and saved.");
  await Promise.all([loadAnalytics(), loadHistory()]);
});

feedbackForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  feedbackBox.textContent = "Saving transcript correction...";
  const formData = new FormData(feedbackForm);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch("/api/v1/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  feedbackBox.textContent = JSON.stringify(result, null, 2);
  latestCorrection = {
    id: payload.transcription_id,
    text: payload.corrected_text,
    language: payload.language,
    notes: payload.notes || "",
  };
  addVersionItem({
    id: payload.transcription_id,
    before: getTranscriptText(lastTranscript || {}),
    after: payload.corrected_text,
    language: payload.language,
    note: payload.notes || "Correction saved to feedback loop.",
  });
  saveWorkspaceState();
  await Promise.all([loadAnalytics(), loadHistory()]);
});

batchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  batchBox.textContent = "Running batch transcription...";
  const formData = new FormData(batchForm);
  const response = await fetch("/api/v1/transcriptions/batch", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  batchBox.textContent = JSON.stringify(result, null, 2);
  await Promise.all([loadAnalytics(), loadHistory()]);
});

exportActions.querySelectorAll("[data-export]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lastTranscript) return;
    const format = button.dataset.export;
    const id = lastTranscript.id || "latest";
    const text = lastTranscript.normalized_text || lastTranscript.text || "";
    if (format === "txt") {
      downloadText(`transcript-${id}.txt`, "text/plain", text);
      auditExport(id, "txt");
    }
    if (format === "json") {
      downloadText(`transcript-${id}.json`, "application/json", JSON.stringify(lastTranscript, null, 2));
      auditExport(id, "json");
    }
    if (format === "csv") {
      downloadText(`transcript-${id}.csv`, "text/csv", `id,language,confidence,text\n"${id}","${lastTranscript.language || ""}","${lastTranscript.confidence || ""}","${text.replaceAll('"', '""')}"\n`);
      auditExport(id, "csv");
    }
  });
});

exportRecordsButton?.addEventListener("click", () => {
  downloadText(
    `speech-records-${new Date().toISOString().slice(0, 10)}.json`,
    "application/json",
    JSON.stringify({ exported_at: new Date().toISOString(), records: speechRecords }, null, 2),
  );
  auditExport(null, "records-json");
});

qualityForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  qualityBox.textContent = "Checking audio quality...";
  const response = await fetch("/api/v1/lab/audio-quality", {
    method: "POST",
    body: new FormData(qualityForm),
  });
  const result = await response.json();
  qualityBox.textContent = JSON.stringify(result, null, 2);
});

function parseAccuracySamples(rawText) {
  return String(rawText || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length >= 3) {
        return { language: parts[0] || "unknown", reference: parts[1] || "", prediction: parts.slice(2).join(" | ") || "", filename: `sample-${index + 1}` };
      }
      return { language: "unknown", reference: line, prediction: "", filename: `sample-${index + 1}` };
    });
}

function renderAccuracySummary(result) {
  if (!accuracySummary) return;
  const overall = result.overall || {};
  accuracySummary.innerHTML = [
    metric("Overall accuracy", `${Math.round(Number(overall.accuracy || 0) * 1000) / 10}%`, `${result.sample_count || 0} scored samples`),
    metric("Overall WER", overall.wer ?? "n/a", `${overall.word_errors || 0} word errors`),
    metric("Overall CER", overall.cer ?? "n/a", "Character error rate"),
  ].join("");
}

werForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  werBox.textContent = "Calculating WER/CER...";
  const formData = new FormData(werForm);
  const response = await fetch("/api/v1/lab/wer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  });
  const result = await response.json();
  werBox.textContent = JSON.stringify(result, null, 2);
});


accuracyForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!accuracyBox) return;
  accuracyBox.textContent = "Scoring accuracy across samples...";
  const formData = new FormData(accuracyForm);
  const samples = parseAccuracySamples(formData.get("samples"));
  const response = await fetch("/api/v1/lab/accuracy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ samples }),
  });
  const result = await response.json();
  renderAccuracySummary(result);
  accuracyBox.textContent = JSON.stringify(result, null, 2);
  showToast("Accuracy report generated.");
});

vocabularyForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  vocabularyBox.textContent = "Saving phrase boosting vocabulary...";
  const formData = new FormData(vocabularyForm);
  const phrases = String(formData.get("phrases") || "")
    .split("\n")
    .map((phrase) => phrase.trim())
    .filter(Boolean);
  const response = await fetch("/api/v1/lab/vocabulary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domain: formData.get("domain"), phrases }),
  });
  const result = await response.json();
  vocabularyBox.textContent = JSON.stringify(result, null, 2);
});

async function createSubmission(payload = {}) {
  submissionBox.textContent = "Creating Kaggle submission job...";
  const response = await fetch("/api/v1/submissions/kaggle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model_name: payload.model_name || asrModelSwitcher?.options[asrModelSwitcher.selectedIndex]?.textContent || selectedAsrModel,
      dataset_name: payload.dataset_name || "digitalumuganda/anv-test-data-nt",
      sample_count: 6,
    }),
  });
  const result = await response.json();
  renderSubmissionResult(result);
  showToast("Kaggle submission.csv generated.");
  return result;
}

submissionButton.addEventListener("click", async () => {
  await createSubmission();
  await loadCompetitionValidationStatus();
});

competitionValidationButton?.addEventListener("click", async () => {
  competitionValidationBox.textContent = "Running competition validation...";
  const response = await fetch("/api/v1/competition/validation/run", { method: "POST" });
  const result = await response.json();
  renderCompetitionValidation(result);
  showToast(result.status === "ready" ? "Competition package is ready." : "Validation complete. Missing final artifacts are listed.");
});

submissionBuilderForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(submissionBuilderForm).entries());
  await createSubmission(payload);
  await loadCompetitionValidationStatus();
});

refreshButton?.addEventListener("click", refreshAll);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const enabled = document.body.classList.contains("dark-theme");
  if (themeToggleText) themeToggleText.textContent = enabled ? "Light mode" : "Dark mode";
  localStorage.setItem("afrivoice-theme", enabled ? "dark" : "light");
});

if (localStorage.getItem("afrivoice-theme") === "dark") {
  document.body.classList.add("dark-theme");
  if (themeToggleText) themeToggleText.textContent = "Light mode";
}

if (downloadButton) {
  downloadButton.addEventListener("click", async () => {
    const result = await createSubmission();
    showPanel("metadata");
    renderSubmissionResult({ message: "Download action generated a Kaggle submission artifact.", ...result });
  });
}

updateAuthToolbar();
renderUploadProgress("Ready");
updateMicrophonePermissionState();
if (asrModelSwitcher) asrModelSwitcher.value = selectedAsrModel;
updateWorkspaceSummary();
renderReviewQueue();
renderVersionHistory();
if (!openPanelFromHash()) {
  syncNavigation(document.querySelector(".panel.active")?.id || "overview");
}

refreshAll().catch((error) => {
  resultBox.textContent = `Could not reach local API: ${error.message}`;
});
