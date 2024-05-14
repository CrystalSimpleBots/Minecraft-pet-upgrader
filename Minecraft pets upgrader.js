const mineflayer = require('mineflayer');
const username = ' the pet upgrader username'; // the username u wanna use (the username that holds the pets... )

console.log('\u001b[31m❤\u001b[0m', ' '.repeat(10), 'Pet Upgrader', ' '.repeat(10), '\u001b[31m❤\u001b[0m');

setTimeout(() => {
  const bot = mineflayer.createBot({
  host: 'play.jartexnetwork.net',
  username: username,
  auth: 'offline',
  version: '1.16.5',
  hideErrors: true
  });

console.log('online');

  const slotCooldowns = [ // you can adjust the delays as u wish, the number infront of them are the number of each item, the first item at hotbar is the first etc... you can replace the number there for example the first item is "(1 * 60 + 10) * 1000" this is 1min and 10 sec, y can edo it as u wish, if u want for example 20mins then "(20 * 60 + 10) * 1000" etc for all depends on the pet cooldown but yeah.
    (1 * 60 + 10) * 1000,
    (2 * 60 + 10) * 1000,
    (4 * 60 + 10) * 1000,
    (3 * 60 + 10) * 1000,
    (35 * 60 + 10) * 1000,
    (28 * 60 + 10) * 1000,
    (45 * 60 + 10) * 1000,
    (20 * 60 + 10) * 1000,
    (50 * 60 + 10) * 1000
  ];

let upgradeStarted = false;

function activateHotbarSlots() {
let currentSlot = 0;
const interval = setInterval(() => {
if (currentSlot < 9) {
bot.setQuickBarSlot(currentSlot);
bot.activateItem();
currentSlot++;
} else {
clearInterval(interval);
}
}, 2000);
}

bot.on('spawn', () => {
setTimeout(() => {
if (!upgradeStarted) {
setTimeout(() => {
bot.chat('/login The pass of the acc'); // change this with the pass of the acc like only the "the pass ..." for example '/login 123'
setTimeout(() => {
bot.chat('/server immortal');
activateHotbarSlots();
upgradeStarted = true;
for (let i = 0; i < 9; i++) {
setInterval(() => {
bot.setQuickBarSlot(i);
bot.activateItem();
const conflictingSlots = slotCooldowns.filter((cooldown, index) => index !== i && cooldown % slotCooldowns[i] === 0);
if (conflictingSlots.length > 0) {
setTimeout(() => {
bot.activateItem();
}, conflictingSlots.length * 5000);
}
}, slotCooldowns[i]);
}
}, 1000);
}, 500);
}
}, 10000);
});
}, 3000);