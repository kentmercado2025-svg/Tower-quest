let challenges = {};

window.onload = function() {
  console.log("Loading challenges from SheetDB...");

  fetch('https://sheetdb.io/api/v1/2otf0nxumlx0j')
    .then(response => response.json())
    .then(data => {
      const dropdown = document.getElementById("block");

      if (!data || data.length === 0) {
        document.getElementById("challenge-text").innerText = "No data found.";
        return;
      }

      data.forEach(row => {
        challenges[row.Block] = row.Challenge;

        const option = document.createElement("option");
        option.value = row.Block;
        option.text = row.Block;
        dropdown.appendChild(option);
      });

      console.log("Challenges loaded:", challenges);
    })
    .catch(error => {
      console.error("Error loading data:", error);
      document.getElementById("challenge-text").innerText = "Failed to load challenges.";
    });
};

function getChallenge() {
  const block = document.getElementById("block").value;
  const challenge = challenges[block] || "No challenge found.";
  document.getElementById("challenge-text").innerText = challenge;
}

function getRandomChallenge() {
  const keys = Object.keys(challenges);
  if (keys.length === 0) {
    document.getElementById("challenge-text").innerText = "No challenges available.";
    return;
  }
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const challenge = challenges[randomKey];
  document.getElementById("challenge-text").innerText = challenge + ` (Block: ${randomKey})`;
}