const button = document.querySelector('.button-see-more');
const moreInfoContent = document.querySelector('.more-info ');
const motivationMessage = document.querySelector('.motivation-content');
const buttonText = document.querySelector('.button-text');
const changeMessage = document.querySelector('.rotate');
const motivationTextMessage = document.querySelector('.paragraph-motivation');
const authorText = document.querySelector('.author');
const timesTemp = document.querySelector('.time-message');
const time = document.querySelector('.time');
const pmOrAm = document.querySelector('.pmOrAM');

// Motivation Text API Response

const motivationMessageChange = async () => {
  const url = await fetch('https://api.quotable.io/random');
  const response = await url.json();
  changeText(response);
};

// Region API Response

const regionSystem = async () => {
  const url = await fetch('https://worldtimeapi.org/api/ip');
  const response = await url.json();
  moreInfo(response);
};

// Motivation Text API Modify

const changeText = ({content, author}) => {
  motivationTextMessage.textContent = content;
  authorText.textContent = author;
};

const fixDate = time => (time < 10 ? '0' + time : time);
const isDayOrNight = time => (time <= 18 ? 'MORNING' : 'NIGHT');
const isPMorAM = time => (time <= 18 ? 'AM' : 'PM');

const getDate = () => {
  const date = new Date();
  const hour = fixDate(date.getHours());
  const minutes = fixDate(date.getMinutes());

  timesTemp.textContent = `GOOD ${isDayOrNight(hour)}, IT'S CURRENTLY`;
  time.innerHTML = `${hour}:${minutes} <span class="pmOrAM">${(pmOrAm.textContent = isPMorAM(hour))}</span>`;
  changeImage(hour);
};

const changeImage = hour => {
  if (hour <= 18) {
    document.body.classList.add('morning');
    document.body.classList.remove('night');
    return;
  }
  document.body.classList.remove('morning');
  document.body.classList.add('night');
};

const activateMoreInfo = e => {
  button.classList.toggle('active');
  moreInfoContent.classList.toggle('active');
  motivationMessage.classList.toggle('hidden');
  buttonText.textContent = 'MORE';

  if (button.classList.contains('active')) {
    buttonText.textContent = 'LESS';
  }
};

const moreInfo = ({timezone, day_of_year, day_of_week, week_number}) => {
  const timeZone = timezone.replace('_', ' ');
  const timeZoneFixed = timeZone.replace('/', ', ');
  document.querySelector('.region').textContent = timeZoneFixed;
  document.querySelector('.zone').textContent = timeZoneFixed;
  document.querySelector('.yearNumber').textContent = day_of_year;
  document.querySelector('.dayNumber').textContent = day_of_week;
  document.querySelector('.weekNumber').textContent = week_number;
};

setInterval(getDate, 1000);
motivationMessageChange();
regionSystem();

changeMessage.addEventListener('click', motivationMessageChange);
button.addEventListener('click', activateMoreInfo);
