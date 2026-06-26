document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 👇 これ追加（超重要）
    updateGreeting();
});

const topButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

if(window.scrollY > 300){

topButton.style.display = "block";

}else{

topButton.style.display = "none";

}

});

const fadeElements = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {

fadeElements.forEach(el => {

const position = el.getBoundingClientRect().top;

if(position < window.innerHeight - 100){

el.classList.add("show");

}

});

});

const apiKey = "1e1bf0ee0e4869ad77dbe9ad3021571f";

// 📍 現在地の天気を取得
function getWeatherByLocation() {
  return new Promise((resolve) => {

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        const weather = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        const city = data.name;

        resolve(`📍${city}の天気は「${weather}」、${temp}℃です`);

      } catch {
        resolve("天気取得失敗");
      }

    }, () => {
      // 位置情報拒否された場合
      resolve("位置情報が許可されていません");
    });

  });
}

async function updateGreeting() {
  const hour = new Date().getHours();

  let greeting = "";
  if (hour >= 5 && hour < 12) {
    greeting = "おはようございます";
  } else if (hour < 18) {
    greeting = "こんにちは";
  } else {
    greeting = "こんばんは";
  }

  const weather = await getWeatherByLocation();

  const el = document.getElementById("greeting");
  if (el) {
    el.textContent = `${greeting} ☀️ ${weather}`;
  }
}

// =====================
// ダークモード切り替え
// =====================

const toggle = document.getElementById("theme-toggle");
const icon = toggle.querySelector("i");

// 保存された設定を読み込む
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    icon.classList.replace("fa-moon","fa-sun");
}

// ボタンクリック
toggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        icon.classList.replace("fa-moon","fa-sun");
        localStorage.setItem("theme","dark");

    }else{

        icon.classList.replace("fa-sun","fa-moon");
        localStorage.setItem("theme","light");

    }

});