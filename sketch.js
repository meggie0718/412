var sound1
function preload(){
  sound1 = loadSound(" 我們這一家 片尾曲.mp3") //先把音樂檔載入到sound1程式碼中
}
var face_colors = "ffd6ff-e7c6ff-c8b6ff-b8c0ff".split("-").map(a=>"#"+a)
var eye_colors = "22223b-4a4e69-9a8c98-c9ada7-f2e9e4".split("-").map(a=>"#"+a)
var pos_x=[] //產生物件的x軸位置
var pos_y=[]
var sizes=[]
var colors=[]
var v_y = [] //物件移動速度y軸
var v_x =[] //物件移動速度x軸
var txts = [] //宣告一個變數
var face_move_var = false
var lang = navigator.language  //取得瀏覽器的語系
var myRec =new p5.SpeechRec(lang)
var face_Rot_var =false
var fc=0
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#c8b6ff");
  analyzer = new p5.Amplitude();
  analyzer.setInput(sound1)
  //文字框的設定
  inputElement = createInput("412730789") //產生一個文字方塊，""內的文字為預設顯示的文字(可改)
  inputElement.position(10,10) //把文字方塊放到(10,10)
  inputElement.size(100,40) //文字方塊的寬高
  //以下的style，可以google搜尋html input css
  inputElement.style("font-size","20px") //文字框內的文字大小
  inputElement.style("color","#ffd6ff") //文字框內的文字顏色
  inputElement.style("background","#bbd0ff") //文字框內的文字背景顏色
  inputElement.style("border","none") //設定文字框沒有框線

  //移動播放的設定
  btnMusicElement = createButton("播放")//產生一個按鈕，按鈕上有""播放"字
  btnMusicElement.position(170,10)//按鈕的位置
  btnMusicElement.size(80,40) //文字方塊的寬高
  btnMusicElement.style("font-size","20px") 
  btnMusicElement.style("color","#bbd0ff") 
  btnMusicElement.style("background","#ffd6ff") 
  btnMusicElement.mousePressed(music_play)

  //停止按鈕的設定
  btnStopElement = createButton("停止")
  btnStopElement.position(270,10)//按鈕的位置
  btnStopElement.size(80,40) //文字方塊的寬高
  btnStopElement.style("font-size","20px") 
  btnStopElement.style("color","#bbd0ff") 
  btnStopElement.style("background","#ffd6ff") 
  btnStopElement.mousePressed(music_stop)

  //radio是多個選項只能選一個(單選)
  radioElement = createRadio()
  radioElement.option("暫停")
  radioElement.option("旋轉")
  radioElement.option("移動")
  radioElement.position(370,10)//旋鈕的位置
  radioElement.size(200,40) 
  radioElement.style("font-size","20px") 
  radioElement.style("color","#bbd0ff") 
  radioElement.style("background-color","#ffd6ff") 

  //checkbox是多個選項可以選多個(複選)

  //語音按鈕
  btnVoiceElement = createButton("語音")
  btnVoiceElement.position(580,10)
  btnVoiceElement.size(80,40)
  btnVoiceElement.size("font-size","20px")
  btnVoiceElement.style("color","#bbd0ff")
  btnVoiceElement.style("background","#ffd6ff")
  btnVoiceElement.mousePressed(voice_go)
}

function draw() {
  background("#c8b6ff");
  var mode = radioElement.value()
  for(var i=0;i<pos_x.length;i=i+1)
  {
    push()
      txts = inputElement.value(); //把文字框的文字內容，放入到txts變數內
      translate(pos_x[i],pos_y[i])
      if(mode=="旋轉" || face_Rot_var){
        rotate(sin(frameCount/20))
      }
      drawface(colors[i],0,sizes[i])
    pop()
    if(face_move_var|| mode=="移動"){ //在face_move_var為true時,該會移動、||是or的意思
    pos_y[i] = pos_y[i] + v_y[i]
    pos_x[i] = pos_x[i] + v_x[i]
    }

    if(pos_y[i]>height || pos_y[i]<0) //判斷有沒有碰到上下邊
    {
      pos_x.splice(i,1) //把碰到邊的陣列元素刪除
      pos_y.splice(i,1)
      sizes.splice(i,1)
      colors.splice(i,1)
      v_y.splice(i,1)
    }
  }
}

