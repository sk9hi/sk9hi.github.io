/* Real-Time Age Timer
   – simple, full-screen version                                   */

$(document).ready(function () {
  /* ---------- helpers ---------- */
  function saveDOB(d) {
    localStorage.setItem("dob", d.getTime());
  }
  function loadDOB() {
    const ts = localStorage.getItem("dob");
    return ts ? new Date(parseInt(ts)) : null;
  }
  function splitAge(dob) {
    const years = (Date.now() - dob) / 31_556_900_000; // avg ms in a year
    const [major, minor] = years.toFixed(9).split(".");
    return { major, minor };
  }

  /* ---------- rendering ---------- */
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

  /* ---------- events ---------- */
  $("#submit").on("click", function (e) {
    e.preventDefault();
    const val = $("#dob-input").val();
    if (!val) return;
    saveDOB(new Date(val));
    startTimer();
  });

  /* ---------- init ---------- */
  loadDOB() ? startTimer() : showPrompt();
});
