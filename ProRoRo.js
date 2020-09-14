var osv;
var state=0;
var butt1,butt2,butt3,butt4,butt5;
var box1;
var n=0,osvuri=[],adrese=[];
var ifrm;

function preload(){
  osv=loadJSON("data/OSV.json");
}

function setup() {
  can=createCanvas(window.innerWidth,window.innerHeight);
  rectMode(CENTER);
  can.position(500,500);
  butt1=createButton("Adaugare membri");
  butt1.mousePressed(adm);
  butt2=createButton("Gasire OSV");
  butt2.mousePressed(gosv);
  butt3=createButton("Tabel OSV");
  butt3.mousePressed(tosv);
  butt4=createButton("Tabel membri");
  butt4.mousePressed(tm);
  butt1.position(width/2-width/6,height/7);
  butt1.size(width/3,height/8);
  butt2.position(width/2-width/6,2*height/7);
  butt2.size(width/3,height/8);
  butt3.position(width/2-width/6,3*height/7);
  butt3.size(width/3,height/8);
  butt4.position(width/2-width/6,4*height/7);
  butt4.size(width/3,height/8);
  butt5=createButton("Inapoi");
  butt5.size(width/10,width/15);
  butt5.position(0,0);
  butt5.mousePressed(inapoi);
  box1=createInput();
  box1.size(width/10);
  box1.position(0,4*height/10);
  textAlign(CENTER,CENTER);
  can.position(0,0);
  ifrm=createElement('iframe');
  ifrm.attribute('src','https://docs.google.com/forms/d/e/1FAIpQLScQnhkphY_iHBHo4EfUJv1FiM1Ili4GD7-e1RJJJHt2VkPIvg/viewform?embedded=true');
  ifrm.attribute('width','200');
  ifrm.attribute('height','600');
  ifrm.position(0,0.2*height);
}


function draw() {
  back();
  switch(state){
    case 0:menu();break;
    case 1:gosv1();break;
    case 2:admS();break;
  }
}

function menu(){
  butt1.show();
  butt2.show();
  butt3.show();
  butt4.show();
  butt5.hide();
  box1.hide();
  ifrm.hide();
}

function back(){
  noStroke();
  fill(237,58,79);
  ellipse(width/2,height/2,2*width);
  fill(252,175,57);
  ellipse(width/2,height/2,width);
  fill(6,115,187);
  ellipse(width/2,height/2,9*width/10);
}

function tosv(){
  window.open("https://docs.google.com/spreadsheets/d/1Mmnbvhs15TxLX5xxgmnMoKjD5ey2wsVD0RswxCJDhVI/edit?usp=sharing");
}

function tm(){
  window.open("https://docs.google.com/spreadsheets/d/1NW8kGGK4a6cn0Y1V2vfsVWPpff_E_dEtiDEng5gu9wU/edit?usp=sharing");
}

function inapoi(){
  state=0;
}

function gosv(){
  state=1;
}

function adm(){
  state=2;
}

function gosv1(){
  textAlign(LEFT,TOP);
  var x;
  butt1.hide();
  butt2.hide();
  butt3.hide();
  butt4.hide();
  butt5.show();
  box1.show();
  box1.position(0,4*height/10);
  ifrm.hide();
  stroke(0);
  fill(255);
  textSize(width/50);
  if(n==0)
    text("Pentru aflarea OSV-ului, introduceti partial numele strazii in casuta, fara diacritice si apasati tasta ENTER.\n(ex.: musat pentru Bulevardul Roman Musat)",0,height/5);
  else
    for(i=0;i<n;i++){
      if(adrese[i].length>86 && !(adrese[i].includes("\n"))){
        x=adrese[i].slice(0,86).lastIndexOf(' ');
        adrese[i]=adrese[i].slice(0,x)+"\n        "+adrese[i].slice(x,adrese[i].length);}
      text(osvuri[i]+"---"+adrese[i],width/7,height/100+i*height/24);
      if(adrese[i].includes("\n"))
        translate(0,height/22);
    }
}

function gosv2(){
  textAlign(LEFT,TOP);
  var x;
  stroke(0);
  fill(255);
  textSize(width/50);
  n=0;
      for(i=0;i<osv.OSV.length;i++)
        if((osv.OSV[i].street.toLowerCase().includes(box1.value()) || osv.OSV[i].nr.toLowerCase().includes(box1.value()) )&& box1.value()!=''){
          osvuri[n]=osv.OSV[i].osv;
          adrese[n]=osv.OSV[i].street+' '+osv.OSV[i].nr;
          n++;
        }
     for(i=0;i<n;i++){
       if(adrese[i].length>86 && !(adrese[i].includes("\n"))){
         x=adrese[i].slice(0,86).lastIndexOf(' ');
         adrese[i]=adrese[i].slice(0,x)+"\n        "+adrese[i].slice(x,adrese[i].length);}
       text(osvuri[i]+"---"+adrese[i],width/7,height/100+i*height/24);
       if(adrese[i].includes("\n"))
         translate(0,height/22);
    }
}

function admS(){
  butt1.hide();
  butt2.hide();
  butt3.hide();
  butt4.hide();
  butt5.show();
  box1.show();
  box1.position(0,15*height/100);
  ifrm.show();
  gosv2();
}

function keyPressed(){
  if(keyCode==ENTER)
    switch(state){
      case 1:{n=0;
              for(i=0;i<osv.OSV.length;i++)
              if(osv.OSV[i].street.toLowerCase().includes(box1.value())){
                osvuri[n]=osv.OSV[i].osv;
                adrese[n]=osv.OSV[i].street+' '+osv.OSV[i].nr;
                n++;
              }
              box1.value('');
      }break;
    }
}
