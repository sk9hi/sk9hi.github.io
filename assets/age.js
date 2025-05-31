/* Real-Time Age Timer with theme switcher */

$(document).ready(function () {
  /* ----------  Age logic  ---------- */
  function saveDOB(d) {
    localStorage.setItem("dob", d.getTime());
  }
  function loadDOB() {
    const ts = localStorage.getItem("dob");
    return ts ? new Date(parseInt(ts)) : null;
  }
  function splitAge(dob) {
    const years = (Date.now() - dob) / 31_556_900_000; // average ms / year
    const [major, minor] = years.toFixed(9).split(".");
    return { major, minor };
  }

  function startTimer() {
    const dob = loadDOB();
    $("#choose").hide();
    $("#timer").show();

    setInterval(() => {
      const age = splitAge(dob);
      $("#age").html(`${age.major}<sup>.${age.minor}</sup>`);
    }, 100);
  }
  function showPrompt() {
    $("#choose").show();
  }

  $("#submit").on("click", (e) => {
    e.preventDefault();
    const val = $("#dob-input").val();
    if (!val) return;
    saveDOB(new Date(val));
    startTimer();
  });

  loadDOB() ? startTimer() : showPrompt();

  /* ----------  Theme switcher  ---------- */
  const THEME_KEY = "theme";

  function applyTheme(theme) {
    if (theme === "light") {
      $("body").addClass("light");
      $("#theme-btn").text("🌙"); // moon icon = go dark next
    } else {
      $("body").removeClass("light");
      $("#theme-btn").text("☀️"); // sun icon = go light next
    }
  }
  function currentTheme() {
    return localStorage.getItem(THEME_KEY) || "dark";
  }
  applyTheme(currentTheme());

  $("#theme-btn").on("click", () => {
    const next = $("body").hasClass("light") ? "dark" : "light";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
});
