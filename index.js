const bodyParser = require("body-parser")
const express = require('express')
const app = express()
app.use(bodyParser.urlencoded( {extended : true} ))
app.set('view engine', 'ejs');

// / dediğimiz şey anasayfayı temsil eder.
app.get("/" , function(req, res){ // req veya res de yazılabilir.
  res.sendFile(__dirname + "/index.html");
}
)

app.get("/iletisim" , function(req, res){
  res.sendFile(__dirname + "/iletisim.html");
}
)

app.get("/giris" , function(req, res){
  res.sendFile(__dirname + "/giris.html");
}
)

app.post("/profil" , function(req,res){
  console.log(req.body.kullaniciAdi);
  if(req.body.kullaniciAdi=="Hamza" && req.body.sifre=="1234"){
    res.send("Hoşgeldin" + req.body.kullaniciAdi )
  }else {
    res.send("Bilgiler Hatalı" )
  }

})

app.get("/yazi" , function(req, res){
  // gelen isteklere göre o sayfanı  içeriğini değiştireceğiz
  // ejs = enbedded javascript
  var gonderilecekler = {
    baslik: "Almanya Hükümetinde açıklama" ,
    yorumsayisi: "30",
    yazar: "recep Bey"
  }
  res.render('yazi', gonderilecekler)
})

// ürün sayfası iin istek. bağlanmak isteyen için ürün ejsrender et ve sayfada da başlık ve yorum Sayısı
app.get("/urun" , function(req , res){
  var gonderilecekler = {
    baslik: "Taze Fıstıklı Lokum",
    yorumsayisi:"44",
    fiyat: "7,90"
  }
  res.render("urun", gonderilecekler);
})

// Kitap sayfası bilgileri. render et ve kitap ismi,
// yazar, açıklama, Fiyatı

app.get("/kitap" , function(req , res){
  var gonderilecekler = {
    baslik: "Taze Fıstıklı Lokum",
    yazar:"44",
    aciklama: "Savaş yıllarını anlatan bir kitap",
    basimyili: "1908",
    isbn:"5839323023"
  }
  res.render("kitap", gonderilecekler);
})

// hatalı sayfalar için . * sayfalarımız dışında tüm istekleri getirir. 404 sayfası. Bu kod sayfanın en aşağısında olmalı.
app.get("*", function(){
  res.send("hata! Yanlış sayfadasınız. Lütfen tarayıcı ayarlarını düzenleyiniz.")
});

app.listen(8000);