function drawface(face_clr=255,eye_clr=0,size=1){ //255與0為預設的值
  push() //自行設定格式 

    //translate(random(width),random(height))//把座標原點(0,0)移動到(200,200)
    scale(size)//先宣告放大縮小的比例尺(字才會跟著放大縮小)

    //文字框的顯示格式
    fill("#fff") 
    textSize(50)
    text(txts,-115,130) //顯示文字，文字內容為txts，放在位置座標為(-115,130)
    //身體
    push()
    noStroke()
    fill("#fff7c4")
    rect(-150,50,300,150)
    pop()
    
    
    //頭髮
    push()
    noStroke()
    fill("#99582a")
    ellipse(152,0,100)
    ellipse(138,-80,100)
    ellipse(110,-160,100)
    ellipse(55,-220,100)
    ellipse(-25,-225,100)
    pop()

    //臉
    fill("#ffe8d6")
    arc(0,50,300,-550,PI,0)
    line(-150, 50, 150, 50)

    //眼睛
    fill("#FFFFFF")
    ellipse(-15,-100,30)
    ellipse(15,-100,30)

    //眼球
    fill("#000000")
    ellipse(-13,-97,7)
    ellipse(13,-97,7) 

    //眉毛
    fill("#ffe8d6")
    arc(20,-140,25,-28,PI+PI/4,0)

    //嘴巴外
    fill("#ffc2d1")
    arc(0,20,300,-130,0,PI)
    line(-150, 20, 150, 20)

    //嘴巴內
    fill("#FFFFFF")
    arc(0,30,260,-80,0,PI)
    line(-130, 30, -15, 30)
    line(15, 30, 130, 30)
    fill("#ffc2d1")
    arc(0,30,30,-20,0,PI)
    
    //耳朵
    fill("#ffe8d6")
    arc(150,25,25,-30,PI+PI/2,PI/2)
    arc(-150,25,25,-30,PI/2,PI+PI/2)
    //手
    push()
    noStroke()
    fill("#ffe8d6")
    ellipse(129,-165,50)
    fill("#fff7c4")
    rect(110,-150,40,250)
    arc(-148,120,80,-135,PI/2,PI+PI/2)
    pop()
  pop() //把原本設定格式取消

  
}
function mousePressed(){
  if(mouseY>60){ //設定0-60間的座標值都不產生新的物件
    //產生一個新的物件
    pos_x.push(mouseX) //放一筆新的資料到pos_x陣列內，資料為按下滑鼠的x軸
    pos_y.push(mouseY)
    sizes.push(random(0.3,1)) //放一筆新的資料到size陣列內，資料為產生一個亂數作為物件的大小
    colors.push(face_colors[int(random(face_colors.length))]) //放一筆新的資料到colors陣列內，資料為顏色序列face_colors內亂數取顏色
    v_y.push(random(-1,1)) //
    v_x.push(random(-1,1))
  }
}

function music_play(){
  sound1.play();
}

function music_stop(){
  sound1.stop();
}

function voice_go(){
  myRec.onResult = showResult //取得語音辨識後去執行function showResult
  myRec.start() //開始做辨識
  //print(1)
}

function showResult(){
  print(myRec.resultString)
  if(myRec.resultValue == true){
    
    if(myRec.resultString.indexOf("走") !== -1){
      face_move_var = true
    }
    if(myRec.resultString.indexOf("停") !== -1){
      face_move_var = false
      face_Rot_var = false
    }
    if(myRec.resultString.indexOf("轉") !== -1){
      face_Rot_var = true
    }
  }
}