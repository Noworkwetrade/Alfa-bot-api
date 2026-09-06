document.addEventListener('DOMContentLoaded', () => {
  console.log("[Compass UI] Loaded successfully under CSP.");

  // Reset Button Listener
  const resetBtn = document.getElementById('btnReset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      console.log("[Compass UI] Reset requested.");
      chrome.runtime.sendMessage({ action: "RESET_COMPASS" });
    });
  }

  // Commit Button Listener
  const commitBtn = document.getElementById('btnCommit');
  if (commitBtn) {
    commitBtn.addEventListener('click', () => {
      console.log("[Compass UI] Phase committed.");
      chrome.runtime.sendMessage({ action: "COMMIT_PHASE" });
    });
  }

  // Handle W / L / - toggle state
  const actionBtns = document.querySelectorAll('.btn-action');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const group = e.target.parentElement;
      group.querySelectorAll('.btn-action').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
    });
  });
});
