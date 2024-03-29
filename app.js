var firebaseConfig = {
    apiKey: "AIzaSyCNN0Uge5RExAFY9aZyQdQA4l51-DOEY4w",
    authDomain: "webappproject-83551.firebaseapp.com",
    databaseURL: "https://webappproject-83551.firebaseio.com",
    projectId: "webappproject-83551",
    storageBucket: "webappproject-83551.appspot.com",
    messagingSenderId: "33919573347",
    appId: "1:33919573347:web:b0b3f85e65ba410f048756",
    measurementId: "G-CSQ7Y9PQV0"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var provider = new firebase.auth.GoogleAuthProvider();

var db = firebase.firestore();
var price = 0;
var click = 0;
var type = "";
var menuid;
var menu;
var types = [];
var pics = [];
var order = [];
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        var email = user.email;
        console.log("welcom " + email);
        $('#login').hide();
        $('#regis').hide();
        $('#logout').show();

    } else {


        $('#login').show();
        $('#regis').show();
        $('#logout').hide();
    }


});
var setType = function (input) {
    type = input
}
var getType = function () {
    return type
}
var setMenuID = function (refId) {
    menuId = refId;
    $("#content")[0].load("menu.html");
}
var getMenuId = function () {
    return menuId;
}
function setOrder(menuName, Price) {
    var nameRes = localStorage.getItem("nameRes");
    var user = firebase.auth().currentUser;

    if (user) {
        price = price + Price;
        var setprice = `${price}`;
        $('#Price').empty();
        $('#Price').append(setprice);
        var addvalue = false
        if (order.length === 0) {
            order.push([menuName, Price, 1]);
        } else {
            order.forEach((item, index) => {
                if (item[0] == menuName) {
                    item[2]++;
                    addvalue = true;
                }
                if (order.length - 1 == index) {
                }
            })
            if (addvalue == false) {
                order.push([menuName, Price, 1]);
            }

        }

    } else {
        ons.notification.alert("Please login")
        $("#content")[0].load("login.html");
    }

}
var typeCates;
var picCates;
var setNameCate = function (typeCate) {
    types.push([typeCate]);
}
var setPicCate = function (picCate) {
    pics.push([picCate]);
}
var getTypeCate = function () {
    return types;
}
var getPicCate = function () {
    return pics;
}
var setMenu = function (menus) {
    menu = menus;
}
var getMenu = function () {
    return menu;
}
var signout = function () {
    firebase.auth().signOut().then(function () {
        alert("signout success");
    }).catch(function (error) {
        // An error happened.
    });
}
var selectCate = function (cate){
    setType(cate)
    $("#content")[0].load("list.html");
}

