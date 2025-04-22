let popupContainer; // 用於顯示圖片的容器
let popupImage; // 用於顯示圖片的元素
let images = []; // 儲存圖片的陣列
let gridSize = 3; // 九宮格為 3x3
let cellSize, offsetX, offsetY;
let activeImages = []; // 用於追蹤每個格子是否顯示圖片

function preload() {
  // 預載圖片
  images = [
    loadImage("place.jpg.jpeg", () => console.log("place.jpg 載入成功"), () => console.error("place.jpg 載入失敗")),
    loadImage("hobby.jpg.png", () => console.log("hobby.jpg 載入成功"), () => console.error("hobby.jpg 載入失敗")),
    loadImage("fav_song.jpg.png", () => console.log("fav_song.jpg 載入成功"), () => console.error("fav_song.jpg 載入失敗")),
    loadImage("me.jpg.jpeg", () => console.log("me.jpg 載入成功"), () => console.error("me.jpg 載入失敗")),
    loadImage("mbti.jpg.png", () => console.log("mbti.jpg 載入成功"), () => console.error("mbti.jpg 載入失敗")),
    loadImage("outfit.jpg.png", () => console.log("outfit.jpg 載入成功"), () => console.error("outfit.jpg 載入失敗")),
    loadImage("season.jpg.png", () => console.log("season.jpg 載入成功"), () => console.error("season.jpg 載入失敗")),
    loadImage("fav_animal.jpg.png", () => console.log("fav_animal.jpg 載入成功"), () => console.error("fav_animal.jpg 載入失敗")),
    loadImage("my_type.jpg.jpeg", () => console.log("my_type.jpg 載入成功"), () => console.error("my_type.jpg 載入失敗"))
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("畫布已建立，大小為:", windowWidth, "x", windowHeight);
  textAlign(CENTER, CENTER); // 文字置中對齊
  textSize(24); // 設定文字大小
  textFont("serif"); // 設定字體

  // 計算格子大小與偏移量
  cellSize = min(width, height) / (gridSize + 1);
  offsetX = (width - gridSize * cellSize) / 2;
  offsetY = (height - gridSize * cellSize) / 2;

  // 初始化每個格子的圖片狀態為 null
  activeImages = Array(gridSize * gridSize).fill(null);
}

function draw() {
  background("#606c38");

  let texts = [
    "PLACE", "HOBBY", "FAV\nSONG",
    "ME", "MBTI", "OUTFIT",
    "SEASON", "FAV\nANIMAL", "MY TYPE"
  ];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let textIndex = j * gridSize + i;

      // 繪製格子
      fill("#e9edc9");
      stroke(0);
      rect(offsetX + i * cellSize, offsetY + j * cellSize, cellSize, cellSize);

      // 繪製文字
      fill(0);
      let centerX = offsetX + i * cellSize + cellSize / 2;
      let centerY = offsetY + j * cellSize + cellSize / 2;
      text(texts[textIndex], centerX, centerY);

      // 如果該格子有圖片，繪製圖片
      if (activeImages[textIndex]) {
        imageMode(CENTER);
        image(
          activeImages[textIndex],
          offsetX + i * cellSize + cellSize / 2,
          offsetY + j * cellSize + cellSize / 2,
          cellSize * 0.8,
          cellSize * 0.8
        );
      }
    }
  }
}

function mousePressed() {
  // 檢查滑鼠是否點擊在某個格子內
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x1 = offsetX + i * cellSize;
      let y1 = offsetY + j * cellSize;
      let x2 = x1 + cellSize;
      let y2 = y1 + cellSize;

      if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {
        let imageIndex = j * gridSize + i;
        console.log("點擊格子:", i, j, "顯示圖片索引:", imageIndex);

        // 切換該格子的圖片顯示狀態
        if (activeImages[imageIndex]) {
          activeImages[imageIndex] = null; // 移除圖片
        } else {
          activeImages[imageIndex] = images[imageIndex]; // 顯示對應的圖片
        }
      }
    }
  }
}
