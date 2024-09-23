function date(empCode) {
    console.log(`Calculating experience for empCode: ${empCode}`);

const joinDate = document.getElementById(`dateofjoining_${empCode}`);
const experienceCell = document.getElementById(`experience_${empCode}`);

if (joinDate && joinDate.textContent.trim() && experienceCell) {
const today = new Date();
const diffTime = Math.abs(today - new Date(joinDate.textContent));
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
const years = Math.floor(diffDays / 365);
const remainingMonths = Math.round((diffDays % 365) / 30);

experienceCell.textContent = `${years} Years ${remainingMonths} Months`;
}
}