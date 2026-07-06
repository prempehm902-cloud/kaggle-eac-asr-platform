(() => {
  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }
    callback();
  };

  ready(() => {
    if (document.body.dataset.submissionControlsWired) return;
    document.body.dataset.submissionControlsWired = "standalone";

    const submitButton = document.querySelector("#submitPredictionButton");
    const moreButton = document.querySelector("#submitPredictionMoreButton");
    const moreMenu = document.querySelector("#submissionMoreMenu");
    const overlay = document.querySelector("#submissionOverlay");
    const closeButton = document.querySelector("#submissionCloseButton");
    const cancelButton = document.querySelector("#submissionCancelButton");
    const tabs = Array.from(document.querySelectorAll("[data-submission-tab]"));
    const panels = Array.from(document.querySelectorAll("[data-submission-panel]"));
    const form = document.querySelector("#submissionUploadForm");
    const fileInput = document.querySelector("#submissionFileInput");
    const browseButton = document.querySelector("#submissionBrowseButton");
    const dropzone = document.querySelector("#submissionDropzone");
    const selectedFileBox = document.querySelector("#submissionSelectedFile");
    const validateButton = document.querySelector("#submissionValidateButton");
    const resultBox = document.querySelector("#submissionUploadResult");
    const description = document.querySelector("#submissionDescription");
    const descriptionCount = document.querySelector("#submissionDescriptionCount");
    const copyCliButton = document.querySelector("#copySubmissionCliButton");
    let selectedFile = null;

    const toast = (message, type = "success") => {
      const region = document.querySelector("#toastRegion");
      if (!region) return;
      const item = document.createElement("div");
      item.className = `toast ${type}`;
      item.textContent = message;
      region.appendChild(item);
      window.setTimeout(() => item.remove(), 3200);
    };

    const closeMenu = () => {
      if (!moreMenu || !moreButton) return;
      moreMenu.hidden = true;
      moreButton.setAttribute("aria-expanded", "false");
    };

    const openDialog = () => {
      if (!overlay) return;
      closeMenu();
      overlay.hidden = false;
      document.body.classList.add("modal-open");
      switchTab("file");
      window.setTimeout(() => fileInput?.focus(), 40);
    };

    const closeDialog = () => {
      if (!overlay) return;
      overlay.hidden = true;
      document.body.classList.remove("modal-open");
    };

    function switchTab(tabName = "file") {
      tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.submissionTab === tabName);
      });
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.submissionPanel === tabName);
      });
    }

    const setFile = (file) => {
      selectedFile = file || null;
      if (validateButton) validateButton.disabled = !selectedFile;
      if (!selectedFileBox) return;
      if (!selectedFile) {
        selectedFileBox.hidden = true;
        selectedFileBox.textContent = "";
        return;
      }
      const sizeMb = selectedFile.size / (1024 * 1024);
      selectedFileBox.hidden = false;
      selectedFileBox.innerHTML = `
        <strong>${selectedFile.name}</strong>
        <span>${sizeMb >= 1 ? `${sizeMb.toFixed(1)} MB` : `${Math.max(1, Math.round(selectedFile.size / 1024))} KB`}</span>
      `;
      if (resultBox) {
        resultBox.textContent = "File selected. Click Validate file to check rows, columns, empty values, IDs, and language codes.";
      }
    };

    const syncFileInput = (file) => {
      if (!fileInput || !file || typeof DataTransfer === "undefined") return;
      const transfer = new DataTransfer();
      transfer.items.add(file);
      fileInput.files = transfer.files;
    };

    const renderValidationResult = (result = {}) => {
      if (!resultBox) return;
      const status = result.ready_for_kaggle ? "READY FOR KAGGLE" : "NEEDS FIXES";
      const errors = (result.errors || []).map((item) => `- ${item}`).join("\n") || "- No blocking errors";
      const warnings = (result.warnings || []).map((item) => `- ${item}`).join("\n") || "- No warnings";
      resultBox.textContent = `
${status}

File: ${result.file_name || result.filename || selectedFile?.name || "unknown"}
Stored copy: ${result.stored_path || "not stored"}
Rows checked: ${result.row_count ?? "unknown"} / ${result.expected_rows ?? "41733"}
Required columns: ${(result.required_columns || ["id", "language", "transcription"]).join(", ")}

Errors:
${errors}

Warnings:
${warnings}
      `.trim();
    };

    const validateUpload = async (event) => {
      event.preventDefault();
      if (!selectedFile) {
        toast("Choose a submission file first.", "error");
        return;
      }
      if (resultBox) resultBox.textContent = "Validating submission file...";
      if (validateButton) validateButton.disabled = true;
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("description", description?.value || "");
      try {
        const response = await fetch("/api/v1/submissions/validate-upload", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        renderValidationResult(result);
        toast(
          result.ready_for_kaggle ? "Submission file is ready for Kaggle." : "Submission file needs fixes before upload.",
          result.ready_for_kaggle ? "success" : "error"
        );
      } catch (error) {
        if (resultBox) resultBox.textContent = `Validation failed: ${error.message}`;
        toast("Submission validation failed.", "error");
      } finally {
        if (validateButton) validateButton.disabled = !selectedFile;
      }
    };

    const showPanelFallback = (panelId) => {
      const targetPanel = document.querySelector(`#${panelId}`);
      document.querySelectorAll(".panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === panelId);
      });
      document.querySelectorAll("[data-panel]").forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.panel === panelId);
      });
      if (targetPanel) targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState({ panel: panelId }, "", `#${panelId}`);
    };

    submitButton?.addEventListener("click", openDialog);

    moreButton?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!moreMenu) return;
      const willOpen = moreMenu.hidden;
      moreMenu.hidden = !willOpen;
      moreButton.setAttribute("aria-expanded", String(willOpen));
    });

    moreMenu?.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-submission-action]");
      if (!actionButton) return;
      const action = actionButton.dataset.submissionAction;
      closeMenu();
      if (action === "collection") {
        const saved = JSON.parse(localStorage.getItem("kaggleAsrCollections") || "[]");
        saved.unshift({
          title: "AfriVoices East Africa: ASR Hackathon",
          type: "competition",
          saved_at: new Date().toISOString(),
        });
        localStorage.setItem("kaggleAsrCollections", JSON.stringify(saved.slice(0, 20)));
        toast("Competition added to your local collection.");
      }
      if (action === "bookmark") {
        const current = localStorage.getItem("kaggleAsrBookmarkedCompetition") === "true";
        localStorage.setItem("kaggleAsrBookmarkedCompetition", String(!current));
        toast(current ? "Bookmark removed." : "Competition bookmarked.");
      }
      if (action === "report") {
        showPanelFallback("contact");
        toast("Opened support so you can report the issue.");
      }
    });

    document.addEventListener("click", (event) => {
      if (!moreMenu || moreMenu.hidden) return;
      if (event.target.closest(".submission-actions-menu-wrap")) return;
      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeMenu();
      if (overlay && !overlay.hidden) closeDialog();
    });

    closeButton?.addEventListener("click", closeDialog);
    cancelButton?.addEventListener("click", closeDialog);
    overlay?.addEventListener("click", (event) => {
      if (event.target === overlay) closeDialog();
    });

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.submissionTab));
    });

    browseButton?.addEventListener("click", () => fileInput?.click());
    dropzone?.addEventListener("click", () => fileInput?.click());
    dropzone?.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        fileInput?.click();
      }
    });
    dropzone?.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropzone.classList.add("dragging");
    });
    dropzone?.addEventListener("dragleave", () => dropzone.classList.remove("dragging"));
    dropzone?.addEventListener("drop", (event) => {
      event.preventDefault();
      dropzone.classList.remove("dragging");
      const file = event.dataTransfer?.files?.[0];
      if (!file) return;
      syncFileInput(file);
      setFile(file);
    });
    fileInput?.addEventListener("change", () => setFile(fileInput.files?.[0]));
    description?.addEventListener("input", () => {
      if (descriptionCount) descriptionCount.textContent = String(description.value.length);
    });
    copyCliButton?.addEventListener("click", async () => {
      const command = 'kaggle competitions submit -c afri-voices-east-africa-asr-hackathon -f final_competition_submission_transcription.csv -m "Automated ASR submission"';
      await navigator.clipboard?.writeText(command);
      toast("Kaggle CLI command copied.");
    });
    form?.addEventListener("submit", validateUpload);
  });
})();
