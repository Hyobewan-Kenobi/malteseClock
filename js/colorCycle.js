

            //var content = document.getElementById("time").innerHTML;
            //console.log("content: " + content);

            //use jQuery to only execute after page loads
            var bgColorTest;
            //bgColorTest = "#000000";
            //bgColorTest = "#FFFFFF";

            $(document).ready(function() {

                function clockUpdate() {
                    var date = new Date();
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var seconds = date.getSeconds();

                    $("#time").html(padZero(hours)+":"+padZero(minutes)+":"+padZero(seconds));
                    
                    var color = ("#" + 
                    padZero( parseInt(hours/24*255).toString(16)) + 
                    padZero( parseInt(minutes/60*255).toString(16)) + 
                    padZero( parseInt(seconds/60*255).toString(16)));

                    $("#hex").html(color);
                    $("body").css("background-color", color);
                    $("body").animate({"backgroundColor":color},800);

                    
                    setForeColors();

                }
                clockUpdate();
                setInterval(clockUpdate, 1000);

                $("#clock").show();

                $('#buttons a').click(function(){
                    
                    $(this).addClass('active').siblings().removeClass('active');
                    $($(this).attr('href')).show().siblings().hide();
                });

                function padZero(val) {

                    var value = val.toString();
                    var paddedValue = "";

                    if(value.length < 2) {
                        paddedValue = "0" + value;
                    } else {
                        paddedValue = value;
                    }
                    return paddedValue;
                }

                function setForeColors() {

                    var fgColor = $('#time').css("color");
                    var bgColor = $('body').css("background-color");

                    if (typeof(bgColorTest) != "undefined") {
                        bgColor = bgColorTest;
                    }

                    var fgColorNew = jQuery.Color(bgColor).contrastColor();

                        $('#hex,#time').animate({'color': fgColorNew},800);
                        $('#buttons a').animate({'backgroundColor': fgColorNew},800);
                }

            });

            jQuery.Color.fn.contrastColor = function() {
              var r = this._rgba[ 0 ], g = this._rgba[ 1 ], b = this._rgba[ 2 ];
              return ( ( ( r * 299 ) + ( g * 587 ) + ( b * 144 ) ) / 1000 ) >= 131.5 ? "black" : "white";
            };

