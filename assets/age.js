/* Real-Time Age Timer
   — original logic by maccman, wrapped in a nicer UI                */

$(document).ready(function () {
  /* ----------  helpers ---------- */
  function save(dob) {
    // cache DOB in localStorage
    localStorage.setItem("dob", dob.getTime());
  }

  function load() {
    // load DOB (or -1 if none)
    const ts = localStorage.getItem("dob");
    return ts ? new Date(parseInt(ts)) : -1;
  }

  function getAge(dob) {
    // returns major / minor age parts
    const years = (Date.now() - dob) / 31_556_900_000; // avg year ms
    const [major, minor] = years.toFixed(9).split(".");
    return { major, minor };
  }

  /* ----------  render loops ---------- */
  function renderAgeLoop() {
    const dob = load();
    $("#choose").hide();
    $("#timer").show();

    setInterval(() => {
      const age = getAge(dob);
      $("#age").html(`${age.major}<sup>.${age.minor}</sup>`);
    }, 100);
  }

  function renderChoose() {
    $("#choose").show();
  }

  /* ----------  event bindings ---------- */
  $("#submit").on("click", function (e) {
    e.preventDefault();
    const input = $("#dob-input").val();
    if (!input) return;

    const dob = new Date(input);
    save(dob);
    renderAgeLoop();
  });

  /* ----------  init ---------- */
  load() !== -1 ? renderAgeLoop() : renderChoose();
});
