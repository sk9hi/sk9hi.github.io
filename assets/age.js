$(function () {
  /* ---- AGE TIMER LOGIC ---- */
  function saveDOB(d) {
    localStorage.setItem("dob", d.getTime());
  }
  function loadDOB() {
    const ts = localStorage.getItem("dob");
    return ts ? new Date(+ts) : null;
  }
  function splitAge(dob) {
    const yrs = (Date.now() - dob) / 31_556_900_000;
    return yrs.toFixed(9).split(".");
  }
  function startTimer() {
    const dob = loadDOB();
    $("#choose").hide();
    $("#timer").show();
    setInterval(() => {
      const [major, minor] = splitAge(dob);
      $("#age").html(`${major}<sup>.${minor}</sup>`);
    }, 100);
  }
  function showPrompt() {
    $("#choose").show();
  }

  $("#submit").click((e) => {
    e.preventDefault();
    const v = $("#dob-input").val();
    if (!v) return;
    saveDOB(new Date(v));
    startTimer();
  });

  loadDOB() ? startTimer() : showPrompt();

  /* ---- THEME SWITCHER ---- */
  const KEY = "theme";
  const $html = $("html");
  const $btn = $("#theme-btn");
  const $icon = $("#theme-icon");

  function setTheme(t) {
    $html.removeClass("light dark").addClass(t);
    localStorage.setItem(KEY, t);
    if (t === "dark") {
      $icon.attr("class", "fas fa-sun");
    } else {
      $icon.attr("class", "fas fa-moon");
    }
  }

  // initialize
  const stored = localStorage.getItem(KEY) || "dark";
  setTheme(stored);

  // toggle on click
  $btn.click(() => {
    setTheme($html.hasClass("light") ? "dark" : "light");
  });
});