document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'homePage') {

        $("#menubtn").click(function () {
            $("#sidemenu")[0].open();
        });

        db.collection("reccomment").orderBy("rate", "desc").limit(5)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var item = `
                    <ons-carousel-item id="${doc.data().id}" onclick="setMenuID('${doc.data().id}')" style="background-size: 100%;  width: 100%;height: 190px; background-image: url('${doc.data().picture}')">
                    <div style="font-size: 15px;background-color:purple;width: 60px;color: #fff;margin-left: 315px;height: 25px;margin-top: 15px;">
                    <i class="fas fa-star" style="color: orange; margin-left:10px; margin-top:5px;"></i> ${doc.data().rate}</div>
                    <div style="font-size: 15px;background-color:purple;width: 60px;color: #fff;margin-top: 15px;margin-left: 315px;padding-left: 8px;"></i> ${doc.data().delivery} min</div>
                    <div style="text-align: center; font-size: 30px; padding-top:5px;margin-top: 75px; color: #fff; height: 46px;  background-color:black; opacity: 0.6;">
                    ${doc.data().name}</div></ons-carousel-item>`;
                    $('#carousel').append(item);

                });
            })



            var i=0;
        db.collection("category").get()
            .then((querySnapshot) => {
                $("#cateList").empty()
                querySnapshot.forEach((doc) => {
                    
                  
                       var item= `
        <ons-card style=" margin-left:23px; width: 40%; height:auto;" onclick="selectCate('${doc.data().type}')" id="${doc.data().type}">
           
                <img src="${doc.data().pic}"
                    style="width: 50%; margin-left: auto; margin-right: auto; display: block; ">
                <div style="text-align: center; margin-top: 16px; color:purple; font-weight: bold;">${doc.data().type}</div>
            
        </ons-card>
        `
                        $('#cateList').append(item);
        
                   
                });
            });

        $("#seeallbtn").click(function () {
             setType("")
             $("#content")[0].load("list.html");
         });

    }

    if (page.id === 'listPage') {

        var listType = getType();
        $('#categoryType').append(listType);
        if (getType() == "") {
            db.collection("reccomment").orderBy("rate", "desc")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        var item = `<ons-card id="${doc.data().id}" onclick="setMenuID('${doc.data().id}')"  style="background-size: 100%; 90%;width: 350px;height: 190px;background-image: url('${doc.data().picture}');padding-right: 0px;padding-left: 0px; margin:15px;">
                    <div style="font-size: 15px;background-color:purple;width: 60px;color: white;margin-left: 290px;height: 25px;margin-top: 15px;">
                        <i class="fas fa-star" style="color: orange; margin-left:10px; margin-top:5px;"></i> ${doc.data().rate}</div>
                    <div style="font-size: 15px;background-color:purple;width: 52px;color: white ;margin-top: 15px;margin-left: 290px;padding-left: 8px;height: 17px;"></i> ${doc.data().delivery} min </div>
                        <div style="text-align: center; font-size: 30px; padding-top:5px;margin-top: 53px; color: white; height: 46px;  background-color:purple; border-radius: 0px 0px 10px 10px;">
                        ${doc.data().name}</div></ons-card>`
                        $('#list').append(item);
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });

        } else {
            db.collection("reccomment").where("type", "==", getType()).orderBy("rate", "desc")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        var item = `<ons-card id="${doc.data().id}" onclick="setMenuID('${doc.data().id}')"  style="background-size: 100%; 90%;width: 350px;height: 190px;background-image: url('${doc.data().picture}');padding-right: 0px;padding-left: 0px; margin:15px;">
                    <div style="font-size: 15px;background-color:purple;width: 60px;color: white;margin-left: 290px;height: 25px;margin-top: 15px;">
                        <i class="fas fa-star" style="color: orange; margin-left:10px; margin-top:5px;"></i> ${doc.data().rate}</div>
                    <div style="font-size: 15px;background-color:purple;width: 52px;color: white ;margin-top: 15px;margin-left: 290px;padding-left: 8px;height: 17px;"></i> ${doc.data().delivery} min </div>
                        <div style="text-align: center; font-size: 30px; padding-top:5px;margin-top: 53px; color: white; height: 46px;  background-color:purple; border-radius: 0px 0px 10px 10px;">
                        ${doc.data().name}</div></ons-card>`
                        $('#list').append(item);
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        }
        $("#backbtn").click(function () {
            $('#list').empty();
            $("#content")[0].load("home.html");
        });

    }

    if (page.id === 'toolsPage') {

        $("#login").click(function () {
            $("#content")[0].load("login.html");
            $("#sidemenu")[0].close();
        });

        $("#regis").click(function () {
            $("#content")[0].load("register.html");
            $("#sidemenu")[0].close();
        });

        $("#home").click(function () {
            $("#content")[0].load("home.html");
            $("#sidemenu")[0].close();
        });
        $("#logout").click(function () {
            signout()
            $("#content")[0].load("home.html");
            $("#sidemenu")[0].close();
        });
    }


    if (page.id === 'loginPage') {

        $("#signinbtn").click(function () {
            var Email = document.getElementById('email').value;
            var Password = document.getElementById('pass').value;
            firebase.auth().signInWithEmailAndPassword(Email, Password).then(function () {
                ons.notification.alert("Login success")
                $("#content")[0].load("home.html");
            })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/weak-password') {
                        ons.notification.alert("Password weak")
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                })

        });


        $("#googlebtn").click(function () {
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then(function (result) {
                if (result.credential) {
                    var token = result.credential.accessToken;
                }
                var user = result.user;
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
        });
        $("#backbylogin").click(function () {

            $("#content")[0].load("home.html");
        });
        $("#register").click(function () {

            $("#content")[0].load("register.html");
        });
    }
    if (page.id === 'menuPage') {

        $('#Price').append(price);

        db.collection("reccomment").where("id", "==", getMenuId())
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    localStorage.setItem("nameRes", doc.data().name);
                    localStorage.setItem("resPic", doc.data().picture);
                    var pictureMenu = `<div
                        style="background-size: 100%; background-repeat: no-repeat; width: 100%;height: 150px; background-image: url('${doc.data().picture}'); margin-bottom:15px;">
                    </div>`;
                    $('#pictureMenu').append(pictureMenu);
                    var NameRes = `${doc.data().name}`;
                    $('#NameRes').append(NameRes);
                    var menus = doc.data().menus
                    setMenu(menus);
                });

                var menus = getMenu();
                var types = [];
                for (let index = 0; index < menus.length; index++) {
                    var menu = menus[index];
                    var type = menu.type;
                    var item = `<div style="font-weight: bold;font-size: 20px;color:black;margin-top:8px;margin-bottom: 8px;" >${menu.type}</div>
                    <ons-col id="${menu.type}" style="font-weight: bold; font-size: 10px;">
                    </ons-col>`
                    if ($('#textMenu').text() === "") {
                        $('#textMenu').append(item);
                    } else {
                        var typeInID = $('#textMenu').text();
                        if (type === types[index - 1]) {
                        } else {
                            $('#textMenu').append(item);
                        }
                    }
                    types[index] = type;
                }

                for (let index = 0; index < menus.length; index++) {
                    var menu = menus[index];
                    var type = menu.type;
                    var item = `<ons-row style="margin-bottom:4px;">
                   <label id="name" style="width: 75%; padding-top:10px; font-size:12px; padding-top:5px; opacity: 0.7;">${menu.name}</label>
                    <label id="price" style="width: 12%; padding-top :10px; font-size:12px; padding-top:5px; background-color:orange; padding-left: 9px; width:32px; color:white; border-radius: 30px;">${menu.price}</label>
                    <div onclick="setOrder('${menu.name}',${menu.price})" style=" background-color: purple;font-size:20px;color:white;margin-left: 4px;padding-left: 5px;padding-right: 5px;"> + </div>
                    </ons-row>`
                    $('#' + type).append(item);

                }

            })


        $("#backtolist").click(function () {
            if (order.length > 0) {
                order = []
                price = 0
                localStorage.clear();
                ons.notification.alert({
                    message: 'Cancle order !'
                });
                $("#content")[0].load("home.html");
            } else {
                $("#content")[0].load("home.html");
            }



        });

        $("#orderbtn").click(function () {
            if(order.length==0){
                ons.notification.alert({
                    message: 'What can I get for you?'
                });
            }else{
                
            $("#content")[0].load("order.html");
            }
        });
    }
    if (page.id === 'regisPage') {
        $("#register").click(function () {
            var Email = document.getElementById('email').value;
            var Password = document.getElementById('password').value;
            firebase.auth().createUserWithEmailAndPassword(Email, Password).then(function () {
                ons.notification.alert("Register success")
                $("#content")[0].load("home.html");
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    ons.notification.alert("Weak password")

                } else {
                    alert(errorMessage);
                }
                console.log(error);
            })
        });


        $("#backFormRegis").click(function () {
            $("#content")[0].load("home.html");
        });
    }
    if (page.id === 'orderPage') {
        var nameRes = localStorage.getItem("nameRes");
        var Pic = localStorage.getItem("resPic");

        order.forEach((item, index) => {
            var price = item[1] * item[2]

            var item = `<ons-row style="margin-top: 15px; font-weight: bold; color: black;"><label style="width: 20%"> ${item[2]}</label>
        <label style="width: 60%">${item[0]}</label>
        <label style="width: 20%"><center>${price}</center></label>
        </ons-row>`
            $('#orderList').append(item);
        })
        $('#allPrice').append(price);
        $('#Head').append(nameRes);
        var item = `<div
        style="background-size: 100%; background-repeat: no-repeat; width: 100%;height: 150px; background-image: url('${Pic}'); margin-bottom:15px;">
        </div>`;
        $('#Pic').append(item);

    }
    $("#pay").click(function () {
        order = []
        price = 0
        localStorage.clear();
        ons.notification.alert("Enjoy your meal")
        $("#content")[0].load("home.html");
    });
    $("#cast").click(function () {
        order = []
        price = 0
        localStorage.clear();
        ons.notification.alert("Enjoy your meal")
        $("#content")[0].load("home.html");
    });
    $("#backhomebtn").click(function () {
        $("#content")[0].load("menu.html");
    });
})