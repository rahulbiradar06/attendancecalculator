const percentageSelect = document.getElementById("percentage");
const presentInput = document.getElementById("present-input");
const totalInput = document.getElementById("total-input");
const btn = document.getElementById("btn");
const outputDiv = document.getElementById("output-div");
const footer = document.getElementById("footer");
const banner = document.getElementById("banner");

btn.addEventListener("click", () => {
  let present = parseInt(presentInput.value);
  let total = parseInt(totalInput.value);
  let percentage = parseInt(percentageSelect.value);

  if (present < 0 || total <= 0 || present > total) {
    return (outputDiv.innerText = "Proper values please ¯\\_(ツ)_/¯");
  }

  if (present / total >= percentage / 100) {
    const daysAvailableToBunk = daysToBunk(present, total, percentage);
    return (outputDiv.innerHTML = daysToBunkText(
      daysAvailableToBunk,
      present,
      total
    ));
  }

  const attendanceNeeded = reqAttendance(present, total, percentage);
  return (outputDiv.innerHTML = daysToAttendClassText(
    attendanceNeeded,
    present,
    total,
    percentage
  ));
});

const reqAttendance = (present, total, percentage) => {
  return Math.ceil((percentage * total - 100 * present) / (100 - percentage));
};

const daysToBunk = (present, total, percentage) => {
  return Math.floor((100 * present - percentage * total) / percentage);
};

// const daysToBunkText = (daysAvailableToBunk, present, total) =>
//   `You can bunk for <strong>${daysAvailableToBunk}</strong> more days.<br>Current Attendance: <strong>${present}/${total}</strong> -> <strong>${(
//     (present / total) *
//     100
//   ).toFixed(2)}%</strong><br>Attendance Then: <strong>${present}/${
//     daysAvailableToBunk + total
//   }</strong> -> <strong>${(
//     (present / (daysAvailableToBunk + total)) *
//     100
//   ).toFixed(2)}%</strong>`;

// const daysToAttendClassText = (attendanceNeeded, present, total, percentage) =>
//   `You need to attend <strong>${attendanceNeeded}</strong> more classes to attain ${percentage}% attendance<br>Current Attendance: <strong>${present}/${total}</strong> ->  <strong>${(
//     (present / total) *
//     100
//   ).toFixed(2)}%</strong><br>Attendance Required: <strong>${
//     attendanceNeeded + present
//   }/${attendanceNeeded + total}</strong> -> <strong>${(
//     ((attendanceNeeded + present) / (attendanceNeeded + total)) *
//     100
//   ).toFixed(2)}%</strong>`;

const daysToBunkText = (daysAvailableToBunk, present, total) =>
  `<div class="card p-4 shadow-md bg-base-100 text-base-content rounded-lg">
      <div class="text-lg font-bold">
        You can bunk for <strong class="text-primary">${daysAvailableToBunk}</strong> more days.
      </div>
      <div class="text-md mt-2">
        Current Attendance: 
        <strong class="text-secondary">${present}/${total}</strong> -> 
        <strong class="text-accent">${((present / total) * 100).toFixed(2)}%</strong>
      </div>
      <div class="text-md mt-2">
        Attendance Then: 
        <strong class="text-secondary">${present}/${daysAvailableToBunk + total}</strong> -> 
        <strong class="text-accent">${((present / (daysAvailableToBunk + total)) * 100).toFixed(2)}%</strong>
      </div>
   </div>`;

const daysToAttendClassText = (attendanceNeeded, present, total, percentage) =>
  `<div class="card p-4 shadow-md bg-base-100 text-base-content rounded-lg">
      <div class="text-lg font-bold">
        You need to attend <strong class="text-primary">${attendanceNeeded}</strong> more classes to attain 
        <strong class="text-primary">${percentage}%</strong> attendance.
      </div>
      <div class="text-md mt-2">
        Current Attendance: 
        <strong class="text-secondary">${present}/${total}</strong> -> 
        <strong class="text-accent">${((present / total) * 100).toFixed(2)}%</strong>
      </div>
      <div class="text-md mt-2">
        Attendance Required: 
        <strong class="text-secondary">${attendanceNeeded + present}/${attendanceNeeded + total}</strong> -> 
        <strong class="text-accent">${(((attendanceNeeded + present) / (attendanceNeeded + total)) * 100).toFixed(2)}%</strong>
      </div>
   </div>`;



  
presentInput.addEventListener("focus", () => {
  footer.classList.add("hide-footer");
});

presentInput.addEventListener("focusout", () => {
  footer.classList.remove("hide-footer");
});

totalInput.addEventListener("focus", () => {
  footer.classList.add("hide-footer");
});

totalInput.addEventListener("focusout", () => {
  footer.classList.remove("hide-footer");
});
