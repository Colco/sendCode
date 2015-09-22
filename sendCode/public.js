/**
 * edit:Cola
 * time:2015/9/22
 * version:1.0.1
 * describe:button for sendCode
 */
(function($) {
        //function for sendCode
        $.fn.sendCode = function (options) {
            var settings = $.extend({},{
                "time": 30,
                "phoneVal":"phoneVal",
                "url":"getCode()"
            },options);
            console.log(settings);
            phone_obj = $('.'+settings.phoneVal);
            time = settings.time;
            send_obj = $(this);
            send_obj.click(function () {
                var val = phone_obj.val();
                var reg_phone = /0?(13|14|15|18)[0-9]{9}/;
                if (val) {
                    if (reg_phone.test(val)) {
                        send_obj.attr('disabled', "disabled");
                        send_obj.css({'color': '#cccccc', 'cursor': 'not-allowed'});
                        //60秒后重新启动发送按钮
                        forbidButton(settings.phoneVal, send_obj,time,settings.url);
                        $.ajax({
                            url: settings.url,
                            data: {'mobile': val},
                            dataType: 'json',
                            type: 'post',
                            success: function (data) {
                            },
                            error: function () {
                            }
                        });
                    }
                }
            })
        };
        function forbidButton(phone_obj, send_obj,time,url) {
            //60秒后重新点取验证码
            var count = 1;
            send_obj.unbind("click");
            var i = setInterval(function () {
                if (count == time) {
                    send_obj.attr('disabled', false);
                    send_obj.html('重新获取');
                    clearInterval(i);
                    send_obj.css({'color': '#000000', 'cursor': 'pointer'});
                    send_obj.sendCode({
                        "time": time,
                        "phoneVal":phone_obj,
                        "url":url
                    });
                } else {
                    send_obj.html('重新获取' + '(' + parseInt(time - count) + ')');
                }
                count++;
            }, 1000);
        }

    }
)(jQuery);
